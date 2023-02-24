import { createBrowserRouter, Outlet } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import ProtectedRoute from './ProtectedRoute'
import NoteList from '../components/NoteList'
import NoteDetail from '../components/NoteDetail'

const AuthLayout = () => {
  return <AuthProvider >
    <Outlet />
  </AuthProvider>
}
export default createBrowserRouter([
  {
    element: <AuthLayout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: '/login'
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            children: [
              {
                element: <NoteList />,
                path: `folder/:folderId`,
                children: [
                  {
                    element: <NoteDetail />,
                    path: `note/:noteId`
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])