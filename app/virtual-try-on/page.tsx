"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Camera, Sparkles, X, Download, Share2, RefreshCw, AlertCircle, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const sareeCollection = [
  {
    id: "1",
    name: "Royal Maroon Bridal Saree",
    image: "/royal-maroon-bridal-silk-saree.jpg",
    category: "Bridal",
  },
  {
    id: "2",
    name: "Emerald Green Kosa Silk",
    image: "/emerald-green-kosa-silk-saree.jpg",
    category: "Kosa Silk",
  },
  {
    id: "3",
    name: "Golden Banarasi Saree",
    image: "/golden-banarasi-silk-saree.jpg",
    category: "Banarasi",
  },
  {
    id: "4",
    name: "Pink Floral Silk Saree",
    image: "/pink-floral-silk-saree-elegant.jpg",
    category: "Silk",
  },
  {
    id: "5",
    name: "Navy Blue Designer Saree",
    image: "/navy-blue-designer-saree-contemporary.jpg",
    category: "Designer",
  },
  {
    id: "6",
    name: "Red Wedding Saree",
    image: "/red-traditional-wedding-saree.jpg",
    category: "Bridal",
  },
]

export default function VirtualTryOnPage() {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [selectedSaree, setSelectedSaree] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [resultDescription, setResultDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setUserImage(reader.result as string)
        setResultImage(null) // Clear previous result
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const getSelectedSareeData = () => {
    return sareeCollection.find((s) => s.id === selectedSaree)
  }

  const fetchSareeImage = async (imagePath: string): Promise<string> => {
    // Fetch the saree image and convert to base64
    const response = await fetch(imagePath)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const handleTryOn = async () => {
    if (!userImage || !selectedSaree) {
      toast.error("Please upload your photo and select a saree")
      return
    }

    setIsProcessing(true)
    setError(null)
    setResultImage(null)
    setResultDescription(null)

    try {
      const sareeData = getSelectedSareeData()
      if (!sareeData) {
        throw new Error("Selected saree not found")
      }

      // Fetch saree image as base64
      const sareeImageBase64 = await fetchSareeImage(sareeData.image)

      const response = await fetch("/api/virtual-try-on", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImage: userImage,
          sareeImage: sareeImageBase64,
          sareeName: sareeData.name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate virtual try-on")
      }

      if (data.success) {
        if (data.type === "image" && data.image) {
          setResultImage(data.image)
          toast.success("Virtual try-on generated successfully!")
        } else if (data.type === "url" && data.imageUrl) {
          setResultImage(data.imageUrl)
          toast.success("Virtual try-on ready!")
        } else if (data.type === "description" && data.description) {
          setResultDescription(data.description)
          toast.success("AI visualization ready!")
        } else {
          throw new Error("No result was generated")
        }
      } else {
        throw new Error(data.error || "Something went wrong")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!resultImage) return

    const link = document.createElement("a")
    link.href = resultImage
    link.download = `saree-sansar-tryon-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Image downloaded!")
  }

  const handleShare = async () => {
    if (!resultImage) return

    const sareeData = getSelectedSareeData()

    if (navigator.share) {
      try {
        // Convert base64 to blob for sharing
        const response = await fetch(resultImage)
        const blob = await response.blob()
        const file = new File([blob], "saree-tryon.jpg", { type: "image/jpeg" })

        await navigator.share({
          title: "My Saree Try-On from Saree Sansar",
          text: `Check out how I look in the ${sareeData?.name}! Try it yourself at Saree Sansar.`,
          files: [file],
        })
      } catch (err) {
        // Fallback to WhatsApp share
        const whatsappUrl = `https://wa.me/?text=Check%20out%20my%20virtual%20try-on%20from%20Saree%20Sansar!%20${encodeURIComponent(window.location.href)}`
        window.open(whatsappUrl, "_blank")
      }
    } else {
      // Fallback to WhatsApp share
      const whatsappUrl = `https://wa.me/?text=Check%20out%20my%20virtual%20try-on%20from%20Saree%20Sansar!%20${encodeURIComponent(window.location.href)}`
      window.open(whatsappUrl, "_blank")
      toast.success("Share link opened!")
    }
  }

  const handleReset = () => {
    setResultImage(null)
    setResultDescription(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Virtual Try-On</h1>
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Visualize our beautiful sarees with AI! Select a saree to see a stunning preview of how it looks when draped traditionally.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Fashion Preview
            </div>
            <p className="text-xs text-muted-foreground mt-2 max-w-xl mx-auto">
              ✨ This generates a beautiful AI preview showing the saree style. For exact product appearance, contact us on WhatsApp!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Upload Section */}
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-bold mb-4">Step 1: Upload Your Photo</h2>
              <div className="space-y-4">
                {!userImage ? (
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-semibold mb-2">Click to upload your photo</p>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image src={userImage || "/placeholder.svg"} alt="Your photo" fill className="object-cover" />
                    <button
                      onClick={() => {
                        setUserImage(null)
                        setResultImage(null)
                        setResultDescription(null)
                      }}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    {userImage ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent" disabled>
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </Card>

            {/* Result Section */}
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-bold mb-4">Preview Result</h2>
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
                {resultImage ? (
                  <div className="relative w-full h-full">
                    <Image src={resultImage} alt="Try-on result" fill className="object-cover" />
                  </div>
                ) : resultDescription ? (
                  <div className="p-6 overflow-y-auto h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-lg">AI Visualization</h3>
                    </div>
                    <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {resultDescription}
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        💡 <strong>Tip:</strong> For the best experience, visit our store to try on the actual saree or contact us on WhatsApp for more photos!
                      </p>
                    </div>
                  </div>
                ) : isProcessing ? (
                  <div className="text-center p-8">
                    <div className="relative">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                    </div>
                    <p className="font-semibold text-lg mb-2">AI is working its magic...</p>
                    <p className="text-sm text-muted-foreground">This may take 15-30 seconds</p>
                  </div>
                ) : error ? (
                  <div className="text-center text-destructive p-8">
                    <AlertCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="font-semibold mb-2">Something went wrong</p>
                    <p className="text-sm mb-4">{error}</p>
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </Button>
                  </div>
                ) : userImage && selectedSaree ? (
                  <div className="text-center text-muted-foreground p-8">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="font-semibold mb-2">Ready to Generate!</p>
                    <p className="text-sm">Click the button below to see the magic</p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground p-8">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="font-semibold mb-2">Your Try-On Preview</p>
                    <p className="text-sm">Upload your photo and select a saree to see the magic!</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-4">
                {resultImage ? (
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                ) : resultDescription ? (
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                      onClick={() => {
                        const sareeData = getSelectedSareeData()
                        window.open(
                          `https://wa.me/919354815144?text=Hi! I just tried your Virtual Try-On with ${sareeData?.name}. Can you share more photos and pricing?`,
                          "_blank"
                        )
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Inquire on WhatsApp
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4" />
                      Try Another
                    </Button>
                  </div>
                ) : (
                  userImage &&
                  selectedSaree && (
                    <Button className="w-full gap-2" size="lg" onClick={handleTryOn} disabled={isProcessing}>
                      <Sparkles className="h-5 w-5" />
                      {isProcessing ? "Generating..." : "Generate Virtual Try-On"}
                    </Button>
                  )
                )}
              </div>
            </Card>
          </div>

          {/* Saree Selection */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6">Step 2: Choose Your Saree</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {sareeCollection.map((saree) => (
                <Card
                  key={saree.id}
                  className={cn(
                    "overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg",
                    selectedSaree === saree.id && "ring-4 ring-primary"
                  )}
                  onClick={() => {
                    setSelectedSaree(saree.id)
                    setResultImage(null) // Clear previous result when changing saree
                  }}
                >
                  <div className="relative aspect-[3/4]">
                    <Image src={saree.image || "/placeholder.svg"} alt={saree.name} fill className="object-cover" />
                    {selectedSaree === saree.id && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                          <Sparkles className="h-6 w-6" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm line-clamp-2">{saree.name}</p>
                    <p className="text-xs text-muted-foreground">{saree.category}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-lg mb-4">Tips for Best Results:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Use a clear, well-lit photo with a plain background</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Stand straight facing the camera for best draping visualization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Full body photos work best for complete saree view</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Try multiple sarees to find your perfect match!</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Generation takes 15-30 seconds - please be patient</span>
              </li>
            </ul>
          </Card>

          {/* WhatsApp CTA */}
          <Card className="p-6 mt-8 bg-[#25D366]/10 border-[#25D366]/30">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold text-lg mb-2">Love what you see?</h3>
                <p className="text-muted-foreground">
                  Contact us on WhatsApp to order your favorite saree or for customization options!
                </p>
              </div>
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                onClick={() => window.open("https://wa.me/919354815144?text=Hi! I just tried your Virtual Try-On and loved it!", "_blank")}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
