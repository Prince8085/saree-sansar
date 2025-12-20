"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { PromoVideo } from "@/components/promo-video"
import { CategoryCard } from "@/components/category-card"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Star, Shield, Truck, Headphones, Sparkles, Heart, BadgePercent, Camera } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

// Mock data for demonstration
const featuredCategories = [
  {
    name: "Wedding Sarees",
    image: "/luxurious-indian-bridal-wedding-saree-red-gold.jpg",
    href: "/products?category=bridal",
    description: "Exclusive bridal collection",
  },
  {
    name: "Kosa Silk Special",
    image: "/traditional-kosa-silk-saree-green-elegant.jpg",
    href: "/products?category=kosa",
    description: "Local artisan craftsmanship",
  },
  {
    name: "Ghagra Chunni",
    image: "/colorful-indian-ghagra-choli-lehenga.jpg",
    href: "/products?category=ghagra",
    description: "Perfect for celebrations",
  },
  {
    name: "Ready-to-Wear Kurtis",
    image: "/modern-indian-kurti-ethnic-wear.jpg",
    href: "/products?category=kurtis",
    description: "Contemporary comfort",
  },
]

const newArrivals = [
  {
    id: "1",
    name: "Royal Maroon Bridal Silk Saree with Heavy Embroidery",
    price: 25999,
    fabric: "Pure Silk with Zari Work",
    images: ["/maroon-bridal-silk-saree-gold-embroidery.jpg", "/maroon-saree-back-view-embroidery.jpg"] as [
      string,
      string,
    ],
    slug: "royal-maroon-bridal-silk-saree",
  },
  {
    id: "2",
    name: "Traditional Kosa Silk Saree in Forest Green",
    price: 12999,
    fabric: "Authentic Kosa Silk",
    images: ["/green-kosa-silk-saree-traditional.jpg", "/green-kosa-silk-saree-drape.jpg"] as [string, string],
    slug: "traditional-kosa-silk-green",
  },
  {
    id: "3",
    name: "Designer Banarasi Saree with Golden Border",
    price: 18999,
    fabric: "Banarasi Silk",
    images: ["/banarasi-saree-purple-golden-border.jpg", "/banarasi-saree-purple-close-up.jpg"] as [string, string],
    slug: "designer-banarasi-golden-border",
  },
  {
    id: "4",
    name: "Elegant Cotton Silk Saree in Royal Blue",
    price: 8999,
    fabric: "Cotton Silk Blend",
    images: ["/royal-blue-cotton-silk-saree.jpg", "/blue-cotton-silk-saree-pattern.jpg"] as [string, string],
    slug: "elegant-cotton-silk-royal-blue",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Raipur",
    initials: "PS",
    rating: 5,
    text: "Found my perfect wedding saree at Saree Sansar! The quality and craftsmanship are exceptional. Sanjay ji helped me choose the best design.",
  },
  {
    name: "Anjali Verma",
    location: "Bilaspur",
    initials: "AV",
    rating: 5,
    text: "The Kosa silk collection is absolutely stunning. Authentic local work and reasonable prices. Highly recommended!",
  },
  {
    name: "Kavita Patel",
    location: "Korba",
    initials: "KP",
    rating: 5,
    text: "Excellent service and beautiful collection. The team is very helpful and patient. Got a gorgeous saree for my sister's wedding.",
  },
  {
    name: "Sneha Gupta",
    location: "Raigarh",
    initials: "SG",
    rating: 5,
    text: "Virtual try-on feature is amazing! Could see how the saree would look before buying. Delivery was super fast too.",
  },
  {
    name: "Meera Joshi",
    location: "Durg",
    initials: "MJ",
    rating: 5,
    text: "Best bridal collection in Chhattisgarh! The Banarasi sarees are to die for. Will definitely shop here again.",
  },
  {
    name: "Ritu Singh",
    location: "Ambikapur",
    initials: "RS",
    rating: 5,
    text: "Ordered a Kosa silk saree for my mother. The quality exceeded expectations. Packaging was premium too!",
  },
]


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Video Background Section */}
        <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden mt-4 md:mt-6">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain md:object-cover"
              poster="/luxurious-silk-sarees-display-traditional-indian.jpg"
            >
              <source src="/sareesansarvideo.mp4" type="video/mp4" />
            </video>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Content Over Video */}
          <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl text-white">
              <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm md:text-base animate-pulse">
                ✨ Experience the Elegance
              </p>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Drape Yourself in
                <span className="block text-primary">Timeless Beauty</span>
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                From traditional Kosa Silk to exquisite Banarasi weaves, discover handcrafted sarees
                that tell a story of Indian heritage and artistry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold px-8">
                    <Sparkles className="h-5 w-5" />
                    Explore Collection
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black gap-2 font-semibold px-8 bg-transparent"
                  onClick={() => window.open("https://wa.me/919354815144", "_blank")}
                >
                  <Heart className="h-5 w-5" />
                  Get Styling Tips
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-primary">24+</p>
                  <p className="text-white/70 text-sm">Years of Trust</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-primary">50K+</p>
                  <p className="text-white/70 text-sm">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-primary">1000+</p>
                  <p className="text-white/70 text-sm">Saree Designs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="border-y border-border bg-primary/10">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-3 rounded-full">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Authentic Products</p>
                  <p className="text-xs text-muted-foreground">100% Genuine</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-3 rounded-full">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Pan India Delivery</p>
                  <p className="text-xs text-muted-foreground">Secure Shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-3 rounded-full">
                  <Headphones className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">24/7 Support</p>
                  <p className="text-xs text-muted-foreground">Always Here</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-3 rounded-full">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Since 2000</p>
                  <p className="text-xs text-muted-foreground">Trusted Quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Video Section */}
        <PromoVideo />

        {/* Virtual Try-On Feature Section */}
        <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 fan-pattern opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="h-8 w-8" />
                  <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-semibold">NEW</span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-balance">Try Before You Buy</h2>
                <p className="text-xl mb-6 text-white/90 text-balance">
                  Upload your photo and see how you look in our stunning sarees with our AI-powered Virtual Try-On
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 p-1 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Instant virtual draping</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 p-1 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Try multiple designs in seconds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 p-1 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Share with family for opinions</span>
                  </li>
                </ul>
                <Link href="/virtual-try-on">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 gap-2">
                    <Camera className="h-5 w-5" />
                    Try Virtual Try-On Now
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src="/trybeforeyoubuy.png"
                    alt="Virtual Try-On Demo"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-primary p-4 rounded-lg shadow-xl">
                  <p className="font-semibold text-lg">1000+ Happy Users</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 mandala-pattern">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Shop by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Explore our curated collections of exquisite ethnic wear for every occasion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.name} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Special Collections Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Special Collections</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Handpicked collections for your special moments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden group cursor-pointer border-2 hover:border-primary transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src="/kosasilk.png"
                    alt="Kosa Silk Special"
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Local Craft
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">Kosa Silk Special</h3>
                  <p className="text-muted-foreground mb-4">
                    Authentic Chhattisgarh artisan collection with pure Kosa silk
                  </p>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Explore Collection
                  </Button>
                </div>
              </Card>

              <Card className="overflow-hidden group cursor-pointer border-2 hover:border-secondary transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src="/perfectbridalcollection.png"
                    alt="Perfect Bridal Collection"
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Trending
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">Perfect Bridal Collection</h3>
                  <p className="text-muted-foreground mb-4">
                    Make your special day unforgettable with stunning designs
                  </p>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  >
                    View Bridal Range
                  </Button>
                </div>
              </Card>

              <Card className="overflow-hidden group cursor-pointer border-2 hover:border-accent transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src="/festivecollection.png"
                    alt="Festive Collection"
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <BadgePercent className="h-3 w-3" />
                    20% OFF
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">Festive Collection</h3>
                  <p className="text-muted-foreground mb-4">Celebrate every festival with vibrant colors and designs</p>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    Shop Festive Wear
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">New Arrivals</h2>
                <p className="text-muted-foreground">Discover our latest collection of stunning sarees</p>
              </div>
              <Button
                variant="outline"
                className="hidden md:inline-flex hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Button
                variant="outline"
                className="w-full hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-primary/5 fan-pattern">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Choose Saree Sansar?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your trusted partner for authentic ethnic wear since 2000
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
                <p className="text-muted-foreground text-sm">Every piece is carefully selected and quality checked</p>
              </div>

              <div className="text-center">
                <div className="bg-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Wide Variety</h3>
                <p className="text-muted-foreground text-sm">From traditional to contemporary, we have it all</p>
              </div>

              <div className="text-center">
                <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgePercent className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
                <p className="text-muted-foreground text-sm">Competitive pricing without compromising quality</p>
              </div>

              <div className="text-center">
                <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-muted-foreground text-sm">Our team helps you find the perfect outfit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-b from-background to-muted mandala-pattern">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Customers Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Trusted by thousands of happy customers across India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1"
                >
                  {/* Customer Avatar & Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-foreground leading-relaxed text-sm">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Footer Wrapper with Single Background */}
        <div
          className="relative"
          style={{ backgroundImage: 'url(/footerbackground.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Dark Overlay for the entire section */}
          <div className="absolute inset-0 bg-black/50" />

          {/* CTA Section */}
          <section className="py-16 text-white relative z-10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
                Need Help Choosing the Perfect Saree?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-balance text-white/90">
                Our expert team is here to help you find the perfect outfit. Chat with us on WhatsApp for personalized
                recommendations.
              </p>
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 text-lg px-8 py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                onClick={() => window.open("https://wa.me/919354815144", "_blank")}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat with Us on WhatsApp
              </Button>
            </div>
          </section>

          {/* Footer inside the wrapper for seamless background */}
          <Footer />
        </div>
      </main>
    </div>
  )
}
