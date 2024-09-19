import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductsCart extends Schema.Component {
  collectionName: 'components_products_carts';
  info: {
    displayName: 'Cart';
    icon: 'shoppingCart';
  };
  attributes: {
    products: Attribute.Relation<
      'products.cart',
      'oneToMany',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'products.cart': ProductsCart;
    }
  }
}
