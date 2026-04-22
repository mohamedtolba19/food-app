import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPass() {
    const [isLoading, setIsLoading] = useState(false)

  let { register, formState: { errors }, handleSubmit , watch  } = useForm()
  let navigate = useNavigate()
const password = watch("password")
  async function onSubmit(data) {
   setIsLoading(true)
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data);
      localStorage.setItem("token", response.data.token)
      toast.success("Password reset succesfully");
      navigate("/login")
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
        <h3 className=''> Reset  Password</h3>
        <span className='text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
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

        <div className="input-group  ">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input {...register("seed", {
            required: "OTP is required",

          })} className='form-control bg-light ' type="text" name="seed" id="seed" placeholder='enter your OTP' />
        </div>
         <div className='text-danger error-element' >{errors.seed?errors.seed.message:""}</div>

        <div className="input-group ">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input  {...register("password", {
            required: "password is required"
          })} className='form-control  bg-light  ' type="password" name="password" id="password" placeholder='New Password' />
        </div>

                <div className='text-danger error-element' >{errors.password?errors.password.message:""}</div>

        <div className="input-group ">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input  {...register("confirmPassword", {
            required: "Confirm password is required",
           validate: (value) =>
      value === password || "Passwords do not match"
          })} className='form-control  bg-light  ' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' />
        </div>

         <div className='text-danger error-element' >{errors.confirmPassword?errors.confirmPassword.message:""}</div>


       
         <button type='submit' className=' btn-submit w-100  btn btn-success my-3' disabled={isLoading}>{isLoading?<i className='fas fa-spin fa-spinner'></i>:"Submit" }</button>
      </form>
    </div>
  )
}
