"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@app/utils/supabaseClient";


const Nav = () => {
  // const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [session, setSession]=useState(null)
  console.log('>>> SEsION NAV BAR',session)
  useEffect(() => {
    (async () => {
      const { data:  user  } = await supabase.auth.getUser();
      setSession(user)
    })();
  }, []);

  console.log('>>> PROVIDERs', providers)

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);

  const handleSignOut = async() => {
    try {

      fetch(`/auth/sign-out`, {
        method: "POST",
      });
      
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

            <button type='button' onClick={handleSignOut} className='outline_btn'>
              Sign Out
            </button>

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
            {session &&
              // Object.values(providers).map((provider) => (
                <button
                  type='button'
                  // key={provider.name}
                  onClick={() => {
                    // signIn(provider.id);
                    router.push('/sign-in')
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              // ))
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
                    setToggleDropdown(false);
                    signOut();
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
            {session &&
              // Object.values(providers).map((provider) => (
                <button
                  type='button'
                  // key={provider.name}
                  onClick={() => {
                    // signIn(provider.id);
                    router.push('/sign-in')
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              // ))
              }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;