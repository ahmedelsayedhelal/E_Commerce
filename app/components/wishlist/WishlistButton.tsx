"use client";


import { useShopStore } from "@/store/useShopStore";


type Props = {
  productId: string;
  locale: string;
};

export function WishlistButton({ productId, locale }: Props) {
  const wishlist = useShopStore((s) => s.wishlist);
 
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);

  const saved = wishlist.includes(productId);

  return (
    <button
  
      onClick={() => toggleWishlist(productId) }
      className={`rounded-md border px-4 py-3 transition ${
        saved
          ? "border-red-500 text-red-500 hover:bg-red-50"
          : "hover:bg-muted"
      }`}
    >
      {saved
        ? locale === "ar"
          ? "في المفضلة ♥"
          : "In Wishlist ♥"
        : locale === "ar"
        ? "أضف للمفضلة"
        : "Add to Wishlist"}
    </button>
  );
}
