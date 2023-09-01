/* eslint-disable no-array-constructor */
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

type FailedRequestQueue = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue = Array<FailedRequestQueue>()

interface AxiosErrorResponse {
  code?: string
}

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { 'nextauth.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: '/',
                })

                setCookie(
                  ctx,
                  'nextauth.refreshToken',
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                  },
                )

                api.defaults.headers.Authorization = `Bearer ${token}`

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token),
                )
                failedRequestQueue = []
              })
              .catch((error) => {
                failedRequestQueue.forEach((request) =>
                  request.onFailure(error),
                )
                failedRequestQueue = []

                if (process.browser) {
                  destroyCookie(ctx, 'nextauth.token')
                  destroyCookie(ctx, 'nextauth.refreshToken')

                  router.push('/')
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                if (!originalConfig?.headers) {
                  return
                }

                originalConfig.headers.Authorization = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })
        } else {
          if (process.browser) {
            destroyCookie(ctx, 'nextauth.token')
            destroyCookie(ctx, 'nextauth.refreshToken')

            router.push('/')
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
