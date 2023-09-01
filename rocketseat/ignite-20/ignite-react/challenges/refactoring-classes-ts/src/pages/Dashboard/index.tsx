import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Food } from "../../components/Food"
import { ModalAddFood } from "../../components/ModalAddFood"

import { api } from "../../services/api"

import { FoodsContainer } from "./styles"
import { ModalEditFood } from "../../components/ModalEditFood"

interface FoodData {
  id: number
  name: string
  description: string
  image: string
  price: number
  available: boolean
}

type FoodDTO = Omit<FoodData, "id" | "available">

export function Dashboard() {
  const [foods, setFoods] = useState<FoodData[]>([])
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get<FoodData[]>("/foods")
      setFoods(response.data)
    }

    loadFoods()
  }, [])

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  async function handleAddFood(food: FoodDTO) {
    try {
      const response = await api.post<FoodData>("/foods", {
        ...food,
        available: true,
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter((food) => food.id !== id)

    setFoods(foodsFiltered)
  }

  function handleEditFood(food: FoodData) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  async function handleUpdateFood(food: FoodData) {
    try {
      const foodUpdated = await api.put<FoodData>(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer>
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
