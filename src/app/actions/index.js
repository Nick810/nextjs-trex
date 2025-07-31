'use server'

import { addToCart, getCheckoutUrl, updateCart } from "../libs/shopify-source";
import { cookies } from "next/headers";

export async function addCart(lines) {
  const cookieStore = cookies();
  const d = new Date();
  const expiredMin = 2;
  let cartId = cookieStore.get('T-REX420-cartId');

  if (cartId) {
    await updateCart(cartId.value, lines)
    const { cart } = await getCheckoutUrl(cartId.value)
    
    cookieStore.set({
      name: 'T-REX420-checkoutUrl',
      value: cart.checkoutUrl,
      expires: d.getTime() + (30 * 60 * 1000),
      maxAge: 6000,
      path: '/'
    })

    return;
  } else {
    const data = await addToCart(lines);

    cartId = data.cartCreate.cart.id;

    const { cart } = await getCheckoutUrl(cartId)

    cookieStore.set({
      name: 'T-REX420-cartId',
      value: cartId,
      expires: d.getTime() + (30 * 60 * 1000),
      maxAge: 6000,
      path: '/'
    })

    cookieStore.set({
      name: 'T-REX420-checkoutUrl',
      value: cart.checkoutUrl,
      expires: d.getTime() + (30 * 60 * 1000),
      maxAge: 6000,
      path: '/'
    })
  }
}