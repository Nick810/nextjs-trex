import shortid from "shortid"
import BlurImage from "../image"
import Image from "next/image"
import Link from "next/link"
import { transformProductTitle } from "@/app/libs/utils"

export default function GrowingSupplies({ props, lang }) {
  return (
    <section className="overflow-x-hidden pl-[5%] my-8">
      <div className="flex justify-between items-center pr-[5%] mb-4">
        <h2 className="text-2xl lg:text-4xl uppercase font-bold">Growing Supplies</h2>
        <Link href={`/${lang}/collection/growing-supplies`} className="text-[#ACACAC]">view all</Link>
      </div>
      <ul className="carousel space-x-6">
        {
          props.splice(0,6).map(item => (
            <li key={ shortid.generate() } className="carousel-item grid">
              <Link href={`/${lang}/collection/growing-supplies/product/${transformProductTitle(item.title)}`}>
                {/* <div className="rounded-sm w-[200px] h-[260px]"> */}
                {/* <BlurImage image={item.featuredImage.url} height="260px" /> */}
                {/* </div> */}
                <Image 
                  src={item.featuredImage.url} 
                  alt="" 
                  width={200}
                  height={0}
                  className="rounded-sm h-[260px] object-cover" />
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-sm">{ item.title }</h3>
                  <p className="text-xs">{ item.priceRange.minVariantPrice.amount === item.priceRange.maxVariantPrice.amount ? `${item.priceRange.minVariantPrice.amount * 1}฿` : `${item.priceRange.minVariantPrice.amount * 1}฿ - ${item.priceRange.maxVariantPrice.amount * 1}฿` }</p>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}