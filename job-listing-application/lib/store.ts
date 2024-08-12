import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './features/jobs/jobsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        jobs: jobsReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;