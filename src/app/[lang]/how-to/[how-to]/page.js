import Breadcrumb from "@/app/components/breadcrumb";
import { performRequest } from "@/app/libs/datocms";
import RecommendedHowTos from "@/app/components/recomended-how-to";
import Image from "next/image";

const howToQuery = `
  query getHowTo($id: ItemId!, $lang: SiteLocale) {
    allHowTos(filter: {id: {eq: $id}}, locale: $lang) {
      author
      content(markdown: true)
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
      title
    }
  } 
`
const aboutCannaQuery = `
  query getHowTo($id: ItemId!, $lang: SiteLocale) {
    allAboutCannas(filter: {id: {eq: $id}}, locale: $lang) {
      author
      content(markdown: true)
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
      title
    }
  } 
`
const otherHowTosQuery = `
  query {
    allHowTos(first: "20") {
      id
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
      title
    }
  }
`

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params['how-to'];
  const { lang } = params;
  const aboutCannaId = ["181576142", "185388369", "182273603"].filter(item => item === id);
  const abcQuery = `
    query getHowTo($id: ItemId!) {
      allAboutCannas(filter: {id: {eq: $id}}) {
        title
        image {
          url
        }
      }
    } 
  `
  const hTQuery = `
    query getHowTo($id: ItemId!) {
      allHowTos(filter: {id: {eq: $id}}) {
        title
        image {
          url
        }
      }
    } 
  `
  const { data } = !aboutCannaId.length ? await performRequest({query: hTQuery, variables: {id: id}, revalidate: 60}) : await performRequest({query: abcQuery, variables: {id: params['how-to']}, revalidate: 60})
  const howTo = data.allHowTos ? data.allHowTos[0] : data.allAboutCannas[0];
 
  return {
    title: howTo.title,
    alternates: {
      canonical: `https://www.trexthailand.org/${lang}/how-to/${id}`
    },
    openGraph: {
      image: howTo.image.url
    }
  }
}



export default async function Page({ params }) {
  const { lang } = params;
  const id = params['how-to'];
  const aboutCannaId = ["181576142", "185388369", "182273603"].filter(item => item === id);
  const data = !aboutCannaId.length ? await performRequest({query: howToQuery, variables: {id: id, lang: lang}, revalidate: 60}) : await performRequest({query: aboutCannaQuery, variables: {id: id, lang: lang}, revalidate: 60});
  const howTo = data.data.allHowTos ? data.data.allHowTos[0] : data.data.allAboutCannas[0];
  const otherHowTos = await performRequest({query: otherHowTosQuery})
  const jsonLd = [
        {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": `${howTo.title || aboutCanna.title}`,
        "description": ``,
        "image": howTo.image.url,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.trexthailand.org/${lang}/how-to/${id}`,
          },
        "datePublished": '',
        "dateModified": '',
        "author": {
          "@type": "Person",
          "name": "66Zombies",
          "url": "https://www.trexthailand.org"
        },
        "publisher": {
          "@type": "Person",
          "name": "66Zombies",
          "logo": {
            "@type": "ImageObject",
            "url": ""
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 0,
          "name": "หน้าหลัก",
          "item": `https://www.trexthailand.org/${lang}`
        },{
          "@type": "ListItem",
          "position": 1,
          "name": "Blogs",
          "item": `https://www.trexthailand.org/${lang}/how-to/`
        },{
          "@type": "ListItem",
          "position": 2,
          "name": `${howTo.title}`,
          "item": `https://www.trexthailand.org/${lang}/how-to/${id}`
        }]
      }
    ]

  return (
    <div className="pt-24 pb-8 lg:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="blog__layout">
        <Breadcrumb props={ params } title={howTo.title || aboutCanna.title}/>
        <h1 className="text-2xl mb-3 lg:text-4xl">{howTo.title || aboutCanna.title}</h1>
        <div className="flex items-center gap-2 mt-2 mb-6 text-[#8B8B8B]">
          <p className="text-xs text-[#8B8B8B] ">by {howTo.author || aboutCanna.author}</p>
          |
          <time className="text-xs text-[#8B8B8B] mt-2 mb-2" dateTime={howTo.date}>{howTo.date.split('T')[0] || aboutCanna.date}</time>
        </div>
        <Image 
          src={{ ...howTo.image.responsiveImage }}
          alt={howTo.image.alt || ''} 
          placeholder="blur"
          blurDataURL={howTo.image.blurUpThumb}
          quality={75}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full max-h-[64vh] object-cover block rounded-md" />
        <div className="blog-content pt-8"> 
          <div dangerouslySetInnerHTML={{ __html:howTo.content || aboutCanna.content }} />
        </div>
        <hr class="my-12 h-[0.1em] border-t-0 bg-[#7d7d7d] opacity-50" />
        <RecommendedHowTos props={otherHowTos} id={ id } lang={ lang } />
      </div>
    </div>
  )
}