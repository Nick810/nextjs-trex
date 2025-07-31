import { performRequest } from "@/app/libs/datocms";
import Link from "next/link";
import Image from "next/image";
import shortid from "shortid";

const query = `
  query {
    aboutCanna: allAboutCannas(first: "10", orderBy: date_DESC) {
      id
      date
      title
      image {
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
    howTo: allHowTos(first: "20", orderBy: date_DESC) {
      id
      title
      date
      image {
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

export const metadata = {
  title: 'How-To'
}

export default async function Page({ params }) {
  const { lang } = params; 
  const data = await performRequest({query: query})
  const groupedData = [...data.data.aboutCanna, ...data.data.howTo];

  return (
    <div className="lg:pt-24 pb-8"> 
      <ul className="grid gap-8 md:grid-cols-3 md:px-[5%]">
        {
          groupedData.map(item => (
            <li key={ shortid.generate() } className="rounded-xl">
              <Link href={ `/${lang}/how-to/${item.id}` } className="grid">
                <div style={{ gridArea: "1/1" }}>
                  <Image 
                    src={{ ...item.image.responsiveImage }} 
                    alt={item.image.alt || ''} 
                    width={0}
                    height={0}
                    placeholder="blur"
                    blurDataURL={item.image.blurUpThumb}
                    className="w-full h-[360px] md:h-[320px] object-cover" />
                </div>
                <div className="gradient-bottom z-10" style={{ gridArea: "1/1" }}></div>
                <div className="flex flex-col	justify-end mt-2 main__layout z-10" style={{ gridArea: "1/1" }}>
                  <p className="text-sm text-[#8B8B8B] mt-2 mb-1">{ item.date }</p>
                  <h3 className="text-xl font-bold mb-2">{ item.title }</h3>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}