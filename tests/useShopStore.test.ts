import { describe, it, expect, beforeEach } from "vitest";
import { useShopStore } from "../store/useShopStore";
import type { Product } from "@/app/components/types/product";

const product: Product = {
  id: "1",
  name_en: "Test Product",
  name_ar: "منتج تجريبي",
  description_en: "Test description",
  description_ar: "وصف تجريبي",
  price: 100,
  category: "test",
  image: "/test.jpg",
  inStock: true,
};

describe("useShopStore - Cart Logic", () => {
  beforeEach(() => {
    useShopStore.getState().clearCart();
    useShopStore.getState().clearwishlist();
  });

  it("should add product to cart", () => {
    useShopStore.getState().addToCart(product);

    const cart = useShopStore.getState().cart;
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(product.id);
    expect(cart[0].quantity).toBe(1);
  });

  it("should increase quantity if product already exists", () => {
    useShopStore.getState().addToCart(product);
    useShopStore.getState().addToCart(product);

    const cart = useShopStore.getState().cart;
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });

  it("should update product quantity", () => {
    useShopStore.getState().addToCart(product);
    useShopStore.getState().updateQuantity(product.id, 5);

    const cart = useShopStore.getState().cart;
    expect(cart[0].quantity).toBe(5);
  });

  it("should not update quantity if less than 1", () => {
    useShopStore.getState().addToCart(product);
    useShopStore.getState().updateQuantity(product.id, 0);

    const cart = useShopStore.getState().cart;
    expect(cart[0].quantity).toBe(1);
  });

  it("should remove product from cart", () => {
    useShopStore.getState().addToCart(product);
    useShopStore.getState().removeFromCart(product.id);

    const cart = useShopStore.getState().cart;
    expect(cart.length).toBe(0);
  });

  it("should clear cart", () => {
    useShopStore.getState().addToCart(product);
    useShopStore.getState().clearCart();

    const cart = useShopStore.getState().cart;
    expect(cart.length).toBe(0);
  });
});

describe("useShopStore - Wishlist Logic", () => {
  beforeEach(() => {
    useShopStore.getState().clearwishlist();
  });

  it("should add product to wishlist", () => {
    useShopStore.getState().toggleWishlist(product.id);

    const wishlist = useShopStore.getState().wishlist;
    expect(wishlist).toContain(product.id);
  });

  it("should remove product from wishlist if already exists", () => {
    useShopStore.getState().toggleWishlist(product.id);
    useShopStore.getState().toggleWishlist(product.id);

    const wishlist = useShopStore.getState().wishlist;
    expect(wishlist.length).toBe(0);
  });

  it("should clear wishlist", () => {
    useShopStore.getState().toggleWishlist(product.id);
    useShopStore.getState().clearwishlist();

    const wishlist = useShopStore.getState().wishlist;
    expect(wishlist.length).toBe(0);
  });
});
