'use client'

import shortid from 'shortid';
import { site } from '../json/site-config.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Mobilenav({state, handleSetHamburger}) {
  const pathname = usePathname();
  const lang = pathname.slice(1, 3);

  return (
    <nav className={`${state ? 'block' : 'hidden'} fixed bg-[#F2F2F2] top-0 left-0 w-[360px] z-[200] h-screen animate-fadeIn`}>
      <div className='pl-[8%] h-[64px] grid'>
        <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => handleSetHamburger()}>
          <span className="sr-only">Close panel</span>
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul className={`grid border border-t-1`}>
        {
          site.menu.map(menu => (
            <li key={shortid.generate()} className='py-6 border border-t-1'>
              <Link href={`/${lang}${menu.path}`} onClick={() => handleSetHamburger()} className='text-fg px-[8%]'>
                {menu.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}