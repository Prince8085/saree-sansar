import Link from "next/link"
import { Phone, MapPin, Facebook, Instagram, Youtube, Package } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ backgroundImage: 'url(/footerbackground.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Saree Sansar</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              Since 2000, we've been Bilaspur's trusted destination for premium Indian ethnic wear. Specializing in
              bridal collections, exquisite silk sarees, and traditional attire.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/share/1EHv7vPLkm/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/saree_sansar_bsp?igsh=MWtwcHJrY2NiMHdhcQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@SareeSansar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?collection=bridal" className="hover:text-primary transition-colors">
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link href="/virtual-try-on" className="hover:text-primary transition-colors flex items-center gap-1">
                  Virtual Try-On
                  <span className="bg-accent text-accent-foreground text-xs px-1 py-0.5 rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop By Category</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=silk" className="hover:text-primary transition-colors">
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/products?category=kosa" className="hover:text-primary transition-colors">
                  Kosa Silk (Local Special)
                </Link>
              </li>
              <li>
                <Link href="/products?category=kurtis" className="hover:text-primary transition-colors">
                  Kurtis & Suits
                </Link>
              </li>
              <li>
                <Link href="/products?category=ghagra" className="hover:text-primary transition-colors">
                  Ghagra Chunni
                </Link>
              </li>
              <li>
                <Link href="/products?category=indo-western" className="hover:text-primary transition-colors">
                  Indo-Western
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Saree Sansar</p>
                  <p className="text-secondary-foreground/80">
                    Shree Ram New Cloth Market
                    <br />
                    Agrasen Chowk, Bilaspur
                    <br />
                    Chhattisgarh, India
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <a href="tel:+919354815144" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Sanjay: +91 9354815144</span>
                </a>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Ayaan: Available on WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Rahul: Available on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policies Row */}
        <div className="border-t border-secondary-foreground/20 pt-6 mb-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/refund-policy" className="hover:text-primary transition-colors">
              Refund Policy
            </Link>
            <Link href="/shipping" className="hover:text-primary transition-colors">
              Shipping Information
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/70">
            <p>© {currentYear} Saree Sansar - The Women's World. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with ❤️ in Bilaspur</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
