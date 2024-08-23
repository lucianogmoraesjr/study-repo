import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Badge {
  id: string
  name: string
  email: string
  eventTitle: string
  checkInURL: string
  image?: string
}

interface StateProps {
  data: Badge | null
  save: (data: Badge) => void
  remove: () => void
  updateImage: (uri: string) => void
}

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save: (data: Badge) => set(() => ({ data })),
      remove: () => set({ data: null }),
      updateImage: (uri: string) =>
        set(({ data }) => ({
          data: data
            ? {
                ...data,
                image: uri,
              }
            : data,
        })),
    }),
    {
      name: 'nlw-unite:badge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
