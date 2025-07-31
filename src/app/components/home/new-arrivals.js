import shortid from "shortid"
import Link from "next/link"
import Image from 'next/image'
import { transformProductTitle } from "@/app/libs/utils";

export default function NewArrivals({ props, lang }) {

  return (
    <div className="overflow-x-hidden pl-[5%]">
      <div className="flex justify-between items-center pr-[5%] mb-4">
        <h2 className="text-2xl lg:text-4xl uppercase font-bold">Just Flew In</h2>
        <Link href={`/${lang}/collection/buds-concentrates-seeds`} className="text-[#ACACAC]">view all</Link>
      </div>
      <ul className="carousel space-x-6">
        {
          props.map(item => (
            <li key={ shortid.generate() } className="carousel-item grid rounded-xl">
              <Link href={`/${lang}/collection/buds-concentrates-seeds/product/${transformProductTitle(item.title)}`}>
                <Image 
                  src={ item.featuredImage.url }
                  alt="" 
                  width={200}
                  height={300}
                  className="rounded-md h-[300px] object-cover" />
                <h3 className="mt-2">{ item.title }</h3>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}