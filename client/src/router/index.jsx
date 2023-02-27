import { createBrowserRouter, Outlet } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import ProtectedRoute from './ProtectedRoute'
import NoteList from '../components/NoteList'
import NoteDetail from '../components/NoteDetail'
import { folderLoader } from '../utils/folderUtils'
import { NoteListLoader, NoteDetailLoader, addNewNote } from '../utils/NoteListUtils'

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
            loader: folderLoader,
            path: '/',
            children: [
              {
                element: <NoteList />,
                path: `folder/:folderId`,
                action: addNewNote,
                loader: NoteListLoader,
                children: [
                  {
                    element: <NoteDetail />,
                    path: `note/:noteId`,
                    loader: NoteDetailLoader
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