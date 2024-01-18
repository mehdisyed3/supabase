"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@app/utils/supabaseClient";


const Nav = () => {
  const router = useRouter();

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [session, setSession]=useState(null)

  useEffect(() => {
    (async () => {
      const { data:  user  } = await supabase.auth.getUser();
      // const { data:  session  } = await supabase.auth.getSession();
      setSession(user)
    })();
  }, []);

  console.log('>>> router', router)

  const handleSignOut = async() => {
    try {

      fetch(`/auth/sign-out`, {
        method: "POST",
      });
      console.log('>>>> signout function')
      router.push('/sign-in')
      
    } catch (error) {
      console.log('>>> err',error)
    }
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            {/* <form action='/auth/signout' method='post'> */}
            <button type='button' onClick={()=>handleSignOut()} className='black_btn '>
              Sign Out
            </button>
            {/* </form> */}
            <Link href='/profile'>
              <Image
                src='/assets/images/aurora-reflections--tv.jpg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {session && session?.user &&
              Object?.values(session?.user).map((user) => (
                <button
                  type='button'
                  key={user}
                  onClick={() => {
                    router.push('/sign-in')
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))
              }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src='/assets/images/aurora-reflections--tv.jpg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    handleSignOut()
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {session && session?.user &&
              Object.values(session.user).map((user) => (
                <button
                key={user}
                  type='button'
                  onClick={() => {
                    router.push('/sign-in')
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))
              }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;