import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {



  let { register, formState: { errors }, handleSubmit , watch } = useForm()
  const password = watch("password")
  let navigate = useNavigate()
const [isLoading, setIsLoading] = useState(false)
  async function onSubmit(data) {
setIsLoading(true)
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register", data);
      toast.success("Register successfully");
      navigate("/verify-account")
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
        <h3 className=''>Register</h3>
        <span className='text-muted'>Welcome Back! Please enter your details</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
   <div className="row justify-content-center align-items-center align-items-stretch">
      <div className='col-lg-6'>
         <div className="input-group  ">
          <span className="input-group-text">
           <i class="fa-regular fa-user"></i>
          </span>
          <input {...register("userName", {
            required: "userName is required",
             pattern: {
              value: /^[A-Za-z]+[0-9]+$/,
              message: "Letters then numbers, no spaces."
            }
           
          })} className='form-control bg-light ' type="text" name="userName" id="userName" placeholder='UserName' />
        </div>
         <div className='text-danger error-element' >{errors.userName?errors.userName.message:""}</div> 
        <div className="input-group ">
          <div className="input-group-text">
          <i class="fa-solid fa-earth-europe"></i>
          </div>
          <input {...register("country", {
            required: "country is required",
           
          })} className='form-control bg-light ' type="text" name="country" id="country" placeholder='Country' />
        </div>
         <div className='text-danger error-element' >{errors.country?errors.country.message:""}</div> 
        <div className="input-group ">
          <div className="input-group-text">
            <i className='fas fa-key'></i>
          </div>
          <input  {...register("password", {
            required: "password is required" ,
              pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message: "Use: upper, lower, number, special, min 6 chars"
            }
          })} className='form-control  bg-light  ' type="password" name="password" id="password" placeholder='enter your password' />
        </div>
         <div className='text-danger error-element' >{errors.password?errors.password.message:""}</div> 
     </div>
<div className='col-lg-6'>
    <div className="input-group   ">
          <div className="input-group-text">
            <i className='fas fa-envelope'></i>
          </div>
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
          <div className="input-group-text">
           <i class="fa-solid fa-mobile"></i>
          </div>
          <input {...register("phoneNumber", {
            required: "phoneNumber is required",
           


          })} className='form-control bg-light ' type="text" name="phoneNumber" id="phoneNumber" placeholder='enter your Phone Number' />
        </div>
        <div className='text-danger error-element' >{errors.phoneNumber?errors.phoneNumber.message:""}</div> 
         <div className="input-group ">
          <div className="input-group-text">
            <i className='fas fa-key'></i>
          </div>
          <input  {...register("confirmPassword", {
            required: "Confirm password is required",
           validate: (value) =>
      value === password || "Passwords do not match"
          })} className='form-control  bg-light  ' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' />
        </div>
  <div className='text-danger error-element' >{errors.confirmPassword?errors.confirmPassword.message:""}</div> 
</div>
   </div>
        <div className="links d-flex justify-content-end  ">
          <Link to={"/login"} className='text-success text-decoration-none'>
            Login Now !
          </Link>
         
        </div>
        <button type='submit' className=' btn-submit w-100  btn btn-success my-3' disabled={isLoading}>{isLoading?<i className='fas fa-spin fa-spinner'></i>:"Register" }</button>
      </form>
    </div>
  )
}
