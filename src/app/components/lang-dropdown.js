'use client'

import Link from "next/link";
import shortid from "shortid";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";

export default function LangSelector({props, currentLang}) {
  const [isLang, setIsLang] = useState(false);
  const router = useRouter()
  
  return (
    <div className="relative top-[3px]">
      <button onClick={() => setIsLang(!isLang)}>
        <Image src='/language.svg' alt="Language Icon" width={24} height={24} />
      </button>
      <div className={`${ isLang ? 'block' : 'hidden'} absolute`}>
        <ul className="absolute top-0 bg-[#F2F2F2] rounded-md animate-fadeIn">
          {
            props.map(item => (
              <li key={shortid.generate()} className={ `cursor-pointer py-2 px-4 ${currentLang === item ? 'bg-black' : ''}`} onClick={ () => router.push(`/${item}` )}>
                <Link href={`/${item}`} className={`${currentLang === item ? 'text-[#f2f2f2]' : ' text-fg'} text-center`}>{item}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}