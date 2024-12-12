import axios from 'axios';

const fetchShopifyProducts = async () => {
  const url = 'https://ecommerce92.myshopify.com/api/2023-01/graphql.json'; // Replace with your store's domain
  const token = 'b5261c158bb5fd544104bebe607c0ec3'; // Replace with your token

  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      url,
      { query },
      { headers: { 'X-Shopify-Storefront-Access-Token': token, 'Content-Type': 'application/json' } }
    );

    return response.data.data.products.edges;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default fetchShopifyProducts;
