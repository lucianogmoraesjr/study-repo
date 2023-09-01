import { render, screen } from "@testing-library/react"
import { SignInButton } from "."
import { useSession } from "next-auth/react"

jest.mock('next-auth/react')

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ 
      data: null, 
      status: "unauthenticated", 
      update: jest.fn(),
    });

    render(
      <SignInButton />
    )

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
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

    render(
      <SignInButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})