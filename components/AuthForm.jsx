"use client";

import React, { useState } from 'react'
import { supabase } from '@app/utils/supabaseClient';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const router = useRouter()

  const handleSignUp = async (e) => {
    e.preventDefault()
    //
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (!error) {
      setIsSigningUp(true)
    }
  }

  const handleLogIn = async (e) => {
    e.preventDefault()

    setIsSigningIn(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    console.log({ error, data })

    if (!error) {
      router.push('/')
    }
  }

  let signInMessage = 'Sign In'

  if (isSigningIn) {
    signInMessage = 'Signing In'
  } else if (isNewUser) {
    signInMessage = 'Sign Up'
  }

  const signUpMessage = <p className="text-center text-black"> Email Sent! Check your email to confirm Sign Up</p>

  return (
    <form onSubmit={isNewUser ? handleSignUp : handleLogIn}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-20"
        placeholder='Email'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-5"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit'
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-3"
      > {signInMessage}</button>

      <p className="text-center text-orange mt-3">
        {
          isNewUser ? (
            <>
              Already have an account ? {' '}
              <button
                className="text-indigo-400 hover:text-indigo-600 "
                type='button'
                onClick={() => setIsNewUser(false)}>
                Sign In
              </button>
            </>
          ) : (
            <>
              <>
                Don't have an account ? {' '}
                <button
                  className="text-indigo-400 hover:text-indigo-600"
                  type='button'
                  onClick={() => setIsNewUser(true)}>
                  Sign Up
                </button>
              </>

            </>
          )
        }
      </p>
      {
        isSigningUp && signUpMessage
      }

    </form>
  )
}

export default AuthForm