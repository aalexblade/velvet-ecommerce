import { Product } from '../model/types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Мереживний бюстгальтер Balconette з формованою чашкою',
    slug: 'lace-bra-balconette',
    description: 'Мереживний бюстгальтер Balconette з формованою чашкою, який забезпечує ідеальну підтримку.',
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      { id: 'v1_1', product_id: '1', sku: 'BALC-LACE-BLK-75B', color: 'Black', size: '75B', price: 1250, old_price: 1560, stock: 5 },
      { id: 'v1_2', product_id: '1', sku: 'BALC-LACE-WHT-75C', color: 'White', size: '75C', price: 1250, old_price: 1560, stock: 3 },
      { id: 'v1_3', product_id: '1', sku: 'BALC-LACE-RBY-80B', color: 'Ruby', size: '80B', price: 1250, old_price: 1560, stock: 4 }
    ],
    images: [
      { id: 1, product_id: '1', variant_id: null, url: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+1', is_main: true, sort_order: 1 }
    ]
  },
  {
    id: '2',
    title: 'Класичний гладкий бюстгальтер Push-up для глибокого декольте',
    slug: 'classic-bra-push-up',
    description: 'Класичний гладкий бюстгальтер Push-up для витонченого силуету та глибокого декольте.',
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      { id: 'v2_1', product_id: '2', sku: 'PUSH-CLASS-PCH-70B', color: 'Peach', size: '70B', price: 980, old_price: null, stock: 12 },
      { id: 'v2_2', product_id: '2', sku: 'PUSH-CLASS-EMR-75B', color: 'Emerald', size: '75B', price: 980, old_price: null, stock: 8 },
      { id: 'v2_3', product_id: '2', sku: 'PUSH-CLASS-DNM-80C', color: 'Denim Blue', size: '80C', price: 980, old_price: null, stock: 2 }
    ],
    images: [
      { id: 2, product_id: '2', variant_id: null, url: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+2', is_main: true, sort_order: 1 }
    ]
  },
  {
    id: '3',
    title: 'Шовковий бралет без кісточок Velvet Dream',
    slug: 'silk-bralette-velvet-dream',
    description: 'Ніжний шовковий бралет Velvet Dream без металевих елементів для абсолютного комфорту.',
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      { id: 'v3_1', product_id: '3', sku: 'BRAL-SILK-BLK-75A', color: 'Black', size: '75A', price: 1450, old_price: null, stock: 6 },
      { id: 'v3_2', product_id: '3', sku: 'BRAL-SILK-SMW-75B', color: 'Smoky White', size: '75B', price: 1450, old_price: null, stock: 7 }
    ],
    images: [
      { id: 3, product_id: '3', variant_id: null, url: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+3', is_main: true, sort_order: 1 }
    ]
  },
  {
    id: '4',
    title: 'Бюстгальтер з м\'якою чашкою на кісточках Gentle Support',
    slug: 'soft-cup-bra-gentle-support',
    description: 'Бюстгальтер з м\'якою еластичною чашкою на кісточках для природної та надійної підтримки.',
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      { id: 'v4_1', product_id: '4', sku: 'SOFT-GENT-WHT-75C', color: 'White', size: '75C', price: 1100, old_price: 1380, stock: 4 },
      { id: 'v4_2', product_id: '4', sku: 'SOFT-GENT-CTC-80B', color: 'Cotton Candy', size: '80B', price: 1100, old_price: 1380, stock: 3 }
    ],
    images: [
      { id: 4, product_id: '4', variant_id: null, url: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+4', is_main: true, sort_order: 1 }
    ]
  }
];

export async function getProducts(slug: string[]): Promise<Product[]> {
  console.log('Fetching server-side products for slug:', slug);
  return Promise.resolve(MOCK_PRODUCTS);
}