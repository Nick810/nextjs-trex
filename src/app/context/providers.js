'use client';

import { CookiesProvider } from "react-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const appContext = createContext();

export function Provider({children}) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartSlide, setCartSlide] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  function addToCart(obj, action) {
    
    if (!obj.variantId) return;
    
    const itemsInCart = sessionStorage.getItem('itemsInCart');
    const purchaseItem = {
      variantId: obj.variantId,
      variantTitle: obj.variantTitle,
      quantity: obj.quantity,
      imageUrl: obj.imgUrl,
      amount: obj.amount
    }

    if (!itemsInCart) {
      sessionStorage.setItem('itemsInCart', JSON.stringify({items:[purchaseItem]}))
      setItemsInCart(itemsInCart => [...itemsInCart, purchaseItem]);
    } else {
      let duplicate;
      const currentCart = JSON.parse(sessionStorage.getItem('itemsInCart'));

      currentCart.items.forEach(item => {
        if (item.variantId === purchaseItem.variantId) {
          if (action === 'increase') {
            item.quantity = purchaseItem.quantity;
          } else if (action === 'decrease') {
            item.quantity = purchaseItem.quantity;
          } else {
            item.quantity = item.quantity + purchaseItem.quantity
          }
          duplicate = true
        }
      });

      if (!duplicate) {
        currentCart.items.push(purchaseItem)
      }

      sessionStorage.setItem('itemsInCart', JSON.stringify(currentCart));
      setItemsInCart(currentCart.items);
    }

    setCartSlide(true);
  }
  function removeItemInCart(index) {
    const cart = [...itemsInCart];

    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
    }

    sessionStorage.setItem('itemsInCart', JSON.stringify({ items: cart}))
    setItemsInCart(cart)
  }
  function handleCartSlide(bool) { 
    setCartSlide(bool)
  }
  function handleMobileNav(bool) {
    setMobileNav(bool)
  }

  useEffect(() => {
    const itemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
    if (itemsInCart) {
      setItemsInCart(itemsInCart.items);
    }
  }, [])

  return (
    <appContext.Provider value={{ 
      cartSlide,
      mobileNav,
      itemsInCart,
      addToCart,
      handleMobileNav,
      handleCartSlide,
      removeItemInCart 
    }}>
      <CookiesProvider>{ children }</CookiesProvider>
    </appContext.Provider>
  )
}

export function useAppContext() {
  return useContext(appContext);
}