import { NextRequest, NextResponse } from "next/server"

// HuggingFace Spaces API for Kolors Virtual Try-On (FREE!)
// This uses the Gradio API behind HuggingFace Spaces

// Fallback to Pollinations for AI preview
async function generateWithPollinations(sareeName: string) {
    const prompt = `Ultra-realistic professional fashion photograph of an elegant Indian woman wearing a luxurious ${sareeName} draped in traditional Nivi style. The saree has rich vibrant colors with intricate patterns and gold zari border work. Perfect pleats at waist, pallu over left shoulder, matching blouse. Studio lighting, 8K quality, photorealistic, detailed fabric texture, traditional Indian jewelry, elegant pose, professional fashion photography`

    const encodedPrompt = encodeURIComponent(prompt)
    const seed = Math.floor(Math.random() * 1000000)
    const pollinationsUrl = `https://pollinations.ai/p/${encodedPrompt}?width=512&height=768&model=flux&seed=${seed}&nologo=true`

    try {
        const imageResponse = await fetch(pollinationsUrl, {
            method: "GET",
            headers: { "Accept": "image/*" },
        })

        if (!imageResponse.ok) {
            throw new Error(`Pollinations error: ${imageResponse.status}`)
        }

        const imageBuffer = await imageResponse.arrayBuffer()
        const base64Image = Buffer.from(imageBuffer).toString("base64")
        const contentType = imageResponse.headers.get("content-type") || "image/jpeg"
        const imageDataUrl = `data:${contentType};base64,${base64Image}`

        return NextResponse.json({
            success: true,
            type: "image",
            image: imageDataUrl,
            message: "AI preview generated! This shows how the saree style would look. For actual virtual try-on with your photo, contact us on WhatsApp!",
            isPreview: true,
        })
    } catch {
        return NextResponse.json({
            success: true,
            type: "url",
            imageUrl: pollinationsUrl,
            message: "AI preview ready!",
            isPreview: true,
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userImage, sareeImage, sareeName } = await request.json()

        if (!sareeImage || !sareeName) {
            return NextResponse.json(
                { error: "Saree image and name are required" },
                { status: 400 }
            )
        }

        // If no user image, use Pollinations for AI preview
        if (!userImage) {
            console.log("No user image provided, using Pollinations preview")
            return await generateWithPollinations(sareeName)
        }

        try {
            // Try HuggingFace Spaces Kolors Virtual Try-On
            // The space runs on Gradio, we can call it via the predict API
            console.log("Calling HuggingFace Kolors Virtual Try-On...")

            // Extract base64 data
            const personImageBase64 = userImage.includes(",") ? userImage.split(",")[1] : userImage
            const garmentImageBase64 = sareeImage.includes(",") ? sareeImage.split(",")[1] : sareeImage

            // Call the Gradio API for Kolors Virtual Try-On
            const response = await fetch("https://kwai-kolors-kolors-virtual-try-on.hf.space/api/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: [
                        `data:image/jpeg;base64,${personImageBase64}`, // Person image
                        `data:image/jpeg;base64,${garmentImageBase64}`, // Garment image
                    ],
                }),
            })

            if (!response.ok) {
                const errorText = await response.text().catch(() => "Unknown error")
                console.error("HuggingFace API error:", response.status, errorText)

                // Check if space is sleeping or rate limited
                if (response.status === 503) {
                    console.log("HuggingFace space is loading, using Pollinations fallback")
                    return await generateWithPollinations(sareeName)
                }

                throw new Error(`API error: ${response.status}`)
            }

            const data = await response.json()
            console.log("HuggingFace response received")

            // Gradio returns data in a specific format
            if (data.data && data.data[0]) {
                const resultImage = data.data[0]

                // It might be a URL or base64
                if (typeof resultImage === "string") {
                    if (resultImage.startsWith("data:")) {
                        return NextResponse.json({
                            success: true,
                            type: "image",
                            image: resultImage,
                            message: "Virtual try-on generated successfully!",
                        })
                    } else if (resultImage.startsWith("http")) {
                        // Fetch the image and convert to base64
                        const imgResponse = await fetch(resultImage)
                        const imgBuffer = await imgResponse.arrayBuffer()
                        const base64 = Buffer.from(imgBuffer).toString("base64")
                        const imgType = imgResponse.headers.get("content-type") || "image/jpeg"

                        return NextResponse.json({
                            success: true,
                            type: "image",
                            image: `data:${imgType};base64,${base64}`,
                            message: "Virtual try-on generated successfully!",
                        })
                    }
                }
            }

            // If HuggingFace doesn't return expected format, fallback
            console.log("Unexpected response format, using Pollinations")
            return await generateWithPollinations(sareeName)

        } catch (hfError) {
            console.error("HuggingFace error:", hfError)
            // Fallback to Pollinations
            console.log("Falling back to Pollinations preview")
            return await generateWithPollinations(sareeName)
        }
    } catch (error) {
        console.error("Virtual try-on error:", error)
        return NextResponse.json(
            { error: "Failed to generate virtual try-on", details: String(error) },
            { status: 500 }
        )
    }
}
