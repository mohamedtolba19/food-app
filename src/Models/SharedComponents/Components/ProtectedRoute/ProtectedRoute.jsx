import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children , loginDate}) {

    if(localStorage.getItem("token") || loginDate){
        return children
    }else{
return <Navigate to =  "/login" />
    }
 
}
