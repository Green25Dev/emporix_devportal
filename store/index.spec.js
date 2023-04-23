import { transfromCategories } from '~/store/index'

describe(('store'), () => {
  test('should transform categories correctly', () => {
    // given
    const articles = [
      {
        slug: 'checkout',
        title: 'Get started with Emporix Backoffice',
        category: 'Quick start',
        position: 0,
        parent: 'storefront',
        dir: '/quick-start/storefront',
        path: '/quick-start/storefront/checkout',
        extension: '.md'
      },
      {
        slug: 'logging-in',
        title: 'Get started with Emporix Backoffice',
        category: 'Quick start',
        position: 0,
        parent: 'backoffice',
        dir: '/quick-start/backoffice',
        path: '/quick-start/backoffice/logging-in',
        extension: '.md'
      },
      {
        slug: 'emporix',
        title: 'Emporix',
        category: 'Getting started',
        position: 1,
        catPosition: 1,
        dir: '/',
        path: '/emporix',
        extension: '.md'
      },
      {
        slug: 'Adding-a-product-to-the-cart',
        title: 'Adding a product to the cart',
        category: 'Quick start',
        position: 1,
        catPosition: 0,
        dir: '/quick-start',
        path: '/quick-start/Adding-a-product-to-the-cart',
        extension: '.md'
      },
      {
        slug: 'categories',
        title: 'Categories',
        category: 'Quick start',
        position: 1,
        parent: 'storefront',
        dir: '/quick-start/storefront',
        path: '/quick-start/storefront/categories',
        extension: '.md'
      },
      {
        slug: 'orders',
        title: 'Orders module',
        category: 'Quick start',
        position: 1,
        parent: 'backoffice',
        dir: '/quick-start/backoffice',
        path: '/quick-start/backoffice/orders',
        extension: '.md'
      },
      {
        slug: 'Adding-a-product-to-the-category',
        title: 'Adding a product to the category',
        category: 'Quick start',
        position: 2,
        dir: '/quick-start',
        path: '/quick-start/Assigning-a-product-to-a-category',
        extension: '.md'
      },
      {
        slug: 'Creating-a-customer',
        title: 'Creating a customer',
        category: 'Quick start',
        position: 3,
        dir: '/quick-start',
        path: '/quick-start/Creating-a-customer',
        extension: '.md'
      }
    ]

    // when
    const transformedCategories = transfromCategories(articles)
    // then

    expect(transformedCategories).toHaveLength(2)
    expect(transformedCategories[0].categoryName).toEqual('Quick start')
    expect(transformedCategories[0].children).toHaveLength(5)
    expect(transformedCategories[1].categoryName).toEqual('Getting started')
  })
})
