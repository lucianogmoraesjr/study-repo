import Post, { getStaticProps } from "@/pages/posts/preview/[slug]"
import { getPrismicClient } from "@/services/prismic"
import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

jest.mock('next-auth/react')
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}))
jest.mock('../../services/prismic')

const post = {
  slug: 'my-new-post',
  title: 'My new Post',
  content: '<p>Post content</p>',
  updatedAt: 'July 7'
}

describe('Post page', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)
    const useRouterMocked = jest.mocked(useRouter)

    useRouterMocked.mockReturnValueOnce({
      push: jest.fn()
    } as any)

    useSessionMocked.mockReturnValueOnce({ 
      data: null, 
      status: "unauthenticated", 
      update: jest.fn(),
    });

    render(<Post post={post} />)

    expect(screen.getByText('My new Post')).toBeInTheDocument()
    expect(screen.getByText('Post content')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = jest.mocked(useSession)
    const useRouterMocked = jest.mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: {
          name: 'John Doe',
          email: 'john@mail.com',
        },
        expires: 'fake-expires',
        activeSubscription: 'active'
      },
      status: "authenticated",
      update: jest.fn(),
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: 'My new Post',
          content: [
            { type: 'paragraph', text: 'Post content', spans: [] }
          ],
        },
        last_publication_date: '07-07-2023',
      })
    } as any)

    const response = await getStaticProps({ params: { slug: 'my-new-post' } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new Post',
            content: '<p>Post content</p>',
            updatedAt: '07 de julho de 2023'
          }
        }
      })
    )
  })
})