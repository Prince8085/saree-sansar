import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { RotateCcw, Clock, CheckCircle, XCircle, Phone } from "lucide-react"

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-4xl font-bold mb-8 text-center">Refund & Return Policy</h1>

                    <Card className="p-8 space-y-8">
                        {/* Refund Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">7 Days Return</h3>
                                <p className="text-sm text-muted-foreground">Easy returns within 7 days of delivery</p>
                            </div>
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <RotateCcw className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">Free Exchange</h3>
                                <p className="text-sm text-muted-foreground">Exchange for different size or design</p>
                            </div>
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">Full Refund</h3>
                                <p className="text-sm text-muted-foreground">100% refund for eligible returns</p>
                            </div>
                        </div>

                        {/* Policy Details */}
                        <div className="space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold mb-3 text-primary">Eligible for Return/Refund</h2>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Product received is damaged or defective</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Wrong product delivered (different from what was ordered)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Product significantly different from description or images</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Size doesn't match the specifications provided</span>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3 text-destructive">Not Eligible for Return/Refund</h2>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <span>Products that have been worn, washed, or altered</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <span>Products without original tags and packaging</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <span>Customized or personalized items</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <span>Items returned after 7 days of delivery</span>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">How to Request a Return</h2>
                                <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                                    <li>Contact us on WhatsApp at +91 9354815144 within 7 days of delivery</li>
                                    <li>Share your order ID and reason for return with photos/videos</li>
                                    <li>Our team will verify and approve/reject the return request within 24 hours</li>
                                    <li>Pack the product in original packaging and hand over to our courier partner</li>
                                    <li>Refund will be processed within 5-7 business days after we receive the product</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Refund Mode</h2>
                                <p className="text-muted-foreground">
                                    Refunds will be processed to the original payment method. For COD orders, refund will be
                                    transferred via UPI or bank transfer. Please allow 5-7 business days for the refund to reflect
                                    in your account.
                                </p>
                            </section>
                        </div>

                        {/* Contact */}
                        <div className="border-t border-border pt-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>For any queries, contact us: </span>
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
