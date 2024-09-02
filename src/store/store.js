import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import navReducer from "./slice/navSlice"

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
})

setupListeners(store.dispatch)