import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Hero = () => {
  return (
   <section className="py-4 bg-white">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
      <div className="relative lg:mb-12">
        <img className="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg"  />
        <div className="pl-12 pr-6">
          <img className="relative" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/girl-working-on-laptop.jpg"  />
        </div>
        <div className="absolute left-0 pr-12 bottom-8 xl:bottom-20">
          <div className="max-w-xs bg-blue-600 rounded-lg sm:max-w-md xl:max-w-md">
            <div className="px-3 py-4 sm:px-5 sm:py-8">
              <div className="flex items-start">
                <p className="text-3xl sm:text-4xl">👋</p>
                <blockquote className="ml-5">
                  <p className="text-sm font-medium text-white sm:text-lg">“You made it so simple. My new site is so much faster and easier to work with than my old site.”</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:pl-16">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">We make things easy for projects.</h2>
        <p className="text-xl leading-relaxed text-gray-900 mt-9">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia conse duis enim velit mollit. Exercitation veniam.</p>
        <div className="flex gap-4 mt-4 flex-wrap">
            <NavLink to={"/signup"} className='px-16 py-2 bg-blue-600 rounded text-white'>Sign Up</NavLink>
            <NavLink to={"/signin"} className='px-16 py-2 bg-blue-600 rounded text-white'>Sign In</NavLink>
        </div>
      </div>
    </div>
  </div>
</section>


  )
}

export default Hero