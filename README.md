

# 🛒 E-Commerce Mini Site (Next.js)

A modern multi-language e-commerce mini site built with **Next.js App Router**, focusing on **SEO, performance, accessibility**, and clean architecture.

---

# Tech Stack

* Framework: Next.js (App Router)
* Language: TypeScript
* Styling: Tailwind CSS
* State Management: Zustand (with persistence)
* Forms & Validation: React Hook Form + Zod
* Internationalization: next-intl (EN / AR with RTL support)
* SEO: Metadata API, Open Graph, Twitter Cards, JSON-LD


---

##  Features

###  Core Features

* Product listing & product details pages
* Cart & wishlist functionality
* Client-side state management
* Responsive UI (mobile-first)
* Dark / light theme support

### 🌐 Internationalization

* English & Arabic support
* RTL layout for Arabic
* Locale-based routing (`/en`, `/ar`)
* Translated metadata & content

### 🔍 SEO Optimizations

* Dynamic metadata per page
* Open Graph & Twitter Card meta tags
* JSON-LD structured data:

  * Product
  * BreadcrumbList
* Canonical & `hreflang` alternate links
* Sitemap & robots.txt

 Accessibility

* Skip navigation link
* Fully clickable product cards 
* Semantic HTML & proper alt texts

Performance

* Next.js Image optimization
* Lazy loading 
* Loading skeletons using `loading.tsx`



---

##  Testing

* Unit testing planned for cart logic (Zustand store)
* Testing framework: **Vitest**



---
# Lighthouse Scores

# Desktop
[Lighthouse Desktop](./docs/lighthouse/%20lighthouse-desktop.png)

### Mobile
[Lighthouse Mobile](./docs/lighthouse/lighthouse-mobile.png)

##  Architectural Decisions

* **App Router** used for better SEO and streaming support
* **Zustand** chosen for simplicity and performance
* **next-intl** for scalable i18n with proper routing
* **JSON-LD** added manually for full SEO control
* Client components used only when necessary




👤 Author

**Ahmed Elsayed**
Frontend Developer (Next.js / React)






