import { performRequest } from "@/app/libs/datocms";
import Image from "next/image";
import shortid from "shortid";

const dealerQuery = `
  query {
    allDealers {
      name
      link
      links
      address
      tel
      logo {
        blurUpThumb
        alt
        responsiveImage(imgixParams: {fit: fill, auto: format, q: 75}) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            base64
          }
      }
      images {
        blurUpThumb
        alt
        responsiveImage(imgixParams: {fit: fill, auto: format, q: 75}) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            base64
          }
      }
    }
  }
`

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: 'Authorized Dealers'
  }
}

export default async function Page({ params }) {
  const { lang } = params;
  const { data } = await performRequest({ query: dealerQuery, revalidate: 60 });

  return (
  <div className="pt-[80px] pb-8">
    <div className="main__layout">
      <h1 className="text-2xl uppercase font-bold lg:text-4xl">Authorized Dealers</h1>
      <ul className="grid gap-6 md:grid-cols-3 mt-4">
        { data.allDealers.map(item => (
          <li key={shortid.generate() } className="rounded-xl dealer-card-background p-4 flex flex-col">
            {
              item.images.length ? 
              <ul className="flex flex-row gap-2">
                {
                  item.images.map(item => ( 
                    <li key={shortid.generate()}>
                      <Image 
                        src={{ ...item.responsiveImage }} 
                        alt={item.alt || ''} 
                        placeholder="blur"
                        blurDataURL={item.blurUpThumb}
                        priority
                        width={40}
                        height={40}
                        className="object-contain mb-2" />
                    </li>
                  ))
                }
              </ul> 
              :
              <Image 
                src={{ ...item.logo.responsiveImage }} 
                alt={item.logo.alt || ''} 
                placeholder="blur"
                blurDataURL={item.logo.blurUpThumb}
                priority
                width={40}
                height={40}
                className="object-contain mb-2" /> 
            }
            <h3 className="text-lg font-bold mb-1">Name&#58; { item.name }</h3>
            <p className="text-sm text-[#c1c1c1] mb-1">Address&#58; { item.address }</p>
            <a href={`tel:${item.tel}`} className="text-sm text-[#c1c1c1] mb-1">Tel&#58; <span className="text-[#8B8B8B] hover:text-[#f2f2f2] transition-all">{ item.tel }</span></a>
            { !item.links ? <a href={ item.link } className="text-sm text-[#c1c1c1] mb-4">Website&#58; <span className="text-[#8B8B8B] hover:text-[#f2f2f2] transition-all">{ item.link }</span></a> : null }
            { item.links ? 
            <div className="flex flex-row items-center">
              <p className="text-sm text-[#c1c1c1] inline-block">Website&#58;&nbsp;</p>
              <ul className="flex flex-row items-center gap-2">
                {
                  item.links.split(', ').map(link => (
                  <li className="text-sm" key={ shortid.generate()}>
                    <a className="text-[#8B8B8B] hover:text-[#f2f2f2] transition-all" href={ link }>{ link }</a>
                  </li> 
                  ))
                }
              </ul>
            </div>
            : null 
            }
            <Image 
              src="/t-rex-dino-logo-bw.png"
              alt="" 
              priority
              width={24}
              height={24}
              style={{ marginBlockStart: 'auto' }}
              className="object-contain self-end margin" />
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}