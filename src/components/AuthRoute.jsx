import React from "react"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { multiStateContext } from "../context/contextApi"

export const AuthRoute = ({ children }) => {
  const { user } = useContext(multiStateContext)
  const token = localStorage.getItem("token")
  if (!token) {
    console.log("No user detected, redirecting")
    return <Navigate to="/login" />
  }

  return <div>{children}</div>
}
