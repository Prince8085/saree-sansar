import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  name: string
  image: string
  href: string
  description?: string
}

export function CategoryCard({ name, image, href, description }: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/20">
        <div className="relative aspect-square overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-balance">{name}</h3>
            {description && <p className="text-sm text-white/90">{description}</p>}
            <div className="mt-4 inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
              Shop Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
