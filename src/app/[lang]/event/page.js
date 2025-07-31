import { performRequest } from "@/app/libs/datocms";
import Link from "next/link";
import BlurImage from "@/app/components/image";
import shortid from "shortid";

const query = `
  query {
    allEvents(first: "20", orderBy: date_DESC) {
      id
      mainImage {
        responsiveImage(imgixParams: {fit: max, auto: format, q: 75}) {
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
      title
    }
  }
`

export async function generateMetadata() {
  return {
    title: 'Events'
  }
}

export default async function Page({ params }) {
  const { lang } = params;
  const { data } = await performRequest({ query: query, revalidate: 60 });
  
  return (
    <div className="pt-[80px] pb-8">
      <ul className="grid gap-8 md:grid-cols-3 md:px-[5%]">
          {
            data.allEvents.map(item => (
              <li key={ shortid.generate() } className="rounded-xl">
                <Link href={ `/${lang}/event/${item.id}` } className="grid">
                  <div style={{ gridArea: "1/1" }}>
                       <BlurImage image={{ ...item.mainImage.responsiveImage }} aspectW="1p5" aspectH="1p5" />
                  </div>
                  <div className="gradient-bottom-sm z-10" style={{ gridArea: "1/1" }}></div>
                  <div className="flex flex-col	justify-end mt-2 main__layout z-10" style={{ gridArea: "1/1" }}>
                    <h3 className="text-2xl text-center font-bold">{ item.title }</h3>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
    </div>
  )
}