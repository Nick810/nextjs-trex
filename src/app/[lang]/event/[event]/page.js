import { performRequest } from "@/app/libs/datocms";
import BlurImage from "@/app/components/image";
import shortid from "shortid";

const query = `
  query getEvent($id: ItemId!) {
    allEvents(filter: {id: {eq: $id}}) {
      links
      images {
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
      title
    }
  }
`

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { event: id } = params;
  
  // fetch data
  const { data } = await performRequest({ query: query, variables: { id: id , revalidate: 10 }})
 
  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `Event - ${data.allEvents[0].title}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default async function Page({ params }) {
  const { event: id } = params;
  const { data } = await performRequest({ query: query, variables: { id: id }, revalidate: 60 })

  return (
    <div className="pt-[80px] pb-8">
      <div className="main__layout">
        <ul className="grid md:grid-cols-3 gap-6 lg:gap-8 gallery-grid">
          {
            data.allEvents[0].images.map(item => (
              <li key={shortid.generate()} className="grid-row-three">
                <BlurImage image={{ ...item.responsiveImage }} aspectW="1p5" aspectH="1p5"/>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}