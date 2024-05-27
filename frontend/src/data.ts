import { title } from 'process';
import { Tag } from './app/shared/models/Tag';
import {Food} from './app/shared/models/food';

export const sample_foods: any[] = [

  {
      id:'1',
      name: 'Pizza Pepperoni',
      cookTime: '10-20',
      price: 10,
      favorite: false,
      origins: ['italy'],
      stars: 4.5,
      imageUrl: 'assets/food-1.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
      id:'2',
      name: 'Meatball',
      price: 20,
      cookTime: '20-30',
      favorite: true,
      origins: ['persia', 'middle east', 'china'],
      stars: 4.7,
      imageUrl: 'assets/food-2.jpg',
      tags: ['SlowFood', 'Lunch'],
  },
  {
      id:'3',
      name: 'Hamburger',
      price: 5,
      cookTime: '10-15',
      favorite: false,
      origins: ['germany', 'us'],
      stars: 3.5,
      imageUrl: 'assets/food-3.jpg',
      tags: ['FastFood', 'Hamburger'],
  },
  {
      id:'4',
      name: 'Fried Potatoes',
      price: 2,
      cookTime: '15-20',
      favorite: true,
      origins: ['belgium', 'france'],
      stars: 3.3,
      imageUrl: 'assets/food-4.jpg',
      tags: ['FastFood', 'Fry'],
  },
  {
      id:'5',
      name: 'Chicken Soup',
      price: 11,
      cookTime: '40-50',
      favorite: false,
      origins: ['india', 'asia'],
      stars: 3.0,
      imageUrl: 'assets/food-5.jpg',
      tags: ['SlowFood', 'Soup'],
  },
  {
      id:'6',
      name: 'Vegetables Pizza',
      price: 9,
      cookTime: '40-50',
      favorite: false,
      origins: ['italy'],
      stars: 4.0,
      imageUrl: 'assets/food-6.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
      id:'7',
      name: 'Vegetables Pizza',
      price: 9,
      cookTime: '40-50',
      favorite: false,
      origins: ['italy'],
      stars: 4.0,
      imageUrl: 'assets/food-7.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
      id:'8',
      name: 'Vegetables Pizza',
      price: 9,
      cookTime: '40-50',
      favorite: false,
      origins: ['italy'],
      stars: 4.0,
      imageUrl: 'assets/food-8.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
      id:'9',
      name: 'Vegetables Pizza',
      price: 9,
      cookTime: '40-50',
      favorite: false,
      origins: ['italy'],
      stars: 4.0,
      imageUrl: 'assets/food-9.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
    id:'9',
    name: 'Vegetables Pizza',
    price: 9,
    cookTime: '40-50',
    favorite: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/food-10.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
]

// export key refers to the accessibility from outside
export const sample_tags: Tag[] = [
    {name: 'All', count: 6},
    {name: 'FastFood', count: 4},
    {name: 'Pizza', count: 2},
    {name: 'Lunch', count: 3},
    {name: 'SlowFood', count: 2},
    {name: 'Hamburger', count: 1},
    {name: 'Fry', count: 1},
    {name: 'Soup', count: 1},
]


//export footer element
export const footer_elements: any[] = [
    {
        title: 'About US',
        footer_list: ['Company', 'Contact', 'Careers', 'Affiliates', 'Store']
    },
    {
        title: 'Useful Links',
        footer_list: ['Support', 'Refund', 'FAQ', 'Feedback', 'Stories']
    },
    {
        title: 'Menu',
        footer_list: ['FastFood', 'Pizza', 'Lunch', 'SlowFood', 'Hamburger']
    }
]

export interface Card {
    title: string;
    description: string;
    url: string;
}

export const cards: Card[] = [
    {
      title: 'Computer',
      description: 'Description about computer...',
        url: 'assets/food-1.jpg',
    },
    {
      title: 'Building',
      description: 'Building description...',
      url: 'assets/food-2.jpg',
    }, {
      title: 'Glass over a computer',
      description: 'Description of a glass over a computer',
      url: 'assets/food-3.jpg',
    }, {
      title: 'Autumn',
      description: 'Description about autumn leaves',
      url: 'assets/food-5.jpg',
    }, {
      title: 'Balloon',
      description: 'Coloured balloon',
      url: 'assets/food-6.jpg',
    },
];

export const features: Card[] = [
    {
      title: 'Delivery time',
      description: 'Fast and reliable delivery under 10 minutes',
        url: './assets/courier.png',
    },
    {
      title: 'Cash on Delivery',
      description: 'Pay conveniently upon delivery',
      url: './assets/cash-on-delivery.png',
    }, {
      title: 'Gift Cards',
      description: 'Perfect gifts for every occasion',
      url: './assets/gift-card.png',
    }, {
      title: 'Contact Us!',
      description: 'Keep in touch via email and support system.',
      url: './assets/send.png',
    }
];
