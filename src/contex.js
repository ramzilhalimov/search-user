import { createContext, useContext } from 'react'

export const UserContext = createContext(null)
export const UserDispatchContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext)
  return context
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setUser': {
      return {
        ...action.payload,
      }
    }
  }
}
