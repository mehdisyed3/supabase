'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  const [provider, setProvider] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(()=>{
    const setProviders = async() =>{
      const response = await getProviders()

      setProvider(response)
     }
     setProvider()
  },[])

  // console.log('>>> providers', provider)

  const isUserLoggedIn = true
  return (
   <nav className='flex-between w-full mb-16 pt-3'>
    <Link href='/' className='flex gap-2 flex-center'>
      <Image src='/assets/images/logo.svg' alt='logo' width={30} height ={30} className='object-contain'/>
      <p className='logo_text'>Promptopia</p>
    </Link>
    {/* {desjktop NAvigation} */}
    <div className='sm:flex hidden'>
      {
        isUserLoggedIn ?
        <div className='flex gap-3 md:gap-5'>
          <Link className='black_btn' href='/create-prompt' >
            Create Post
          </Link>
          <button type='button' className='outline_btn' onClick={signOut}>
            Sign Out
          </button>
          <Link href='/profile'>
            <Image src='/assets/images/logo.svg' 
             className='rounded-full' alt='profile' height ={37} width={37}/>

          </Link>
        </div>
        :
        <>
        {
          provider && Object.values(provider)?.map(item => {
            <button 
            type='button'
            key ={item.name} 
            onClick ={() => signIn(provider.id)}
            className='black_btn'>
              Sign In
            </button>
          })
        }
        </>
      }

    </div>
    {/* Mobile Nav */}
    <div className='sm:hidden flex relative'>
      {
        isUserLoggedIn ?
        <div className='flex'>
          <Image 
          src='/assets/images/logo.svg' 
          onClick={()=>{ setToggleDropDown(!toggleDropDown)}}
          className='rounded-full' 
          alt='profile' 
          height ={37}
          width={37}
          />
          {
            toggleDropDown && (
              <div className='dropdown'>
                <Link
                href='/profile'
                className='dropdown_link'
                onClick={()=>{setToggleDropDown(false)}}
                >
                 My Profile
                </Link>

                <Link
                href='/create-prompt'
                className='dropdown_link'
                onClick={()=>{setToggleDropDown(false)}}
                >
                 Create Prompt
                </Link>
                <button type ='button'
                className='mt-5 w-full black_btn'
                onClick={()=>{
                  setToggleDropDown(false)
                  signOut()
                }} >
                  Sign Out
                </button>
                
              </div>
            )

          }
        </div> :
        <>
         {
          provider && Object.values(provider)?.map(item => {
            <button 
            type='button'
            key ={item.name} 
            onClick ={() => signIn(provider.id)}
            className='black_btn'>
              Sign In
            </button>
          })
        }
        </>
      }
    </div>

   </nav>
  )
}

export default Nav