import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

/**
 * Design Philosophy: Data-First Elegance
 * - Minimalist, clean aesthetic with emerald green accents
 * - Focus on data visualization and clear information hierarchy
 * - Typography: Playfair Display (titles), Inter (body)
 * - Color: Emerald green (#10B981), white, soft gray
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-emerald-600">SustainableReach</div>
          <Link href="/report">
            <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">
              View Report
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663591416683/LzvgnQgGDGquUotGdHBh9g/hero-banner-5qK5grUoPJrXVRcsr4kasD.webp)",
          }}
        />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: "Playfair Display" }}>
              Discover Your Perfect Creator Partners
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive analysis of 20 top sustainable beauty influencers. Find creators who align with your brand values and audience.
            </p>
            <Link href="/report">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              Explore Report <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: "Playfair Display" }}>
            Research Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold">20 Creators</h3>
              </div>
              <p className="text-gray-600">Carefully selected beauty and wellness influencers with 10K-100K followers</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold">High Engagement</h3>
              </div>
              <p className="text-gray-600">Average engagement rate of 9.47% with audiences greater than 70% quality score</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold">Sustainability Focus</h3>
              </div>
              <p className="text-gray-600">35% with "Very High" sustainability commitment aligned with your brand</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663591416683/LzvgnQgGDGquUotGdHBh9g/collaboration-section-bg-8Frod5t4QSfpiqC9X9SfYM.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display" }}>
            Ready to Find Your Next Partner?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access detailed profiles, engagement metrics, personalized outreach angles, and collaboration readiness scores for each creator.
          </p>
          <Link href="/report">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              View Full Report <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Sustainable Skincare Influencer Partnership Report • 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
