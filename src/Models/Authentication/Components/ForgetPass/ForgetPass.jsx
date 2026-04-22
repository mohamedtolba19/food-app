import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgetPass() {

  let { register, formState: { errors }, handleSubmit } = useForm()
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data) {
    setIsLoading(true)
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data);
      localStorage.setItem("token", response.data.token)
      toast.success("Request sent succesfully");
      navigate("/resetpass")
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
        <h3 className=''>Forgot Your Password?</h3>
        <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
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




         <button type='submit' className=' btn-submit w-100  btn btn-success my-3' disabled={isLoading}>{isLoading?<i className='fas fa-spin fa-spinner'></i>:"Submit" }</button>
      </form>
    </div>
  )
}
