export type Category = {
  slug: string;
  name_en: string;
  name_ar: string;
};




export const categories : Category[] = [
  { slug: "apparel", name_en: "Apparel", name_ar: "ملابس" },
  { slug: "electronics", name_en: "Electronics", name_ar: "إلكترونيات" },
  { slug: "accessories", name_en: "Accessories", name_ar: "إكسسوارات" }
];
