import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../../../assets/images/logo.png"
export default function AuthLayout() {
  return (
    <div className="auth-container vh-100">
        <div className="container-fluid bg-overlay">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-lg-6 col-md-8 bg-white">
                    <div className="logo-container text-center">
                        <img className='w-75' src={logo} alt="logo" />
                    </div>
                    
                    <Outlet/>
                </div>

            </div>
        </div>

    </div>
  )
}
