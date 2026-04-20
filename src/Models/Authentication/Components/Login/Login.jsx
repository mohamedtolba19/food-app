import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {

 let {register , formState:{errors} , handleSubmit} =  useForm()
 let navigate = useNavigate()

 async function onSubmit(data){ 

   try {
    let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login" , data) ;
    localStorage.setItem("token" , response.data.token)
    toast.success("Login successfully");
    navigate("/dashboard")
   } catch (error) {
     toast.error("Login Failed");
     console.log(error)
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
                            <input {...register("email" ,  {
                              required:"Email is required" ,
                              pattern: {
  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  message: "Email is not valid"
}
                            
                            
                            }) } className='form-control bg-light ' type="text" name="email" id="email" placeholder='enter your email'/>
                        </div>
                        {errors.email?<span className='text-danger'>{errors.email.message}</span>:""}
                        <div className="input-group mt-3">
                            <span className="input-group-text">
<i className='fas fa-key'></i>
                            </span>
                            <input  {...register("password" , {
                                required:"password is required"
                            }) } className='form-control  bg-light  ' type="password" name="password" id="password" placeholder='enter your password'/>
                        </div>
                             {errors.password?<span className='text-danger'>{errors.password.message}</span>:""}
                 
                    <div className="links d-flex justify-content-between mt-1  ">
                     <Link to={"./register"} className='text-muted text-decoration-none'>
                     Register Now !
                     </Link>
                     <Link to={"./forgetpass"} className='text-success  text-decoration-none'>
                     Forget Password ?
                     </Link>
                    </div>
                    <button type='submit' className=' btn-submit w-100  btn btn-success my-3'>Log in</button>
                      </form>
   </div>
  )
}
