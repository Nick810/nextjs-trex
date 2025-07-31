'use client';

import Link from "next/link"
import Image from "next/image";
import BlurImage from "../image";

export default function Hero({ props, lang }) {
  
  return (
    <div className="grid lg:grid-cols-2">
      <div className="grid hero-image">
        <div className="" style={{ gridArea: "1/1" }}>
          <Image 
            src="/ganjana-bg-mb-2.jpg" 
            alt="" 
            width={0}
            height={0}
            sizes="100vw"
            className="w-[100%] h-screen object-cover m-auto block lg:hidden" />
          <Image 
            src="/ganjana-bg-2.png" 
            alt="" 
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-[100vh] object-cover hidden lg:block" />
        </div>
      </div>
      <div className='main__layout hero-text mt-auto mb-16 lg:mt-0 lg:pt-[280px] lg:pb-[120px] z-10 w-full'>
        <h1 className='text-3xl lg:text-6xl mb-4 font-bold text-white hero-heading'>ONE STOP SHOP TO GROW</h1>
        <Link href={`/${lang}/collection/growing-supplies`} className="btn bg-[#F2F2F2] text-fg w-full rounded-[4px] py-4 uppercase font-[300] hover:bg-black hover:border-white hover:border hover:text-white" style={{ maxWidth: '480px' }}>Shop Now</Link>
      </div>
    </div>
  )
}