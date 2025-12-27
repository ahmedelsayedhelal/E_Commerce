"use client";

import { useRouter } from "next/navigation";
import { useShopStore } from "@/store/useShopStore";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  productId: string;
  locale: string;
};

export function WishlistButton({ productId, locale }: Props) {
  const wishlist = useShopStore((s) => s.wishlist);
  const user = useAuthStore((s) => s.user );
  const router = useRouter();
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);

  const saved = wishlist.includes(productId);

  return (
    <button
  
      onClick={user ? () => toggleWishlist(productId) : () => router.push(`/signup`)}
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
