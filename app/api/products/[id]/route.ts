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

// GET - Fetch single product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const products = readProducts()
        const product = products.find((p: any) => p.id === id)

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
    }
}

// PUT - Update product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const products = readProducts()
        const index = products.findIndex((p: any) => p.id === id)

        if (index === -1) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        const updatedProduct = {
            ...products[index],
            name: body.name || products[index].name,
            price: body.price ? parseInt(body.price) : products[index].price,
            originalPrice: body.originalPrice ? parseInt(body.originalPrice) : products[index].originalPrice,
            fabric: body.fabric || products[index].fabric,
            category: body.category || products[index].category,
            color: body.color || products[index].color,
            occasion: body.occasion || products[index].occasion,
            images: body.images || products[index].images,
            slug: body.name ? generateSlug(body.name) : products[index].slug,
            description: body.description || products[index].description,
            stock: body.stock !== undefined ? parseInt(body.stock) : products[index].stock,
            rating: body.rating !== undefined ? parseFloat(body.rating) : products[index].rating,
            reviewCount: body.reviewCount !== undefined ? parseInt(body.reviewCount) : products[index].reviewCount,
            details: body.details || products[index].details,
        }

        products[index] = updatedProduct
        writeProducts(products)

        return NextResponse.json(updatedProduct)
    } catch (error) {
        console.error("Error updating product:", error)
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }
}

// DELETE - Delete product
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const products = readProducts()
        const index = products.findIndex((p: any) => p.id === id)

        if (index === -1) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        const deletedProduct = products[index]
        products.splice(index, 1)
        writeProducts(products)

        return NextResponse.json({ message: "Product deleted", product: deletedProduct })
    } catch (error) {
        console.error("Error deleting product:", error)
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }
}
