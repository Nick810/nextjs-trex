import Image from 'next/image'
import { getDictionary } from './dictionaries'
import { performRequest } from '../libs/datocms';
import { getCollection } from "@/app/libs/shopify-source"
import { site } from '../json/site-config.json';
import Reviews from '../components/home/review';
import Hero from '../components/home/hero';
import NewArrivals from '../components/home/new-arrivals';
import GrowingSupplies from '../components/home/grow-supplies';
import Merchandise from '../components/home/merchandise';
import About from '../components/home/about';
import StarterPack from '../components/home/starter-pack';
import Gallery from '../components/home/gallery';
import HowTo from '../components/home/how-to';

const PAGE_CONTENT_QUERY = `
  query {
    hero: allUploads(filter: {filename: {matches: {pattern: "hero"}}}) {
      id
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
    ganjana: allUploads(filter: {filename: {matches: {pattern: "ganjana-logo"}}}) {
      id
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
    allAboutCannas(first: "3", orderBy: date_DESC) {
      id
      image {
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
      date
      excerpt
    }
    allHowTos(first: "3", orderBy: date_DESC) {
      id
      image {
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
      date
    }
    allReviews(first: "5") {
      name
      review
    }
  }`;

export default async function Home({ params: { lang } }) {
  const data = await performRequest({ query: PAGE_CONTENT_QUERY});
  const dict = await getDictionary(lang);
  const newArrivals = await getCollection(site.collection[0].id);
  const merchandise = await getCollection(site.collection[1].id);
  const growSupplies = await getCollection(site.collection[2].id);
  const seeds = await getCollection(site.collection[3].id);
  const heroImage = data.data.hero;
  const ganjanaImage = data.data.ganjana;
  const { allAboutCannas, allHowTos, allReviews } = data.data;

  return (
    <>
      <Hero props={ heroImage } lang={ lang } />
      <div className='mb-8'></div>
      <Reviews props={ allReviews } />
      <div className='mb-8'></div>
      <NewArrivals props={ newArrivals.collection.products.nodes } lang={ lang } />
      <div className='mb-8'></div>
      {/* <Seeds props={ seeds.
      collection.products.nodes } lang={ lang }/> */}
      <div className='mb-8'></div>
      <Merchandise props={ merchandise.collection.products.nodes } lang={ lang } />
      <div className='mb-8'></div>
      <StarterPack />
      <div className='mb-8'></div>
      <GrowingSupplies props={ growSupplies.collection.products.nodes } lang={ lang } />
      <div className='mb-8'></div>
      {/* <Podcast /> */}
      <div className='mb-8'></div>
      {/* <Ganjana props={{ ganjanaImage }} /> */}
      <div className='mb-8'></div>
      <About />
      <div className='mb-8'></div>
      <HowTo props={ allHowTos } lang={ lang } />
      <div className='mb-8'></div>
      {/* <AboutCanna props={ allAboutCannas } lang={ lang } /> */}
      <div className='mb-8'></div>
      <Gallery />
    </>
    
  )
}
