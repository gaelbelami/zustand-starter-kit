import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type store = {
    bears: number
}

type actions = {
    increasePopulation: () => void
    decreasePopulation: () => void
    removeAllBears: () => void
    // updateBears: () => void

}


export const useBearStore = create<store & actions>()(
    persist(
        (set, get) => ({
            bears: 0,
            increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
            removeAllBears: () => set({ bears: 0 }),
            //   updateBears: (newBears) => set({ bears: newBears }),
    }),
    {
        name: "food-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }

))
