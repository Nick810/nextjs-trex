import { getCollection, getProduct } from "@/app/libs/shopify-source";
import { transformProductTitle } from "@/app/libs/utils";
import { performRequest } from "@/app/libs/datocms";
import Product from "@/app/components/product";
import Breadcrumb from "@/app/components/breadcrumb";
import { site } from '../../../../../json/site-config.json';

const descQuery = `
  query getProduct($title: String!, $lang: SiteLocale) {
    allProducts(filter: {title: {eq: $title}}, locale: $lang) {
      additionDescription
      desc
    }
  }
`

export async function generateMetadata({ params }, parent) {
  // const matchedProduct = site.products.find(p => transformProductTitle(p.title) === params.product);
  // const data = await getProduct(matchedProduct.id);
  // const { product } = data;
 
  // // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
 
  // return {
  //   title: product.title,
  //   description: product.seo.description || '',
  //   openGraph: {
  //     images: [product.featuredImage.url, ...previousImages],
  //   },
  // }
}

export default async function Page({ params }) {
  const { lang } = params;
  const { id } = site.collection.find(item => item.title === params.collection);
  const matchedProduct = site.products.find(p => transformProductTitle(p.title) === decodeURIComponent(params.product));
  const collection = await getCollection(id);
  const data = await getProduct(matchedProduct.id);
  const { product } = data;
  const descData = await performRequest({ query: descQuery, variables: { title: product.title.replace(/'/g, ''), lang: lang, revalidate: 10 }});
  
  return (
    <div className="pt-[80px] pb-8">
      <div className="main__layout">
        <Breadcrumb props={params} />
        <Product 
          additionalDesc={descData.data.allProducts.length ? descData.data.allProducts[0].additionDescription : null}
          collectionTitle={params.collection} 
          collection={collection} 
          desc={descData.data.allProducts.length ? descData.data.allProducts[0].desc : null } 
          lang={lang} 
          props={product} 
        />
      </div>
    </div>
  )
}