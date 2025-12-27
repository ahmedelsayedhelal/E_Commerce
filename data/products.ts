export type Product = {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name_en: "Basic Tee",
    name_ar: "تي شيرت أساسي",
    description_en: "Soft cotton tee.",
    description_ar: "تي شيرت قطني ناعم.",
    price: 19.99,
    category: "apparel",
    image: "/images/6613cb75a323b407bd014d6e-kaoayi-kids-clothing-for-boy-spring.jpg",
    inStock: true
  },
  {
    id: "2",
    name_en: "Running Shoes",
    name_ar: "حذاء جري",
    description_en: "Comfortable running shoes.",
    description_ar: "حذاء جري مريح.",
    price: 89.99,
    category: "apparel",
    image: "/images/FOO-ACTIVN-PORT20258945--BLK-WHIT_1.webp",
    inStock: true
  },
    {
    id: "3",
    name_en: "Gold Necklace",
    name_ar: "سلسله ذهبية",
    description_en: "Comfortable running shoes.",
    description_ar: "حذاء جري مريح.",
    price: 89.99,
    category: "accessories",
    image: "/images/photo-1606760227091-3dd870d97f1d.jpg",
    inStock: true
  },
  {
    id: "4",
    name_en: "Running Shoes",
    name_ar: "حذاء جري",
    description_en: "Comfortable running shoes.",
    description_ar: "حذاء جري مريح.",
    price: 99.99,
    category: "apparel",
    image: "/images/FOO-ACTIVN-PORT20258945--BLK-WHIT_1.webp",
    inStock: true
  },
   {
    id: "5",
    name_en: "Ring",
    name_ar: "خاتم",
    description_en: "Comfortable running shoes.",
    description_ar: "حذاء جري مريح.",
    price: 79.99,
    category: "accessories",
    image: "/images/shopping.webp",
    inStock: true
  },
 
   {
    id: "6",
    name_en: "Mobile Phone",
    name_ar: "هاتف محمول",
    description_en: "Comfortable running shoes.",
    description_ar: "حذاء جري مريح.",
    price: 89.99,
    category: "electronics",
    image: "/images/representation-user-experience-interface-design.jpg",
    inStock: true
  },
   {
    id: "7",
    name_en: "laptop",
    name_ar: "لابتوب",
    description_en: "Comfortable running shoes.",
    description_ar: "حذاء جري مريح.",
    price: 89.99,
    category: "electronics",
    image: "/images/technology-hologram-indoors.jpg",
    inStock: true
  }
];
