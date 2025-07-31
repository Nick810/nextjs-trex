'use client'

import Image from "next/image";
import shortid from "shortid"
import Link from "next/link";
import { transformProductTitle } from "../libs/utils";
import BlurImage from "./image";
import { useRouter } from 'next/navigation'

export default function RecommendedProduct({ collection, currentProductTitle, lang, collectionTitle }) {
  const recommendedItems = collection.collection.products.nodes.filter(item => item.title !== currentProductTitle );
  const collection_title = collectionTitle.replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', '').replaceAll('--', '-').toLowerCase();
  const router = useRouter()

  return (
    <section className="mt-8">
      <h3 className="text-3xl font-thin mb-3">A pair you might need</h3>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {
          recommendedItems.splice(0, 4).map((item, index) => {
            const hasMetafields = item.metafields[0];

            return (
              <li key={ index } className="grid rounded-xl">
                <Link href={`/${lang}/collection/${collection_title}/product/${transformProductTitle(item.title).replace('#' , '')}`}>
                  <BlurImage image={item.featuredImage.url} />
                  <ul className="flex gap-2 mb-0 mt-2">
                    {
                      [1,2,3,4,5].map((item) => (
                        <li key={shortid.generate()}>
                          <Image
                            src="/star.svg"
                            alt="Star Review"
                            className=""
                            width={16}
                            height={16}
                            priority
                          />
                        </li>
                      ))
                    }
                  </ul>
                  <div className="flex flex-col mt-2 mb-2 gap-2">
                    <h3 className="text-sm pr-4">{ item.title }</h3>
                    { hasMetafields ? <span className="text-fg block text-sm">{hasMetafields.value}</span> : null }
                  </div>
                  <button onClick={ () => router.push(`/${lang}/collection/${collectionTitle}/product/${transformProductTitle(item.title).replace('#' , '')}`) }
                    className="flex bg-[#F2F2F2] text-xs text-fg w-full rounded-[4px] py-2 px-3 uppercase font-[300] justify-center hover:bg-black hover:border-white hover:border hover:text-white">
                    <p className="mb-0">check it out</p>
                  </button>
                </Link>
              </li>
            )}
          )
        }
      </ul>
    </section>
  )
}