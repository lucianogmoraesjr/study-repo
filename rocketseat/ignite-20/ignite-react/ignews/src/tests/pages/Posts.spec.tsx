import Posts, { getStaticProps } from "@/pages/posts"
import { getPrismicClient } from "@/services/prismic"
import { render, screen } from "@testing-library/react"

jest.mock('../../services/prismic')

const posts = [
  {
    slug: 'my-new-post',
    title: 'My new Post',
    abstract: 'Post abstract',
    updatedAt: 'July 7'
  }
]

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My new Post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: 'My new Post',
              content: [
                { type: 'paragraph', text: 'Post abstract' }
              ],
            },
            last_publication_date: '07-07-2023',
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new Post',
            abstract: 'Post abstract',
            updatedAt: '07 de julho de 2023'
          }]
        }
      })
    )
  })
})