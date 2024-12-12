import Client from 'shopify-buy';
import fetch from 'isomorphic-fetch'; // Add this import

// Polyfill for fetch if not available
if (!global.fetch) {
  global.fetch = fetch;
}

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

const ShopifyCheckout = async (cartItems) => {
    try {
      // Verbose logging
      console.group('Shopify Checkout Initialization');
      console.log('Environment Variables:', {
        domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
        tokenPresence: !!process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
      });
  
      // Validate configuration before API call
      if (!process.env.REACT_APP_SHOPIFY_DOMAIN || 
          !process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        throw new Error('Incomplete Shopify Configuration');
      }
  
      const lineItems = cartItems.map(item => ({
        variantId: `gid://shopify/ProductVariant/${item.variantId}`,
        quantity: item.quantity
      }));
  
      console.log('Line Items:', lineItems);
      console.groupEnd();
  
      try {
        const checkout = await client.checkout.create({ 
          lineItems,
          customAttributes: [{ key: 'source', value: 'web-checkout' }]
        });
        
        console.log('Checkout Creation Success:', {
          webUrl: checkout.webUrl,
          checkoutId: checkout.id
        });
        
        return {
          url: checkout.webUrl,
          id: checkout.id
        };
      } catch (checkoutError) {
        console.error('Detailed Shopify Checkout Error', {
          name: checkoutError.name,
          message: checkoutError.message,
          code: checkoutError.code,
          stack: checkoutError.stack
        });
  
        // More specific error handling
        if (checkoutError.message.includes('access token')) {
          throw new Error('Invalid Shopify Storefront Access Token');
        }
  
        throw new Error(`Checkout creation failed: ${checkoutError.message}`);
      }
    } catch (error) {
      console.error('Comprehensive Checkout Process Error', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  };

export default ShopifyCheckout;