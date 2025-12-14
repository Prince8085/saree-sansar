import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { FileText, Phone } from "lucide-react"

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-4xl font-bold mb-4 text-center">Terms & Conditions</h1>
                    <p className="text-center text-muted-foreground mb-8">Last updated: January 2025</p>

                    <Card className="p-8 space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Agreement to Terms
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing and using the Saree Sansar website, you agree to be bound by these Terms and
                                Conditions. If you do not agree with any part of these terms, you may not use our website or
                                services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Products & Pricing</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>All product prices are in Indian Rupees (INR) and inclusive of GST where applicable</li>
                                <li>Prices are subject to change without prior notice</li>
                                <li>Product images are for representation; actual colors may vary slightly</li>
                                <li>We reserve the right to limit quantities on any order</li>
                                <li>Customization prices will be quoted separately via WhatsApp</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Orders & Payment</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Orders are placed primarily through WhatsApp communication</li>
                                <li>An order is confirmed only after we send you a confirmation message</li>
                                <li>We accept UPI, bank transfer, and Cash on Delivery (COD)</li>
                                <li>COD is available for orders up to ₹25,000</li>
                                <li>For prepaid orders, payment must be completed within 24 hours</li>
                                <li>We reserve the right to cancel orders due to stock unavailability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Shipping & Delivery</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Delivery timelines are estimates and may vary</li>
                                <li>Risk of loss passes to you upon delivery</li>
                                <li>Ensure someone is available to receive the package</li>
                                <li>Please inspect the package before signing</li>
                                <li>We are not responsible for delays due to courier issues or force majeure</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Returns & Refunds</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Please refer to our detailed{" "}
                                <a href="/refund-policy" className="text-primary hover:underline">
                                    Refund & Return Policy
                                </a>{" "}
                                for complete information on returns, exchanges, and refunds.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Intellectual Property</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>All content on this website is owned by Saree Sansar</li>
                                <li>You may not reproduce, distribute, or use our content without permission</li>
                                <li>The Saree Sansar name and logo are our trademarks</li>
                                <li>User-submitted content (reviews) grants us a license to use it</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the confidentiality of your order details</li>
                                <li>Use the website for lawful purposes only</li>
                                <li>Do not attempt to harm or disrupt our services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Saree Sansar shall not be liable for any indirect, incidental, special, or consequential damages
                                arising from your use of our website or products. Our maximum liability shall not exceed the
                                amount paid for the product in question.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Dispute Resolution</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Any disputes arising from these terms shall be governed by the laws of India. Disputes shall be
                                subject to the exclusive jurisdiction of the courts in Bilaspur, Chhattisgarh.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                                posting on this page. Continued use of our website constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        {/* Contact */}
                        <div className="border-t border-border pt-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>For any queries regarding these terms, contact us: </span>
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
