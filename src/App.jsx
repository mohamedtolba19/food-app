import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Models/SharedComponents/Components/AutheLayout/AuthLayout'
import Notfound from './Models/SharedComponents/Components/NotFound/Notfound'
import Login from './Models/Authentication/Components/Login/Login'
import Register from './Models/Authentication/Components/Register/Register'
import VerifyAccount from './Models/Authentication/Components/VerifyAccount/VerifyAccount'
import ResetPass from './Models/Authentication/Components/ResetPass/ResetPass'
import ForgetPass from './Models/Authentication/Components/ForgetPass/ForgetPass'
import MasterLayout from './Models/SharedComponents/Components/MasterLayout/MasterLayout'
import Dashboard from './Models/Dashboard/Components/Dashboard'
import ReciepesList from './Models/Reciepes/Components/ReciepesList/ReciepesList'
import UserList from './Models/Users/Components/UserList/UserList'
import FavouritesList from './Models/Favourites/Components/FavouritesList/FavouritesList'
import CategoriesList from './Models/Categories/Components/CategoriesList/CategoriesList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const router = createBrowserRouter(
    
    [
      {
        path:"" ,
        element:<AuthLayout/>,
        errorElement:<Notfound/>,
        children: [
          {index:true , element : <Login/>},
          {path:"login" , element : <Login/>},
          {path:"register" , element : <Register/>},
          {path:"verify-account" , element : <VerifyAccount/>},
          {path:"resetpass" , element : <ResetPass/>},
          {path:"forgetpass" , element : <ForgetPass/>}
        ]

      },
     {
        path:"dashboard" ,
        element:<MasterLayout/>,
        errorElement:<Notfound/>,
        children: [
          {index:true , element : <Dashboard/>},
          {path:" " , element : <Dashboard/>},
          {path:"reciepes" , element : <ReciepesList/>},
          {path:"users" , element : <UserList/>},
          {path:"favourites" , element : <FavouritesList/>},
          {path:"categories" , element : <CategoriesList/>}
        ]

      }
    ]
)

  return (
 <>
  <RouterProvider router={router} />
  <ToastContainer />
</>
  )
}

export default App
