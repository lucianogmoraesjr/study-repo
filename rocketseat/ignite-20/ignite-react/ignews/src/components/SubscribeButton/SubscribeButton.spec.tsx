import { fireEvent, render, screen } from "@testing-library/react"
import { SubscribeButton } from "."
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react"

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}))

jest.mock('next-auth/react')

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ 
      data: null, 
      status: "unauthenticated", 
      update: jest.fn(),
    });

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ 
      data: null, 
      status: "unauthenticated", 
      update: jest.fn(),
    });

    const signInMocked = jest.mocked(signIn)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    const useSessionMocked = jest.mocked(useSession)


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

    const pushMocked = jest.mocked(useRouter().push)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})