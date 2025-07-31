import { getCollection } from "@/app/libs/shopify-source"
import { site } from '../../../json/site-config.json';
import Image from "next/image";
import Link from "next/link";
import shortid from "shortid";
import { transformProductTitle } from "@/app/libs/utils";
import Breadcrumb from "@/app/components/breadcrumb";
import BlurImage from "@/app/components/image";
import { capitalizeWords } from "@/app/libs/utils";

export async function generateMetadata({ params, searchParams }, parent) {
  // const { id } = site.collection.find(item => item.title === params.collection);
  // const data = await getCollection(id);
  // const cappedTitle = capitalizeWords(data.collection.title.toLowerCase());
 
  // return {
  //   title: cappedTitle,
  //   description: data.collection.description || ''
  // }
}

export default async function Page({ params }) {
  const { lang } = params;
  const { id } = site.collection.find(item => item.title === params.collection);
  const data = await getCollection(id);
  const { nodes: products } = data.collection.products;
  const allUnavailable = (items) => {
    return items.every(item => item.availableForSale === false);
  }
  
  return (
    <div className="pt-[80px] pb-8">
      <div className="main__layout">
        <Breadcrumb props={params} />
        <section>
          <h1 className="text-3xl font-thin mb-4">{ data.collection.title }</h1>
            <div className="grid gap-6">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
              { 
                products.length ? products.map((item, index) => {
                  const hasMetafields = item.metafields[0];

                  return (
                    <li key={ shortid.generate() }>
                      <Link href={ `/${lang}/collection/${params.collection}/product/${transformProductTitle(item.title).replaceAll('#', '')}` }>
                        <BlurImage image={item.featuredImage.url} />
                        { params.collection === 'buds-concentrates-seeds' ? <h3 className={`text-md mb-2 ${params.collection === 'growing supplies' ? '' : 'mt-2'}`}>{ item.title } &nbsp;&mdash;&nbsp; { item.variants.nodes[0].title } </h3> : <h3 className={`text-md mb-2 ${params.collection === 'growing supplies' ? '' : 'mt-2'}`}>{ item.title }</h3>}
                        { hasMetafields ? <span className="text-fg text-sm mb-4 block">{hasMetafields.value}</span> : null }
                        <ul className="flex gap-2 mb-3">
                          {
                            [1,2,3,4,5].map((item) => (
                              <>
                                <Image
                                  src="/star.svg"
                                  alt="Star Review"
                                  className=""
                                  width={16}
                                  height={16}
                                  priority
                                />
                              </>
                            ))
                          }
                        </ul>
                        {
                          !allUnavailable(item.variants.nodes) ?
                          <button className="flex bg-[#F2F2F2] border-black border text-xs text-fg w-full rounded-[4px] py-3 px-3 uppercase font-[300] justify-between hover:bg-black hover:border-white hover:border hover:text-white">
                            <p className="">Buy now</p>
                            <p className="lowercase">{ item.variants.nodes.length > 1 ? `from ` : '' }{ (item.priceRange.minVariantPrice.amount * 1).toLocaleString()}.-</p>
                          </button>
                          : 
                          <div className="flex bg-[#F2F2F2] border text-xs w-full rounded-[4px] py-3 px-3 uppercase">
                            <p className="text-red-400">Sold Out</p>
                          </div>
                        }
                      </Link>
                    </li>
                  )
                }) : null
              }
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}