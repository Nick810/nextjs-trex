import shortid from "shortid"
import Link from "next/link"
import Image from "next/image"

export default function Merchandise({ props, lang }) {
  return (
    <section className="overflow-x-hidden pl-[5%]">
      <div className="flex justify-between items-center pr-[5%] mb-4">
        <h2 className="text-2xl lg:text-4xl uppercase font-bold">Merchandise</h2>
        <Link href={`/${lang}/collection/merchandise`} className="text-[#ACACAC]">view all</Link>
      </div>
      <ul className="carousel space-x-6">
        {
          props.map(item => (
            <li key={ shortid.generate() } className="carousel-item grid rounded-xl">
              <Link href={`/${lang}/collection/merchandise/product/${item.title.toLowerCase().replaceAll(' ', '-')}`}>
                <Image 
                  src={item.featuredImage.url} 
                  alt="" 
                  width={300}
                  height={0}
                  className="w-full rounded-sm" />
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