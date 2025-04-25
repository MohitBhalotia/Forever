// In a real implementation, you would need to add all these image files to your assets folder
// For now, we'll use placeholder URLs for demonstration purposes

export const assets = {
  logo: 'https://i.imgur.com/NWlPhn3.png', // Using a URL instead of requiring a local file
  hero_img: 'https://i.imgur.com/JrYHD1q.png',
  cart_icon: 'https://i.imgur.com/8RKXAIV.png',
  bin_icon: 'https://i.imgur.com/5QKLYzP.png',
  dropdown_icon: 'https://i.imgur.com/KnZdIJ7.png',
  exchange_icon: 'https://i.imgur.com/XVDgUkA.png',
  profile_icon: 'https://i.imgur.com/NWlPhn3.png',
  quality_icon: 'https://i.imgur.com/XVDgUkA.png',
  search_icon: 'https://i.imgur.com/NWlPhn3.png',
  star_dull_icon: 'https://i.imgur.com/5QKLYzP.png',
  star_icon: 'https://i.imgur.com/KnZdIJ7.png',
  support_img: 'https://i.imgur.com/JrYHD1q.png',
  menu_icon: 'https://i.imgur.com/NWlPhn3.png',
  about_img: 'https://i.imgur.com/JrYHD1q.png',
  contact_img: 'https://i.imgur.com/JrYHD1q.png',
  razorpay_logo: 'https://i.imgur.com/NWlPhn3.png',
  stripe_logo: 'https://i.imgur.com/NWlPhn3.png',
  cross_icon: 'https://i.imgur.com/5QKLYzP.png',
};

// Sample product data (in a real app, this would come from the backend)
export const products = [
  {
    _id: "aaaaa",
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    image: ['https://i.imgur.com/JrYHD1q.png'],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716634345448,
    bestseller: true
  },
  {
    _id: "aaaab",
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    image: ['https://i.imgur.com/NWlPhn3.png', 'https://i.imgur.com/KnZdIJ7.png', 'https://i.imgur.com/5QKLYzP.png', 'https://i.imgur.com/XVDgUkA.png'],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716621345448,
    bestseller: true
  },
  {
    _id: "aaaac",
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    image: ['https://i.imgur.com/8RKXAIV.png'],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716234545448,
    bestseller: true
  },
  {
    _id: "aaaad",
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    image: ['https://i.imgur.com/JrYHD1q.png'],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: 1716621345448,
    bestseller: true
  },
  {
    _id: "aaaae",
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    image: ['https://i.imgur.com/NWlPhn3.png'],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716622345448,
    bestseller: true
  },
  {
    _id: "aaaaf",
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    image: ['https://i.imgur.com/KnZdIJ7.png'],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716623423448,
    bestseller: true
  }
];
