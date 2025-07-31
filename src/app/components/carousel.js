'use client';

import Image from 'next/image'
import shortid from "shortid";

export default function CarouselModal({ props, currentIndex, state, handleShowModal, prevSlide, nextSlide }) {
  return (
    <div id="defaultModal" tabIndex="-1" ariaHidden="true" className={`${ state ? 'fixed' : 'hidden' } fixed top-0 left-0 right-0 z-[100] w-full overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full`}>
      <div className="relative w-screen h-screen p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)'}}>
        <button type="button" className="absolute top-0 right-0 m-4 text-[#f2f2f2] transition-all duration-300 bg-transparent rounded-lg text-sm w-8 h-8 z-50 ml-auto inline-flex justify-center items-center hover:text-[#f2f2f2]/20" dataModalHide="defaultModal" onClick={ handleShowModal }>
          <svg className="w-4 h-4" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

          <ul className="flex flex-col">
            {
              props.map((item, index) => (
                <li key={shortid.generate()} className={ `slide ${currentIndex === index ? 'slide-active' : '' }` }>
                  <Image src={item.url} alt={ item.altText || "" } fill className="object-contain w-full h-full" />
                </li>
              ))
            }
          </ul>
          <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={ prevSlide }>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f2f2f2]/20 group-hover:bg-white/50 dark:group-hover:bg-black group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-[#f2f2f2]/20 group-focus:outline-none transition-all duration-300">
                <svg className="w-4 h-4 text-[#f2f2f2]" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={ nextSlide }>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f2f2f2]/20 group-hover:bg-white/50 dark:group-hover:bg-black group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-[#f2f2f2]/20 group-focus:outline-none transition-all duration-300">
                <svg className="w-4 h-4 text-[#f2f2f2]" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
            </span>
        </button>
      </div>
    </div>
  )
}