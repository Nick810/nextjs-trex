'use client'

import { Rotate as Hamburger } from 'hamburger-react'
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import LangSelector from './lang-dropdown';
import Mobilenav from './mobilenav';
import { useAppContext } from '../context/providers';
import DesktopNav from './desktop-nav';

export default function Header({props}) {
  const { handleCartSlide } = useAppContext();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const lang = props;
  const handleSetHamburger = () => setHamburgerOpen(!hamburgerOpen);
  
  useEffect(() => {
    const totalItems = JSON.parse(sessionStorage.getItem('itemsInCart'))
    const handleStorageChange = () => setItemsInCart(totalItems);

    // Add event listener to listen for storage change
    window.addEventListener ('storage', handleStorageChange);
    
    if (totalItems) {
      setItemsInCart(totalItems.items.length)
    }

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <>
      <header className='gradient-top grid fixed z-[100] w-full h-[80px]'>
        <nav className='main__layout grid'>
          <ul className="grid grid-cols-3 lg:grid-cols-[80px_860px_1fr] lg:gap-16 text-fg">
            <li className='lg:hidden'>
              <ul className='h-full flex items-center'>
                <li><Hamburger toggled={hamburgerOpen} toggle={setHamburgerOpen} /></li>
                <li><Mobilenav state={hamburgerOpen} handleSetHamburger={handleSetHamburger} /></li>
              </ul>
            </li>
            <li className='h-full flex justify-center items-center'><Link href={`/${lang}`} onClick={() => setHamburgerOpen(false)}><Image src="/logo.png" width={80} height={32} alt=" T-REX logo" /></Link></li>
            <DesktopNav />
            <li className='flex align-center gap-4 justify-end relative h-full items-center'>
              <LangSelector props={['en', 'th']} currentLang={ lang } />
              <button onClick={ () => handleCartSlide(true) } className='flex relative'>
                <Image src="/shopping-bag.svg" alt="" width={24} height={24} priority />
                <span className='absolute right-[-8px] top-[-16px]'>{ itemsInCart }</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}