const searchFilters = {
  sortOptions: [
    { title: 'Newest', name: 'default', current: false },
    { title: 'Best Rating', name: 'toprated', current: false },
    { title: 'Price: Low to High', name: 'lowest', current: false },
    { title: 'Price: High to Low', name: 'highest', current: false },
  ],

  prices: [
    {
      id: 'All',
      name: 'All',
      value: 'all',
    },
    {
      id: '1-50',
      name: '$1 to $50',
      value: '1-50',
    },
    {
      id: '51-200',
      name: '$51 to $200',
      value: '51-200',
    },
    {
      id: '201-1000',
      name: '$201 to $1000',
      value: '201-1000',
    },
  ],

  ratings: [1, 2, 3, 4, 5],
}

export default searchFilters
