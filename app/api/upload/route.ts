import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPG, PNG, WEBP allowed." },
                { status: 400 }
            )
        }

        // Create unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, "-")
        const filename = `${timestamp}-${originalName}`

        // Ensure products directory exists
        const uploadDir = path.join(process.cwd(), "public", "products")
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Directory might already exist
        }

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filepath = path.join(uploadDir, filename)

        await writeFile(filepath, buffer)

        // Return the public URL path
        const publicUrl = `/products/${filename}`

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename: filename,
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }
}
