import Link from "next/link"
import shortid from 'shortid';
import { site } from '../json/site-config.json';

export default function Footer({ lang }) {
  return (
    <footer className="text-center py-8">
      <ul className="grid place-items-center gap-6">
        {
          site.menu.map(menu => (
            <li key={shortid.generate()}>
              <Link href={`/${lang}${menu.path}`} style={{ fontWeight: '200'}} className="text-fg">
                {menu.title}
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="mb-8"></div>
      <div className="grid place-items-center">
        <p className="text-xs mb-4 text-fg">©2015 - { new Date().getFullYear() } T-REX. All rights reserved.</p>
        <p className="text-xs text-fg">Site by Wh@rny3n</p>
      </div>
    </footer>
  )
}