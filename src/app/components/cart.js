'use client';

import { useTransition } from "react";
import { useAppContext } from "../context/providers";
import LineItem from "./lineitem";
import shortid from "shortid";
import { addCart } from "../actions";

export default function Cart({props}) {
  const { lang } = props;
  const [isPending, startTransition] = useTransition();
  const { cartSlide, handleCartSlide, itemsInCart } = useAppContext();
  const handleCheckout = async() => {
    const { items } = JSON.parse(sessionStorage.getItem('itemsInCart'));
    const cartItems = items.map(item => {
      ['variantTitle', 'amount', 'imageUrl'].forEach(key => delete item[key]);
      if (item.hasOwnProperty('variantId')) {
        item['merchandiseId'] = item['variantId'];
        delete item['variantId'];
      }
      return item;
    })
    await addCart(cartItems);
    window.location.href =`/${lang}/cart`;
  }

  
  return (
    <div className={ `relative z-[100] ${cartSlide ? 'block' : 'hidden' } animate-fadeIn` } aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-[#F2F2F2] shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => handleCartSlide(false)}>
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {
                        itemsInCart.length ?
                        <ul className="grid gap-4">
                        {
                          itemsInCart.map((item, index) => (
                            <LineItem props={{ ...item }} key={ shortid.generate() } index={ index } />
                          ))
                        }
                        </ul> : <p className="text-fg">There are no items in the cart.</p>
                      }
                      </ul>
                    </div>
                  </div>

                  {
                    itemsInCart.length ?
                      <div className="border-t border-gray-200 py-6 mt-8">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p className="">{ itemsInCart.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amount * currentValue.quantity), 0).toLocaleString()}.-</p>
                        </div>
                        <p className="mt-0.5 mb-4 text-sm text-[#8B8B8B]">Shipping and taxes calculated at checkout.</p>
                        <button className="flex items-center justify-center rounded-sm border border-transparent bg-black px-6 py-3 text-base font-medium text-[#F2F2F2] shadow-sm w-full" onClick={ () => startTransition(() => handleCheckout())}>Checkout</button>
                      </div> : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}