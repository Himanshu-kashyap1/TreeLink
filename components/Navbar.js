"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {


  const pathname = usePathname();
  const showNavbar = ["/","/generate"].includes(pathname);

  return (<>
    {showNavbar && <nav className='bg-white w-[80vw] fixed flex justify-between top-10 right-[10vw] rounded-full px-8 py-5'>
        <div className='logo flex gap-12 items-center'>
          <Link href={"/"}>
            <Image src='/logo.svg' width={120} height={80} alt='logo'/>
            </Link>
            <ul className='flex gap-6'>
              <Link href="/"><li>Templates</li></Link>
              <Link href="/"><li>Marketplace</li></Link>
              <Link href="/"><li>Discover</li></Link>
              <Link href="/"><li>Pricing</li></Link>
              <Link href="/"><li>Learn</li></Link>
            </ul>
        </div>
        <div className='flex gap-4'>
          <button className='login bg-gray-400 p-2 px-3 rounded-lg font-bold'>Log in</button>
          <button className='signup bg-gray-900 text-white p-2 px-3 rounded-full font-bold'>Sign up Free </button>
        </div>
    </nav>}
    </>
  )
}

export default Navbar
