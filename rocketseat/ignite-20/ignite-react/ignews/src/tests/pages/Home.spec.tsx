import Home, { getStaticProps } from "@/pages"
import { stripe } from "@/services/stripe"
import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn()
  }
})
jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return { 
        data: null, 
        status: "unauthenticated", 
        update: jest.fn(),
      }
    }
  }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: '$9.90' }} />)

    expect(screen.getByText(/\$9\.90/i)).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = jest.mocked(stripe.prices.retrieve)

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})