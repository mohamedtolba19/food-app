import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPass() {

  let { register, formState: { errors }, handleSubmit , watch  } = useForm()
  let navigate = useNavigate()
const password = watch("password")
  async function onSubmit(data) {

    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data);
      localStorage.setItem("token", response.data.token)
      toast.success("Password reset succesfully");
      navigate("/login")
    } catch (error) {
      toast.error("Failed Request");
      console.log(error)
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
        {errors.email ? <span className='text-danger'>{errors.email.message}</span> : ""}

        <div className="input-group mt-3 ">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input {...register("seed", {
            required: "OTP is required",

          })} className='form-control bg-light ' type="text" name="seed" id="seed" placeholder='enter your OTP' />
        </div>
        {errors.seed ? <span className='text-danger'>{errors.seed.message}</span> : ""}

        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input  {...register("password", {
            required: "password is required"
          })} className='form-control  bg-light  ' type="password" name="password" id="password" placeholder='New Password' />
        </div>

        {errors.password ? <span className='text-danger'>{errors.password.message}</span> : ""}

        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className='fas fa-key'></i>
          </span>
          <input  {...register("confirmPassword", {
            required: "Confirm password is required",
           validate: (value) =>
      value === password || "Passwords do not match"
          })} className='form-control  bg-light  ' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' />
        </div>

        {errors.confirmPassword ? <span className='text-danger'>{errors.confirmPassword.message}</span> : ""}


        <button type='submit' className=' btn-submit w-100  btn btn-success my-5'>Submit</button>
      </form>
    </div>
  )
}
