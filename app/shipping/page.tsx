import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Truck, Clock, MapPin, Package, Shield, Phone } from "lucide-react"

export default function ShippingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-4xl font-bold mb-8 text-center">Shipping Information</h1>

                    <Card className="p-8 space-y-8">
                        {/* Shipping Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Truck className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">Pan India Delivery</h3>
                                <p className="text-sm text-muted-foreground">We deliver across all India</p>
                            </div>
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">5-7 Business Days</h3>
                                <p className="text-sm text-muted-foreground">Standard delivery time</p>
                            </div>
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Package className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">Free Shipping</h3>
                                <p className="text-sm text-muted-foreground">On orders above ₹10,000</p>
                            </div>
                        </div>

                        {/* Shipping Details */}
                        <div className="space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                    <Truck className="h-5 w-5 text-primary" />
                                    Delivery Time & Charges
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-semibold">Location</th>
                                                <th className="text-left py-3 px-4 font-semibold">Delivery Time</th>
                                                <th className="text-left py-3 px-4 font-semibold">Shipping Charges</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-muted-foreground">
                                            <tr className="border-b border-border">
                                                <td className="py-3 px-4">Chhattisgarh (Local)</td>
                                                <td className="py-3 px-4">2-4 business days</td>
                                                <td className="py-3 px-4">Free on all orders</td>
                                            </tr>
                                            <tr className="border-b border-border">
                                                <td className="py-3 px-4">Metro Cities</td>
                                                <td className="py-3 px-4">5-7 business days</td>
                                                <td className="py-3 px-4">₹99 (Free above ₹10,000)</td>
                                            </tr>
                                            <tr className="border-b border-border">
                                                <td className="py-3 px-4">Other Cities</td>
                                                <td className="py-3 px-4">7-10 business days</td>
                                                <td className="py-3 px-4">₹149 (Free above ₹10,000)</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-4">Remote Areas</td>
                                                <td className="py-3 px-4">10-15 business days</td>
                                                <td className="py-3 px-4">₹199 (Free above ₹15,000)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    Delivery Process
                                </h2>
                                <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                                    <li>After placing your order, you'll receive a confirmation on WhatsApp</li>
                                    <li>Our team carefully packs your saree with protective packaging</li>
                                    <li>You'll receive tracking details once the order is shipped</li>
                                    <li>Track your order anytime using the order tracking page</li>
                                    <li>Delivery partner will call before delivery for convenience</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    Packaging & Safety
                                </h2>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Each saree is carefully folded and wrapped in tissue paper</li>
                                    <li>• Placed in a premium saree box for protection</li>
                                    <li>• Outer packaging with waterproof cover</li>
                                    <li>• Blouse piece included separately in the package</li>
                                    <li>• Authentication certificate for silk sarees</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Important Notes</h2>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Delivery times may vary during festive seasons or sales</li>
                                    <li>• We don't deliver on Sundays and public holidays</li>
                                    <li>• Someone must be available to receive the package</li>
                                    <li>• Please check the package before accepting delivery</li>
                                    <li>• COD (Cash on Delivery) available for orders up to ₹25,000</li>
                                </ul>
                            </section>
                        </div>

                        {/* Contact */}
                        <div className="border-t border-border pt-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>For shipping queries, contact us: </span>
                                <a href="tel:+919354815144" className="text-primary font-medium hover:underline">
                                    +91 9354815144
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
