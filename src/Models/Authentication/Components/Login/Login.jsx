import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login({ saveLoginData }) {



  let { register, formState: { errors }, handleSubmit } = useForm()
  let navigate = useNavigate()
const [isLoading, setIsLoading] = useState(false)
  async function onSubmit(data) {
setIsLoading(true)
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login", data);
      localStorage.setItem("token", response.data.token)
      saveLoginData();
      toast.success("Login successfully");
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
    finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='p-3 '>
      <div className="title p-2">
        <h3 className=''>Log in</h3>
        <span className='text-muted'>Welcome Back! Please enter your details</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group  ">
          <span className="input-group-text">
            <i className='fas fa-envelope'></i>
          </span>
          <input {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Email is not valid"
            }


          })} className='form-control bg-light ' type="text" name="email" id="email" placeholder='enter your email' />
        </div>
         <div className='text-danger error-element' >{errors.email?errors.email.message:""}</div> 
          <div className="input-group  "></div>
        <div className="input-group ">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input  {...register("password", {
            required: "password is required"
          })} className='form-control  bg-light  ' type="password" name="password" id="password" placeholder='enter your password' />
        </div>
     <div className='text-danger error-element' >{errors.password?errors.password.message:""}</div> 

        <div className="links d-flex justify-content-between mt-1  ">
          <Link to={"/register"} className='text-muted text-decoration-none'>
            Register Now !
          </Link>
          <Link to={"/forgetpass"} className='text-success  text-decoration-none'>
            Forget Password ?
          </Link>
        </div>
        <button type='submit' className=' btn-submit w-100  btn btn-success my-3' disabled={isLoading}>{isLoading?<i className='fas fa-spin fa-spinner'></i>:"Log in" }</button>
      </form>
    </div>
  )
}
