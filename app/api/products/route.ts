import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "products.json")

// Helper to read products
function readProducts() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8")
        return JSON.parse(data)
    } catch {
        return []
    }
}

// Helper to write products
function writeProducts(products: any[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2))
}

// Helper to generate slug
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

// GET - Fetch all products
export async function GET() {
    try {
        const products = readProducts()
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }
}

// POST - Add new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const products = readProducts()

        // Generate new ID
        const maxId = products.reduce((max: number, p: any) => Math.max(max, parseInt(p.id) || 0), 0)
        const newId = (maxId + 1).toString()

        const newProduct = {
            id: newId,
            name: body.name,
            price: parseInt(body.price),
            originalPrice: body.originalPrice ? parseInt(body.originalPrice) : undefined,
            fabric: body.fabric,
            category: body.category,
            color: body.color,
            occasion: body.occasion,
            images: body.images || ["/placeholder-saree.jpg", "/placeholder-saree.jpg"],
            slug: generateSlug(body.name),
            description: body.description,
            stock: parseInt(body.stock) || 0,
            rating: parseFloat(body.rating) || 0,
            reviewCount: parseInt(body.reviewCount) || 0,
            details: body.details || undefined,
        }

        products.push(newProduct)
        writeProducts(products)

        return NextResponse.json(newProduct, { status: 201 })
    } catch (error) {
        console.error("Error adding product:", error)
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
    }
}
