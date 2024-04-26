'use client';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthState = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    checkAuthState();
  }, [pathname]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      router.push('/login');
    } else {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <header>
      <div className='h-20 mb-2 lg:mb-8 flex items-center justify-between'>
        <div>
          <Link href={'/'}>
            <img className='h-12' src='/logo.jpg'></img>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          <Link
            href='/properties'
            className='font-semibold border-b border-transparent hover:border-b hover:border-current cursor-pointer'
          >
            Properties
          </Link>
          <Link
            href='/list-property'
            className='font-semibold border-b border-transparent hover:border-b hover:border-current cursor-pointer'
          >
            List a property
          </Link>
          {!user ? (
            <Link
              href='/login'
              className='text-white text-sm bg-neutral-950 hover:bg-neutral-800 py-2 px-4 rounded-md'
            >
              Login
            </Link>
          ) : (
            <button
              onClick={signOut}
              className='text-white text-sm bg-neutral-950 hover:bg-neutral-800 py-2 px-4 rounded-md'
            >
              Sign out
            </button>
          )}
        </div>

        {/* Toggle Icon */}
        <div
          className='md:hidden flex items-center'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className='w-6 h-6 cursor-pointer'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path>
            </svg>
          ) : (
            <svg
              className='w-6 h-6 cursor-pointer'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              ></path>
            </svg>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='flex flex-col gap-4 px-8 py-8 md:hidden'>
          <Link
            href='/properties'
            className='block text-xl font-semibold cursor-pointer'
          >
            Properties
          </Link>
          <Link
            href='/list-property'
            className='block text-xl font-semibold cursor-pointer'
          >
            List a property
          </Link>
        </div>
      )}
    </header>
  );
}
