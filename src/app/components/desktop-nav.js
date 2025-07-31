'use client';

import { site } from '../json/site-config.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import shortid from 'shortid';

export default function DesktopNav() {
  const pathname = usePathname();
  const lang = pathname.slice(1, 3);

  return (
    <nav className={`hidden lg:flex lg:items-center`}>
      <ul className={`flex gap-6`}>
        {
          site.menu.map(menu => (
            <li key={shortid.generate()} className=''>
              <Link href={`/${lang}${menu.path}`} onClick={() => handleSetHamburger()} className='text-fg uppercase'>
                {menu.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}