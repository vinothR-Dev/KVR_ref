"use client";

import React, { useState } from "react";

// --- Types ---
interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  category: string;
}

interface Category {
  name: string;
  image: string;
}

// --- Data matching Reference Image ---
const CATEGORIES: Category[] = [
  { name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop" },
  { name: "Kurtis", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=300&auto=format&fit=crop" },
  { name: "Churidar", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=300&auto=format&fit=crop" },
  { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300&auto=format&fit=crop" },
  { name: "Party Wear", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=300&auto=format&fit=crop" },
  { name: "Wedding Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop" },
  { name: "Cotton Sarees", image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=300&auto=format&fit=crop" },
  { name: "Designer Sarees", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=300&auto=format&fit=crop" },
  { name: "New Arrivals", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=300&auto=format&fit=crop" },
  { name: "Offers", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop" },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Kanjivaram Silk Saree",
    subtitle: "with Zari Weaving",
    price: 3999,
    originalPrice: 4999,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    category: "Sarees",
  },
  {
    id: 2,
    title: "Soft Silk Saree",
    subtitle: "Elegant Weaving",
    price: 2499,
    originalPrice: 3499,
    discount: "29% OFF",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop",
    category: "Sarees",
  },
  {
    id: 3,
    title: "Embroidered Kurti",
    subtitle: "Beige | M",
    price: 1299,
    originalPrice: 1799,
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    category: "Kurtis",
  },
  {
    id: 4,
    title: "Cotton Silk Saree",
    subtitle: "Traditional Wear",
    price: 1999,
    originalPrice: 2499,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop",
    category: "Sarees",
  },
  {
    id: 5,
    title: "Designer Churidar Set",
    subtitle: "Premium Fabric",
    price: 2299,
    originalPrice: 3299,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
    category: "Churidar",
  },
  {
    id: 6,
    title: "Party Wear Dress",
    subtitle: "Embellished Work",
    price: 2999,
    originalPrice: 4299,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    category: "Dresses",
  },
];

export default function HomePage() {
  // State management
  const [bagCount, setBagCount] = useState<number>(3);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
      showToast("Item removed from Wishlist");
    } else {
      setWishlist([...wishlist, id]);
      showToast("Added to Wishlist ❤️");
    }
  };

  const handleAddToBag = (title: string) => {
    setBagCount((prev) => prev + 1);
    showToast(`"${title}" added to My Bag! 🛍️`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Thank you for subscribing to KVR Elegance!");
    setNewsletterEmail("");
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1C1C]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#123E30] text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-[#C6A868] animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6DFC6] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#123E30] hover:text-[#9A7228] transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Logo */}
              <a href="#" className="flex flex-col items-start leading-none group">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#85581A] group-hover:text-[#123E30] transition-colors">
                  KVR
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.35em] text-[#A38655] uppercase mt-0.5">
                  E L E G A N C E
                </span>
              </a>
            </div>

            {/* Center: Main Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-[#333333]">
              {["Sarees", "Kurtis", "Churidar", "Dresses", "New Arrivals", "Offers"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveCategory(item === "New Arrivals" || item === "Offers" ? "All" : item);
                    showToast(`Filtering by ${item}`);
                  }}
                  className={`hover:text-[#9A7228] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#9A7228] hover:after:w-full after:transition-all ${
                    activeCategory === item ? "text-[#85581A] font-semibold after:w-full" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Right: Search Bar & User Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search Box */}
              <div className="relative hidden md:flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for sarees, kurtis, dresses..."
                  className="w-56 lg:w-72 pl-4 pr-10 py-2 text-xs bg-[#FAF7F2] border border-[#D9D0C1] rounded-full focus:outline-none focus:border-[#9A7228] focus:ring-1 focus:ring-[#9A7228] text-gray-800 placeholder-gray-400 transition-all"
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#123E30] text-white p-1.5 rounded-full hover:bg-[#9A7228] transition-colors"
                  aria-label="Search button"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => showToast(`Wishlist contains ${wishlist.length} item(s)`)}
                className="flex flex-col items-center text-gray-700 hover:text-[#9A7228] transition-colors relative"
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#9A7228] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-0.5 hidden sm:block">Wishlist</span>
              </button>

              {/* Account Button */}
              <button
                onClick={() => showToast("Account portal loading...")}
                className="flex flex-col items-center text-gray-700 hover:text-[#9A7228] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[10px] font-medium mt-0.5 hidden sm:block">Account</span>
              </button>

              {/* My Bag Button */}
              <button
                onClick={() => showToast(`Your bag contains ${bagCount} items.`)}
                className="flex flex-col items-center text-gray-700 hover:text-[#9A7228] transition-colors relative"
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-1.5 -right-2 bg-[#123E30] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                    {bagCount}
                  </span>
                </div>
                <span className="text-[10px] font-medium mt-0.5 hidden sm:block">My Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for sarees, kurtis, dresses..."
              className="w-full pl-4 pr-10 py-2 text-xs bg-[#FAF7F2] border border-[#D9D0C1] rounded-full focus:outline-none focus:border-[#9A7228] text-gray-800"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#123E30] text-white p-1.5 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E6DFC6] bg-white px-4 py-4 space-y-3 font-medium text-sm">
            {["Sarees", "Kurtis", "Churidar", "Dresses", "New Arrivals", "Offers"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveCategory(item === "New Arrivals" || item === "Offers" ? "All" : item);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-800 hover:text-[#9A7228]"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO BANNER SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#0F2D24] min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
          
          {/* Background Image Carousel */}
          <div className="absolute inset-0 z-0">
            <img
              src={
                activeSlide === 0
                  ? "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1600&auto=format&fit=crop"
                  : activeSlide === 1
                  ? "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1600&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop"
              }
              alt="KVR Elegance Hero Model"
              className="w-full h-full object-cover object-[center_top] sm:object-[70%_20%] opacity-95 transition-all duration-700 scale-100 hover:scale-105"
            />
            {/* Soft Ambient Light Overlay on Left Side for Crisp Readable Text */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/80 to-transparent w-full sm:w-3/4 lg:w-7/12"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-xl">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#85581A] uppercase mb-2">
              T R A D I T I O N &nbsp; M E E T S
            </p>

            <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold text-[#14382C] leading-tight mb-3">
              {activeSlide === 0
                ? "Timeless Elegance"
                : activeSlide === 1
                ? "Festive Royalty"
                : "Heritage Couture"}
            </h1>

            <p className="text-xs sm:text-base text-gray-700 font-medium mb-6 leading-relaxed max-w-md">
              Premium Sarees &amp; Dresses for Every Occasion
            </p>

            {/* Shop Now CTA Button */}
            <button
              onClick={() => showToast("Opening Exclusive Collection...")}
              className="inline-flex items-center gap-3 bg-[#123E30] hover:bg-[#85581A] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-xl hover:translate-x-1"
            >
              <span>SHOP NOW</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Feature Badges Pill Row */}
            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs font-medium text-[#2C4A3E]">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#D9CEB8] shadow-sm">
                <svg className="w-3.5 h-3.5 text-[#85581A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Premium Quality</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#D9CEB8] shadow-sm">
                <svg className="w-3.5 h-3.5 text-[#85581A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Authentic Designs</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#D9CEB8] shadow-sm">
                <svg className="w-3.5 h-3.5 text-[#85581A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Trusted by 10,000+ Customers</span>
              </div>
            </div>
          </div>

          {/* Right Floating Ornate Message Box */}
          <div className="hidden lg:block absolute right-12 top-12 z-10 text-center bg-black/30 backdrop-blur-md border border-[#E7C678]/60 p-6 rounded-2xl max-w-xs text-white shadow-xl">
            <div className="w-6 h-0.5 bg-[#E7C678] mx-auto mb-3"></div>
            <p className="font-serif-title italic text-xl text-[#FFF3D6] font-normal leading-relaxed">
              &quot;Crafted for Your Special Moments&quot;
            </p>
            <div className="w-6 h-0.5 bg-[#E7C678] mx-auto mt-3"></div>
          </div>

          {/* Slider Controls (Bottom Right) */}
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1))}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all hover:scale-105"
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1))}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all hover:scale-105"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CIRCULAR BADGES BAR */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4 sm:gap-6 py-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setActiveCategory(cat.name === "Offers" || cat.name === "New Arrivals" ? "All" : cat.name);
                showToast(`Viewing ${cat.name}`);
              }}
              className="flex flex-col items-center group shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#C6A868] via-[#F4E3B8] to-[#85581A] shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full p-0.5 bg-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-gray-800 mt-2 group-hover:text-[#85581A] transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FESTIVE COLLECTION PROMO BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative rounded-2xl overflow-hidden bg-[#0C2D23] border border-[#C6A868]/40 shadow-xl p-6 sm:p-8 text-white">
          {/* Decorative Background Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#C6A868]/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#C6A868]/20 via-transparent to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-3 z-10">
              <div className="flex items-center gap-2 text-[#E7C678] text-xs font-semibold tracking-widest uppercase">
                <span className="text-base">❖</span>
                <span>Festive Collection</span>
              </div>

              <h2 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                UP TO <span className="text-[#E7C678]">50% OFF</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 font-light">
                Celebrate Tradition with Exclusive Offers
              </p>
            </div>

            {/* Center Model */}
            <div className="lg:col-span-3 flex justify-center z-10">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-[#E7C678]/60 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
                  alt="Festive Model"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Right 3 Offer Cards */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 z-10">
              <div
                onClick={() => showToast("Exploring Sarees 40% OFF")}
                className="cursor-pointer bg-[#143B2F]/90 hover:bg-[#1A4B3C] border border-[#C6A868]/30 rounded-xl p-3 flex items-center justify-between transition-all hover:translate-x-1"
              >
                <div>
                  <h3 className="text-xs font-semibold text-white">Sarees</h3>
                  <p className="text-[11px] font-bold text-[#E7C678] mt-0.5">FLAT 40% OFF</p>
                  <span className="text-[10px] text-gray-300 underline mt-1 inline-block">Shop Now →</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=200&auto=format&fit=crop"
                  alt="Saree promo"
                  className="w-12 h-14 object-cover rounded-lg border border-[#C6A868]/40"
                />
              </div>

              <div
                onClick={() => showToast("Exploring Kurtis 30% OFF")}
                className="cursor-pointer bg-[#143B2F]/90 hover:bg-[#1A4B3C] border border-[#C6A868]/30 rounded-xl p-3 flex items-center justify-between transition-all hover:translate-x-1"
              >
                <div>
                  <h3 className="text-xs font-semibold text-white">Kurtis</h3>
                  <p className="text-[11px] font-bold text-[#E7C678] mt-0.5">FLAT 30% OFF</p>
                  <span className="text-[10px] text-gray-300 underline mt-1 inline-block">Shop Now →</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200&auto=format&fit=crop"
                  alt="Kurti promo"
                  className="w-12 h-14 object-cover rounded-lg border border-[#C6A868]/40"
                />
              </div>

              <div
                onClick={() => showToast("Exploring Dresses 40% OFF")}
                className="cursor-pointer bg-[#143B2F]/90 hover:bg-[#1A4B3C] border border-[#C6A868]/30 rounded-xl p-3 flex items-center justify-between transition-all hover:translate-x-1"
              >
                <div>
                  <h3 className="text-xs font-semibold text-white">Dresses</h3>
                  <p className="text-[11px] font-bold text-[#E7C678] mt-0.5">FLAT 40% OFF</p>
                  <span className="text-[10px] text-gray-300 underline mt-1 inline-block">Shop Now →</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop"
                  alt="Dress promo"
                  className="w-12 h-14 object-cover rounded-lg border border-[#C6A868]/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS PRODUCT GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-[#E6DFC6] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#85581A] text-lg">🌸</span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14382C]">
                New Arrivals
              </h2>
            </div>
            <p className="text-xs text-gray-600 mt-1">Fresh Styles for Your Wardrobe</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveCategory("All");
                showToast("Showing all new arrivals");
              }}
              className="text-xs font-semibold text-[#85581A] hover:text-[#123E30] transition-colors"
            >
              View All &rarr;
            </button>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => showToast("Previous arrivals page")}
                className="w-7 h-7 rounded-full border border-[#D9CEB8] bg-white flex items-center justify-center text-gray-600 hover:border-[#85581A]"
                aria-label="Previous products"
              >
                &lt;
              </button>
              <button
                onClick={() => showToast("Next arrivals page")}
                className="w-7 h-7 rounded-full border border-[#D9CEB8] bg-white flex items-center justify-center text-gray-600 hover:border-[#85581A]"
                aria-label="Next products"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E8E2D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 shadow-md transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <svg
                      className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "fill-none"}`}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 bg-[#FFF0F3] text-[#D81B60] text-[10px] font-bold px-2 py-0.5 rounded border border-[#F8BBD0]">
                    {product.discount}
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#85581A] transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{product.subtitle}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-[#A81C1C]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToBag(product.title)}
                      className="bg-[#123E30] hover:bg-[#85581A] text-white p-1.5 rounded-lg text-[10px] transition-colors"
                      title="Add to Bag"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST / VALUE PROPOSITION BAR */}
      <section className="w-full bg-[#FAF4EB] border-y border-[#E6DFC6] py-6 my-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            
            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#85581A] mb-2 border border-[#E6DFC6]">
                🚚
              </div>
              <h4 className="text-xs font-bold text-gray-900">Free Shipping</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">on orders above ₹999</p>
            </div>

            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#85581A] mb-2 border border-[#E6DFC6]">
                🔄
              </div>
              <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">within 7 days</p>
            </div>

            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#85581A] mb-2 border border-[#E6DFC6]">
                🔒
              </div>
              <h4 className="text-xs font-bold text-gray-900">Secure Payments</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">100% safe and secure</p>
            </div>

            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#85581A] mb-2 border border-[#E6DFC6]">
                💵
              </div>
              <h4 className="text-xs font-bold text-gray-900">Cash on Delivery</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Available in select locations</p>
            </div>

            <div className="flex flex-col items-center p-2 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#85581A] mb-2 border border-[#E6DFC6]">
                🎧
              </div>
              <h4 className="text-xs font-bold text-gray-900">24/7 Support</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">We&apos;re here to help</p>
            </div>

          </div>
        </div>
      </section>

      {/* RICH ROYAL FOOTER */}
      <footer className="bg-[#07221A] text-white pt-12 pb-8 border-t-2 border-[#C6A868] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#1A4537]">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#C6A868]/20 border border-[#C6A868] flex items-center justify-center font-cinzel font-bold text-[#E7C678]">
                  KVR
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#E7C678] leading-tight">
                    KVR ELEGANCE
                  </h3>
                  <p className="text-[8px] tracking-widest text-gray-300 uppercase">TRADITION • QUALITY • ELEGANCE</p>
                </div>
              </div>

              <p className="font-serif-title text-[#E7C678] text-sm italic">
                Elegance in Every Detail
              </p>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Premium Sarees &amp; Dresses for Modern Women
              </p>

              <div className="flex items-center gap-3 pt-2">
                {["Instagram", "Facebook", "YouTube", "Pinterest"].map((soc) => (
                  <button
                    key={soc}
                    onClick={() => showToast(`Opening KVR ${soc}`)}
                    className="w-8 h-8 rounded-full border border-[#C6A868]/40 hover:border-[#E7C678] flex items-center justify-center text-xs text-gray-300 hover:text-[#E7C678] transition-colors"
                    aria-label={soc}
                  >
                    {soc[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wider text-[#E7C678] uppercase mb-4">Shop</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {["Sarees", "Kurtis", "Churidar", "Dresses", "New Arrivals", "Offers"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => showToast(`Navigating to ${link}`)}
                      className="hover:text-[#E7C678] transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wider text-[#E7C678] uppercase mb-4">Customer Care</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {[
                  "Track Order",
                  "Returns & Exchange",
                  "Shipping Policy",
                  "Size Guide",
                  "FAQs",
                  "Contact Us",
                ].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => showToast(`Opening ${link}`)}
                      className="hover:text-[#E7C678] transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wider text-[#E7C678] uppercase mb-4">About</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {[
                  "Our Story",
                  "Quality Promise",
                  "Blog",
                  "Careers",
                  "Terms & Conditions",
                  "Privacy Policy",
                ].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => showToast(`Opening ${link}`)}
                      className="hover:text-[#E7C678] transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-wider text-[#E7C678] uppercase">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Get exclusive offers, new arrivals and style tips.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 text-xs bg-white text-gray-800 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#C6A868]"
                />
                <button
                  type="submit"
                  className="bg-[#123E30] hover:bg-[#85581A] border border-[#C6A868] text-white px-3 py-2 rounded-r-lg text-xs transition-colors"
                  aria-label="Subscribe"
                >
                  &rarr;
                </button>
              </form>
            </div>

          </div>

          <div className="pt-6 text-center text-[11px] text-gray-400">
            &copy; {new Date().getFullYear()} KVR ELEGANCE. All rights reserved. Designed with tradition &amp; luxury.
          </div>

        </div>
      </footer>
    </div>
  );
}
