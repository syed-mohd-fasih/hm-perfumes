import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">About HM Perfumes</h1>
            <p className="text-lg text-foreground/60">Crafting luxury fragrances since 2015</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-4">
              HM Perfumes was founded with a simple vision: to create exceptional fragrances that capture the essence of
              luxury and elegance. Our journey began in a small atelier where master perfumers crafted each scent with
              meticulous attention to detail.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Today, we continue that tradition, blending timeless craftsmanship with modern innovation to create
              perfumes that tell a story and evoke emotion.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-4">
              We believe that fragrance is more than just a scent—it's an experience, a memory, a moment in time. Our
              mission is to create perfumes that resonate with your personality and enhance your everyday moments.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Every bottle is crafted with premium ingredients sourced from around the world, ensuring that each
              fragrance is a masterpiece of quality and sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-foreground/60">Only the finest ingredients for our fragrances</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold text-lg mb-2">Artisan Crafted</h3>
              <p className="text-foreground/60">Each scent is carefully composed by master perfumers</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-semibold text-lg mb-2">Sustainable</h3>
              <p className="text-foreground/60">Committed to ethical sourcing and eco-friendly practices</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
