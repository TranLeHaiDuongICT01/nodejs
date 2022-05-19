import { createContext, useCallback, useEffect, useReducer, useState } from "react"
const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const AuthContextProvide = ({ children }) => {
    const [error, setError] = useState()
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    const clearError = () => {
        setError(null)
    }
    useEffect(() => {
        setError(state.error)
    }, [state.error])
    return (
        <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: error, dispatch, clearError }}>
            {children}
        </AuthContext.Provider>
    )
}