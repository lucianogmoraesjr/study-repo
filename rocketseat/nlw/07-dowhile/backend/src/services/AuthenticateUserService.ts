import axios from 'axios'
import { prismaClient } from '../prisma'
import { sign } from 'jsonwebtoken'

interface AccessTokenResponse {
  access_token: string
}

interface GitHubUserResponse {
  avatar_url: string
  login: string
  id: number
  name: string
}

export class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token'
    const { data: accessTokenResponse } = await axios.post<AccessTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { data: gitHubUserResponse } = await axios.get<GitHubUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      },
    )

    const { avatar_url, id, login, name } = gitHubUserResponse

    const user = await prismaClient.user.upsert({
      where: {
        github_id: id,
      },
      update: {},
      create: {
        avatar_url,
        github_id: id,
        login,
        name,
      },
    })

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    )

    return { user, token }
  }
}
