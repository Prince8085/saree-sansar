"use client"

import { useState, useRef } from "react"
import { Instagram, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramVideos = [
    {
        id: "1",
        src: "/Video by saree_sansar_bsp [DSJja_zCJnI].mp4",
        title: "Elegant Saree Draping"
    },
    {
        id: "2",
        src: "/Video by saree_sansar_bsp [DSRTKN_CGzd].mp4",
        title: "Bridal Collection Showcase"
    },
    {
        id: "3",
        src: "/Video by saree_sansar_bsp [DSZBewSCJpe].mp4",
        title: "Traditional Kosa Silk"
    },
    {
        id: "4",
        src: "/Video by saree_sansar_bsp [DSeMeESkgOc].mp4",
        title: "Designer Sarees"
    }
]

interface VideoCardProps {
    src: string
    title: string
}

function VideoCard({ src, title }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <div
            className="relative group cursor-pointer aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                </div>
            )}

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
            >
                {isMuted ? (
                    <VolumeX className="h-4 w-4 text-white" />
                ) : (
                    <Volume2 className="h-4 w-4 text-white" />
                )}
            </button>

            {/* Instagram Icon Badge */}
            <div className="absolute top-3 left-3 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-2 rounded-lg shadow-lg">
                <Instagram className="h-4 w-4 text-white" />
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium truncate">{title}</p>
            </div>
        </div>
    )
}

export function InstagramVideos() {
    return (
        <section className="py-16 bg-gradient-to-b from-muted to-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Instagram className="h-4 w-4" />
                        <span>@saree_sansar_bsp</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                        Get daily inspiration, new arrivals & behind-the-scenes glimpses of our beautiful saree collections
                    </p>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {instagramVideos.map((video) => (
                        <VideoCard key={video.id} src={video.src} title={video.title} />
                    ))}
                </div>

                {/* Follow Button */}
                <div className="text-center mt-10">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white gap-2 font-semibold px-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        onClick={() => window.open("https://www.instagram.com/saree_sansar_bsp/", "_blank")}
                    >
                        <Instagram className="h-5 w-5" />
                        Follow @saree_sansar_bsp
                    </Button>
                </div>
            </div>
        </section>
    )
}
