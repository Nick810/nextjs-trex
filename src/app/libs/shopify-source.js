
import { gql, GraphQLClient } from "graphql-request";

const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const endpoint = process.env.SHOPIFY_STORE_DOMAIN
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});


export async function getCollection(id) {
  const collectionQuery = gql`
    query MyQuery($id: ID!) {
      collection(id: $id) {
        title
        description
        products(first: 20) {
          nodes {
            title
            featuredImage {
              altText
              url
            }
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
            variants(first: 5) {
              nodes {
                availableForSale
                title
              }
            }
            metafields(identifiers: { key: "seeds_parent", namespace: "custom" }) {
              value
            }
          }
        }
        title
      }
    }
  `
  const variables = {
    id,
  };
  try {
    const data = await graphQLClient.request(collectionQuery, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProduct(id) {
  const productQuery = gql`
    query MyQuery($id: ID!) {
      product(id: $id) {
        title
        descriptionHtml
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
        variants(first: 10) {
          edges {
            node {
              availableForSale
              id
              image {
                altText
                url
              }
              price {
                amount
              }
              title
            }
          }
        }
        seo {
          description
          title
        }
      }
    }
  `
  const variables = {
    id,
  };
  try {
    const data = await graphQLClient.request(productQuery, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addToCart(lines) {
  const createCartMutation = gql`
  mutation cartCreate($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const variables = {
    cartInput: {
      lines: lines
    },
  };
  try {
    return await graphQLClient.request(createCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCart(cartId, lines) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: lines
  };
  try {
   return await graphQLClient.request(updateCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeItemInCart(cartId, lineId) {
  const removeLineQuery = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lineIds: [`${lineId}`]
  };
  try {
    return await graphQLClient.request(removeLineQuery, variables);
   } catch (error) {
     throw new Error(error);
   }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              cost {
                amountPerQuantity {
                  amount
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  image {
                    altText
                    url
                  }
                  title
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };
  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};

