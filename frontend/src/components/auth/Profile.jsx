import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setCredentials } from '../../store/features/authSlice';
import { Spinner } from 'flowbite-react';
import { useUpdateProfileMutation } from '../../store/features/usersApiSlice';

const Profile = () => {
    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:""
    });
    const {userInfo} = useSelector((state) => state.auth);
    const [ updateUser, { isLoading }] = useUpdateProfileMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      setFormData({
        name:userInfo?.data.name,
        email:userInfo?.data.email,
        password:""
      })
    },[])

const handleInputChange = (e) => {
    setFormData({
     ...formData,
        [e.target.name]:e.target.value
    })
}

if(isLoading){
  return <div className="text-center">
  <Spinner aria-label="Center-aligned spinner example" />
</div>
}

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
   
      // console.log(formData);
      const res = await updateUser({
        id:userInfo?.data._id,
        name:formData.name,
        email:formData.email,
        password:formData.password
      }).unwrap();
      dispatch(setCredentials({...res}));
      toast.success("Profile updated successfully!");
      navigate("/");

      setFormData({
          name:"",
          email:"",
          password:""
      })
    } catch (err) {
      toast.error(err?.data?.message || err.message)
      console.log( "Register error : " +err?.data?.message || err.message);
    }
}
  return (
   <section className="">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Profile</h2>
      {/* <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">You can create a free Celebration account in 2 minutes</p> */}
    </div>
    <div className="relative max-w-md mx-auto mt-8 md:mt-4">
      <div className="overflow-hidden bg-white rounded-md shadow-md">
        <div className="px-4 py-6 sm:px-8 sm:py-7">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900"> First &amp; Last name </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input type="text"  name="name" value={formData.name} onChange={handleInputChange} id="name" placeholder="Enter your full name" className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} id="email" placeholder="Enter email to get started" className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} id="password" placeholder="Enter your password" className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                </div>
              </div>
              <div>
                <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>


  )
}

export default Profile