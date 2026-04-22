import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function VerifyAccount() {

  let { register, formState: { errors }, handleSubmit } = useForm()
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data) {
    setIsLoading(true)
    try {
      let response = await axios.put("https://upskilling-egypt.com:3006/api/v1/Users/verify", data);
     
      toast.success("Verified succesfully");
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
        <h3 className=''> Verify Account</h3>
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
  
          <div className="input-group ">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input {...register("code", {
            required: "OTP is required",

          })} className='form-control bg-light ' type="text" name="code" id="code" placeholder='enter your OTP' />
        </div>
               <div className='text-danger error-element' >{errors.code?errors.code.message:""}</div>



         <button type='submit' className=' btn-submit w-100  btn btn-success my-3' disabled={isLoading}>{isLoading?<i className='fas fa-spin fa-spinner'></i>:"Send" }</button>
      </form>
    </div>
  )
}
