import type { ShopifyProduct } from "./shopify/types";
import type { Locale } from "./types";

import type {
  SanityModule,
  SanityAndShopifyProductsModule,
} from "./sanity/types";
import { getShopifyLocale, reshapeProducts, shopifyClient } from "./shopify";
import { SHOPIFY_GET_PRODUCTS_BY_IDS_QUERY } from "./shopify/queries";

const swapSanityProductsWithShopifysInModules = async (
  modules: SanityModule[],
  locale: Locale
) => {
  const productsListModules: {
    i: number;
    module: SanityAndShopifyProductsModule;
  }[] = [];

  modules.forEach((module, i) => {
    if (module._type === "module.products") {
      productsListModules.push({ i, module });
    }
  });

  if (productsListModules.length) {
    for (const productsList of productsListModules) {
      // eslint-disable-next-line no-await-in-loop
      const { nodes } = await shopifyClient.request<
        { nodes: ShopifyProduct[] },
        {
          ids: string[];
          locale: string;
        }
      >(SHOPIFY_GET_PRODUCTS_BY_IDS_QUERY, {
        ids: productsList.module.products
          .filter(
            product => (product as unknown as { shopifyId: string }).shopifyId
          )
          .map(
            product => (product as unknown as { shopifyId: string }).shopifyId
          ),
        locale: getShopifyLocale(locale),
      });

      productsList.module.products = reshapeProducts(nodes.filter(Boolean));
    }

    productsListModules.forEach(productsListModule => {
      modules[productsListModule.i] = productsListModule.module;
    });
  }

  return modules;
};

export { swapSanityProductsWithShopifysInModules };
