import { lazy } from "react"

const LoginPage = lazy(() => import("pages/Login"))

export const menuHardcodes = [
  {
    key: 'login',
    path: '/',
    component: LoginPage
  }
]