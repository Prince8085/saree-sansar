import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gradient-to-br from-secondary via-accent to-secondary/80 text-secondary-foreground">
          <div className="absolute inset-0 mandala-pattern opacity-10" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">About Saree Sansar</h1>
              <p className="text-xl text-balance text-secondary-foreground/90 leading-relaxed">
                Your trusted destination for premium Indian ethnic wear since 2000
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Since 2000, Saree Sansar has been Bilaspur's premier destination for exquisite Indian ethnic wear.
                  What started as a small family business has grown into a trusted name for brides and fashion-conscious
                  women across Chhattisgarh.
                </p>
                <p>
                  We specialize in curating the finest collection of bridal sarees, authentic Kosa silk, traditional
                  ethnic wear, and contemporary Indo-Western outfits. Every piece in our collection is handpicked,
                  ensuring the highest quality of fabric, craftsmanship, and design.
                </p>
                <p>
                  Led by Sanjay, Ayaan, and Rahul, our team brings decades of expertise in understanding fabrics,
                  traditional designs, and modern fashion trends. We take pride in helping every customer find the
                  perfect outfit for their special occasions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted mandala-pattern">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every product is carefully inspected for authenticity and quality
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Specialized in authentic Kosa silk and regional craftsmanship
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Personal Service</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expert guidance and customization for your perfect look
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24+ Years</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Over two decades of trust and customer satisfaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-8 text-center">Visit Our Store</h2>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Location</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p className="font-semibold text-foreground">Saree Sansar - The Women's World</p>
                      <p>Shree Ram New Cloth Market</p>
                      <p>Agrasen Chowk, Bilaspur</p>
                      <p>Chhattisgarh, India</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Contact</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Sanjay</p>
                        <a href="tel:+919354815144" className="text-primary hover:underline">
                          +91 9354815144
                        </a>
                      </div>
                      <div>
                        <p className="font-medium">Ayaan & Rahul</p>
                        <p className="text-muted-foreground">Available on WhatsApp</p>
                      </div>
                      <div className="pt-4">
                        <p className="font-medium mb-2">Store Hours</p>
                        <p className="text-muted-foreground">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                        <p className="text-muted-foreground">Sunday: 11:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
