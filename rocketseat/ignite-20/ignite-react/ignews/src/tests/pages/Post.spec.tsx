import Post, { getServerSideProps } from "@/pages/posts/[slug]"
import { getPrismicClient } from "@/services/prismic"
import { render, screen } from "@testing-library/react"
import { getSession } from "next-auth/react"

jest.mock('../../services/prismic')
jest.mock('next-auth/react')

const posts = {
  slug: 'my-new-post',
  title: 'My new Post',
  content: '<p>Post content</p>',
  updatedAt: 'July 7'
}

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={posts} />)

    expect(screen.getByText('My new Post')).toBeInTheDocument()
    expect(screen.getByText('Post content')).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession)
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)

    const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)

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