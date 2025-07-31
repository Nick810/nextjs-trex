'use client';

import Image from "next/image";
import { useState } from "react";
import ProductImage from "./product-image";
import { useAppContext } from "../context/providers";

export default function LineItem({props, index}) {
  const { addToCart, removeItemInCart } = useAppContext();
  const [purchase, setPurchase] = useState({ variantId: '', variantTitle: '', quantity: props.quantity, imageUrl: '' });
  const handleDecrease = (e) => {
    let { quantity } = purchase;
    
    if (+quantity <= 1) {
      quantity = 1
    } else {
      quantity = quantity - 1;
    } 

    const newValue = { 
      variantId: e.target.getAttribute('data-variant-id'),
      quantity: quantity,
    }
    setPurchase(purchase => ({...purchase, quantity: quantity }))
    addToCart(newValue, 'decrease')
  };
  const handleIncrease = (e) => {
    let { quantity } = purchase;
    
    if (+quantity >= 99) {
      quantity = 99
    } else {
      quantity = quantity + 1;
    } 

    const newValue = { 
      variantId: e.target.getAttribute('data-variant-id'),
      quantity: quantity,
    }

    setPurchase(purchase => ({...purchase, quantity: quantity }))
    addToCart(newValue, 'increase')
  };
  const handleInput = e => {
    let { quantity } = purchase;
    const { value } = e.target;
    const newValue = { 
      variantId: e.target.getAttribute('data-variant-id'),
      quantity: +value,
    }
    
    if (+value < quantity) {
      addToCart(newValue, 'decrease')
    } else {
      addToCart(newValue, 'increase')
    }
    
    setPurchase(purchase => ({...purchase, quantity: +value }))
  }

  return (
    <li className="grid grid-cols-[20%_1fr_20%]">
      <ProductImage>
        <Image src={ props.imageUrl } alt={ props.variantTitle || '' } fill />
      </ProductImage>
      <div>
        <h3 className="text-fg mb-2">{ props.variantTitle }</h3>
        <div className="grid grid-cols-[16px_48px_16px]">
          <button>
            <span 
              className="text-fg"
              data-variant-id={ props.variantId } 
              onClick={ e => handleDecrease(e) }>-</span>
          </button>
          <input 
            type="number" 
            className="text-fg indent-2 bg-[#f2f2f2] border border-[#8B8B8B] rounded-sm text-sm" 
            min={1} 
            max={99} 
            value={purchase.quantity} 
            data-variant-id={ props.variantId } 
            onChange={e => handleInput(e) } />
          <button>
            <span 
              className="text-fg"
              data-variant-id={ props.variantId } 
              onClick={ e => handleIncrease(e) }>+</span>
          </button>
        </div>
      </div>
      <div>
        <button type="submit" className="btn bg-[#f2f2f2] border-none p-0 text-red text-right ml-auto block hover:bg-transparent" onClick={ () => removeItemInCart(index) }>
          <span className="sr-only">Close panel</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ae2020">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="text-fg text-right text-xs">{(props.amount * 1 * purchase.quantity).toLocaleString()}.-</p>
      </div>
    </li>
  )
}