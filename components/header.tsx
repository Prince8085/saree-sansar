"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Phone, MapPin, Search, Heart, X, MessageCircle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sareeCategories = [
    { name: "Silk Sarees", href: "/products?category=silk", image: "/golden-banarasi-silk-saree.jpg", desc: "Premium Banarasi & Tussar" },
    { name: "Kosa Silk (Special)", href: "/products?category=kosa", image: "/emerald-green-kosa-silk-saree.jpg", desc: "Authentic CG Heritage" },
    { name: "Cotton Sarees", href: "/products?category=cotton", image: "/blue-cotton-silk-saree-pattern.jpg", desc: "Daily & Casual Wear" },
    { name: "Bridal Collection", href: "/products?category=bridal", image: "/royal-maroon-bridal-silk-saree.jpg", desc: "Wedding Specials" },
  ]

  const ethnicWear = [
    { name: "Kurtis", href: "/products?category=kurtis", image: "/modern-indian-kurti-ethnic-wear.jpg", desc: "Trendy & Comfortable" },
    { name: "Salwar Suits", href: "/products?category=suits", image: "/modern-indian-kurti-ethnic-wear.jpg", desc: "Elegant Sets" },
    { name: "Indo-Western", href: "/products?category=indo-western", image: "/modern-indian-kurti-ethnic-wear.jpg", desc: "Fusion Fashion" },
    { name: "Ghagra Chunni", href: "/products?category=ghagra", image: "/colorful-indian-ghagra-choli-lehenga.jpg", desc: "Traditional Charm" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919354815144?text=Hi! I'm interested in your saree collection.", "_blank")
  }

  const handleWishlistClick = () => {
    toast.info("Wishlist feature coming soon! For now, save items using the heart button on products.")
  }

  return (
    <>
      {/* Floating Announcement Bar */}
      <div className="bg-gradient-to-r from-accent via-primary to-secondary text-white py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {["🎉 Free Shipping above ₹10,000", "💫 New Arrivals Weekly", "🎁 Festival Sale Live - Up to 30% OFF", "✨ Authentic Kosa Silk Collection", "🚚 Pan India Delivery", "💝 Special Bridal Discount", "🎉 Free Shipping above ₹10,000", "💫 New Arrivals Weekly", "🎁 Festival Sale Live - Up to 30% OFF", "✨ Authentic Kosa Silk Collection", "🚚 Pan India Delivery", "💝 Special Bridal Discount"].map((text, i) => (
            <span key={i} className="mx-6 text-sm font-medium">{text} <span className="mx-4 text-white/50">|</span></span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919354815144" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">+91 9354815144</span>
            </a>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>Bilaspur, Chhattisgarh</span>
            </div>
          </div>
          <div className="text-xs font-semibold">Since 2000 - Trusted Quality</div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b-2 border-primary/20 transition-all duration-300",
          isScrolled ? "shadow-lg shadow-primary/10" : ""
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden transition-transform group-hover:scale-110 shadow-md">
                <img
                  src="/logo.png"
                  alt="Saree Sansar Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-foreground tracking-tight">Saree Sansar</span>
                <span className="text-xs text-secondary font-semibold -mt-1">The Women's World</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/products?collection=bridal"
                    className="px-4 py-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                  >
                    Bridal Collection
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm text-foreground">Sarees</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[450px] bg-card border border-border shadow-xl rounded-lg">
                      {sareeCategories.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground group-hover:text-primary">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm text-foreground">Ethnic Wear</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[450px] bg-card border border-border shadow-xl rounded-lg">
                      {ethnicWear.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground group-hover:text-primary">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/virtual-try-on"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">NEW</span>
                    Try-On
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/track-order"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Package className="h-4 w-4" />
                    Track Order
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:block relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <Input
                      type="search"
                      placeholder="Search sarees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 transition-all"
                      autoFocus
                    />
                    <Button type="submit" size="icon" variant="ghost">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="hover:text-primary"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:text-secondary"
                onClick={handleWishlistClick}
              >
                <Heart className="h-5 w-5" />
              </Button>

              {/* WhatsApp Button */}
              <Button
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6 mt-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  <nav className="flex flex-col gap-1">
                    {/* Home */}
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <span>Home</span>
                    </Link>

                    {/* Bridal Collection - Highlighted */}
                    <Link
                      href="/products?collection=bridal"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 hover:from-secondary/30 transition-all font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <span className="text-lg">💍</span>
                      </div>
                      <div>
                        <span className="text-secondary font-semibold">Bridal Collection</span>
                        <p className="text-xs text-muted-foreground">Wedding Specials</p>
                      </div>
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-border my-2" />

                    {/* Sarees Section */}
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sarees</p>
                      <div className="grid grid-cols-2 gap-2">
                        {sareeCategories.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                            <span className="text-sm">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border my-2" />

                    {/* Ethnic Wear Section */}
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ethnic Wear</p>
                      <div className="grid grid-cols-2 gap-2">
                        {ethnicWear.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                            <span className="text-sm">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border my-2" />

                    {/* Special Features */}
                    <Link
                      href="/virtual-try-on"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 hover:from-accent/30 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        <span className="text-lg">📸</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Virtual Try-On</span>
                          <span className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded font-bold">NEW</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Try before you buy</p>
                      </div>
                    </Link>

                    <Link
                      href="/track-order"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">Track Order</span>
                    </Link>

                    <Link
                      href="/about"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">About Us</span>
                    </Link>

                    {/* WhatsApp CTA */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 h-12 text-base font-semibold shadow-lg"
                        onClick={() => {
                          handleWhatsAppClick()
                          setMobileMenuOpen(false)
                        }}
                      >
                        <MessageCircle className="h-5 w-5" />
                        Chat on WhatsApp
                      </Button>
                      <p className="text-center text-xs text-muted-foreground mt-2">Quick response guaranteed!</p>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
