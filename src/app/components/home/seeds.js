import shortid from "shortid"
import Image from "next/image"
import Link from "next/link"
import { transformProductTitle } from "@/app/libs/utils"

export default function Seeds({ props, lang }) {
  return (
    <div className="overflow-x-hidden pl-[5%]">
      <div className="flex justify-between items-center pr-[5%] mb-4">
        <h2 className="text-2xl lg:text-4xl uppercase font-bold">Seeds</h2>
        <Link href={`/${lang}/collection/buds-concentrates-seeds`} className="text-[#ACACAC]">view all</Link>
      </div>
      <ul className="carousel space-x-6">
        {
          props.map(item => (
            <li key={ shortid.generate() } className="carousel-item grid rounded-xl">
              <Link href={`/${lang}/collection/buds-concentrates-seeds/product/${transformProductTitle(item.title)}`}>
                <Image 
                  src={item.featuredImage.url} 
                  alt="" 
                  width={360}
                  height={0}
                  className="w-full rounded-sm" />
                <h3 className="mt-2">{ item.title }</h3>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}