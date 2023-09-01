import { createContext, ReactNode, useContext, useState } from "react"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { Product, Stock } from "../types"

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart")

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart]

      const productExists = updatedCart.find(
        (product) => product.id === productId
      )

      const stockAmount = await api
        .get<Stock>(`/stock/${productId}`)
        .then((response) => response.data.amount)

      const currentAmount = productExists ? productExists.amount : 0

      const amount = currentAmount + 1

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque")
        return
      }

      if (productExists) {
        productExists.amount = amount
      } else {
        const productData = await api
          .get(`/products/${productId}`)
          .then((response) => response.data)

        const product = {
          ...productData,
          amount: 1,
        }

        updatedCart.push(product)
      }

      setCart(updatedCart)

      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart))
    } catch {
      toast.error("Erro na adição do produto")
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const productExists = cart.find((product) => product.id === productId)

      if (!productExists) {
        return toast.error("Erro na remoção do produto")
      }

      const updatedCart = cart.filter((product) => product.id !== productId)

      setCart(updatedCart)

      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart))
    } catch {
      toast.error("Erro na remoção do produto")
    }
  }

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return
      }

      const updatedCart = [...cart]

      const productExists = updatedCart.find(
        (product) => product.id === productId
      )

      if (!productExists) {
        return toast.error("Erro na alteração de quantidade do produto")
      }

      const stockAmount = await api
        .get<Stock>(`/stock/${productId}`)
        .then((response) => response.data.amount)

      if (amount > stockAmount) {
        return toast.error("Quantidade solicitada fora de estoque")
      }

      productExists.amount = amount

      setCart(updatedCart)

      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart))
    } catch {
      toast.error("Erro na alteração de quantidade do produto")
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
