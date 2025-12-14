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
    { name: "Silk Sarees", href: "/products?category=silk" },
    { name: "Kosa Silk (Special)", href: "/products?category=kosa" },
    { name: "Cotton Sarees", href: "/products?category=cotton" },
    { name: "Bridal Sarees", href: "/products?category=bridal" },
  ]

  const ethnicWear = [
    { name: "Kurtis", href: "/products?category=kurtis" },
    { name: "Salwar Suits", href: "/products?category=suits" },
    { name: "Indo-Western", href: "/products?category=indo-western" },
    { name: "Ghagra Chunni", href: "/products?category=ghagra" },
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
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-md">
                <span className="text-primary-foreground font-serif text-2xl font-bold">S</span>
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
                    <ul className="grid w-[300px] gap-1 p-3 bg-card border border-border shadow-lg rounded-lg">
                      {sareeCategories.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors bg-card text-foreground hover:bg-primary/10 hover:text-primary"
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm text-foreground">Ethnic Wear</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-1 p-3 bg-card border border-border shadow-lg rounded-lg">
                      {ethnicWear.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors bg-card text-foreground hover:bg-primary/10 hover:text-primary"
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
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

                  <nav className="flex flex-col gap-4">
                    <Link
                      href="/"
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products?collection=bridal"
                      className="text-lg font-medium text-secondary hover:text-secondary/80 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Bridal Collection
                    </Link>

                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-foreground">Sarees</div>
                      <div className="pl-4 space-y-2">
                        {sareeCategories.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-foreground">Ethnic Wear</div>
                      <div className="pl-4 space-y-2">
                        {ethnicWear.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/virtual-try-on"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">NEW</span>
                      Virtual Try-On
                    </Link>

                    <Link
                      href="/track-order"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Package className="h-5 w-5" />
                      Track Order
                    </Link>

                    <Link
                      href="/about"
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>

                    <div className="border-t border-border pt-4 mt-2">
                      <Button
                        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                        onClick={() => {
                          handleWhatsAppClick()
                          setMobileMenuOpen(false)
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chat on WhatsApp
                      </Button>
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
