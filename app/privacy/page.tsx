import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Shield, Eye, Lock, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
                    <p className="text-center text-muted-foreground mb-8">Last updated: January 2025</p>

                    <Card className="p-8 space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Introduction
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                At Saree Sansar ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy
                                Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                                website or make a purchase from us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <Eye className="h-5 w-5 text-primary" />
                                Information We Collect
                            </h2>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h3 className="font-medium text-foreground mb-2">Personal Information</h3>
                                    <ul className="space-y-1 list-disc list-inside">
                                        <li>Name and contact information (phone number, email address)</li>
                                        <li>Shipping and billing address</li>
                                        <li>Order history and preferences</li>
                                        <li>Communication history via WhatsApp or phone</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground mb-2">Automatically Collected Information</h3>
                                    <ul className="space-y-1 list-disc list-inside">
                                        <li>Device information (browser type, operating system)</li>
                                        <li>IP address and location data</li>
                                        <li>Pages visited and time spent on our website</li>
                                        <li>Referral source</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>To process and fulfill your orders</li>
                                <li>To communicate with you about orders and promotions</li>
                                <li>To improve our website and customer service</li>
                                <li>To send promotional offers (with your consent)</li>
                                <li>To prevent fraud and ensure security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                Data Security
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement appropriate security measures to protect your personal information. However, no method
                                of transmission over the Internet is 100% secure. We use encryption for payment processing and
                                secure storage for all customer data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
                            <p className="text-muted-foreground leading-relaxed mb-3">
                                We do not sell, trade, or otherwise transfer your personal information to outside parties except:
                            </p>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Trusted service providers who assist in operating our website and business</li>
                                <li>Courier partners for order delivery</li>
                                <li>Payment processors for transaction handling</li>
                                <li>When required by law or to protect our rights</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Access your personal information we hold</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal requirements)</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent for data processing</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use cookies to enhance your browsing experience, analyze site traffic, and understand user
                                preferences. You can control cookies through your browser settings, but disabling them may affect
                                website functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                                updated revision date. We encourage you to review this policy periodically.
                            </p>
                        </section>

                        {/* Contact */}
                        <div className="border-t border-border pt-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>For privacy-related queries, contact us: </span>
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
