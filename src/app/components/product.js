'use client';

import shortid from "shortid";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "../context/providers";
import RecommendedProduct from "./recommended-products";
import BlurImage from "./image";
import AdditionalDesc from "./product-content";
import CarouselModal from "./carousel";

export default function Product({ additionalDesc, desc, props, collection, lang }) {
  const { addToCart } = useAppContext();
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [purchase, setPurchase] = useState({ variantId: '', variantTitle: '', quantity: 1, imageUrl: '' });
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (index) => setShowModal(!showModal);
  const handleClick = (variantId) => { 
    if (!variantId) {
      setError('Please select a size to purchase.')
    }
  }
  const handlePurchase = (e) => {
    const newValue = { 
      imgUrl: e.target.getAttribute('data-variant-image-url'),
      variantTitle: e.target.getAttribute('data-variant-title'),
      variantId: e.target.getAttribute('data-variant-id'),
      quantity: purchase.quantity,
      amount: e.target.getAttribute('data-amount')
    }
    setError('')
    setPurchase(newValue);
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? props.images.nodes.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex)
  }
  const nextSlide = () => {
    const isLastSlide = currentIndex === props.images.nodes.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex)
  }
  const isSeed = props.tags.includes('Seeds')
  const hasAvailableVariant = props.variants.edges.some(item => item.node.availableForSale);

  return (  
    <>
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h1 className="text-3xl font-thin mb-2 lg:hidden">{props.title}</h1>
          <ul className="flex gap-2 mb-4 lg:hidden">
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

          <div className="grid grid-cols-[80px_1fr] grid-6 lg:mt-8">
            { props.images.nodes.length > 1 ? 
              // Carousel Thumbnails
              <ul className="pr-2">
                {
                  props.images.nodes.map((item, index) => (
                    <li 
                      key={index} 
                      className="mb-4 rounded-[4px] transition-all hover:border-[transparent] cursor-pointer object-cover!"
                      onClick={() => handleShowModal(index)}>
                      <BlurImage image={item.url} />
                    </li>
                  ))
                }
              </ul> 
              :
              <ul className="">
                {
                  props.variants.edges.map((item, index) => (
                    <li 
                      key={index} 
                      className={`${selectedIndex === index ? 'z-10' : 'absolute pointer-events-none'}`}
                      >
                      <BlurImage image={item.node.image.url} />
                    </li>
                  ))
                }
              </ul>
              }
            <ul>
              {
                props.variants.edges.map((item, index) => (
                  <li key={index} className={ `${ selectedIndex !== index ? 'hidden' : '' }` }>
                    <BlurImage image={item.node.image.url} />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        
        <div>
          <ul className="gap-2 mb-4 justify-end hidden lg:flex">
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
          <h1 className="text-3xl font-thin mb-2 hidden lg:block">{props.title}</h1>
          
          { 
          isSeed ? 
            <div className="mb-8">
              <div
                className="text-fg mb-prose prose-sm lg:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: props.descriptionHtml }}
                aria-label="Product Description"
              />
            </div> : null
          }
          { desc ? <p className="mb-4 text-fg p-description">{ desc }</p> : null }

          { hasAvailableVariant && (
            <>
              <h3 className="text-2xl font-thin mb-3">Select Size</h3>
              <div className="">
                <ul className="grid gap-3">
                  {
                    props.variants.edges.map((item, index) => (
                      <li 
                        key={shortid.generate()} 
                        onClick={ e => {
                          setSelectedIndex(index)
                          setSelectedVariant(index)
                          handlePurchase(e)
                        }}
                        data-amount={ item.node.price.amount }
                        data-variant-title={ `${item.node.image.altText } ${item.node.title}`}
                        data-variant-id={ item.node.id } 
                        data-variant-image-url={ item.node.image.url }
                        className={ `${ selectedVariant === index && item.node.availableForSale ? 'selected bg-[#F2F2F2] text-fg' : '' } ${!item.node.availableForSale ? 'sold-out pointer-events-none' : ''} cursor-pointer btn bg-black text-[#F2F2F2] rounded-[4px] border-[#F2F2F2] hover:bg-[#f2f2f2] hover:border-[#f2f2f2] hover:border hover:text-[#000]` }>
                          { item.node.availableForSale ? item.node.title : `${ item.node.title} - sold out`}
                      </li>
                    ))
                  }
                </ul>
              </div>
              {
                <div className="grid grid-cols-[80px_1fr] gap-4 mt-6">
                  <div className="grid relative">
                    <p className="absolute top-[-12px] bg-[#f2f2f2] text-fg text-xs rounded-[4px] p-1 left-1">quantity</p>
                    <input type="number" className="text-fg bg-[#F2F2F2] rounded-[4px] w-full block indent-4" value={purchase.quantity} min={1} max={99} onChange={ e => setPurchase(purchase => ({ ...purchase, quantity: +e.target.value })) }/>
                  </div>
                  <button 
                    className="btn bg-[#F2F2F2] text-fg w-full rounded-[4px] py-4 uppercase font-[300] justify-between hover:bg-black hover:border-white hover:border hover:text-white"
                    onClick={ () => { addToCart(purchase, 'addCart'); handleClick(purchase.variantId) } }>
                    <p className="translate-y-[-4px]">add to cart</p>
                    <ul>
                      {
                        props.variants.edges.map((item, index) => {
                          return (
                          <li 
                            key={item.node.id} 
                            className={ `${ selectedIndex === index ? '' : 'hidden' } translate-y-[-4px]` }>
                              {(item.node.price.amount * 1).toLocaleString()}.-
                          </li>
                        )})
                      }
                    </ul>
                  </button>
                </div>
              }  
            </>
          )
        }
          { error ? <p className="text-[red] mt-4 font-[300]">{ error }</p> : null}
          {
            <>
              { additionalDesc !== null || undefined ?  
                <h3 className="text-2xl font-thin mb-4 mt-4">Additional Info</h3> 
                : null
              } 
              <ul className="grid gap-4 mt-4 mb-4 product-content">
                {
                  additionalDesc !== null || undefined ? 
                  Object.entries(additionalDesc).map((k, v) => (
                    <AdditionalDesc key={ shortid.generate() } k={k} />  
                  )) : null
                }
              </ul> 
            </>
          }
        </div>
        
      </div>
      <RecommendedProduct collection={collection} currentProductTitle={props.title} lang={lang} collectionTitle={collection.collection.title} />
      <CarouselModal props={props.images.nodes} state={ showModal } handleShowModal={ handleShowModal } currentIndex={ currentIndex } prevSlide={prevSlide} nextSlide={nextSlide} />
    </>
  )
}