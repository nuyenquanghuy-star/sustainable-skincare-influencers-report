import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Design Philosophy: Data-First Elegance
 * - Detailed creator profile with all metrics
 * - Personalized outreach message
 * - Copy-to-clipboard functionality
 */

interface Creator {
  rank: number;
  name: string;
  handle: string;
  followers: number;
  engagement_rate: number;
  audience_quality: number;
  sustainability_focus: string;
  fit_score_calculated: number;
  outreach_angle: string;
  content_style: string;
  audience_demographics: string;
}

export default function CreatorDetail() {
  const params = useParams();
  const handle = params?.handle || "";
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/creators_analysis_detailed.json");
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        const found = data.creators.find((c: Creator) => c.handle === handle);
        setCreator(found || null);
      } catch (error) {
        console.error("Error loading creator data:", error);
        setCreator(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [handle]);

  const generateOutreachMessage = (creator: Creator) => {
    return `Hi ${creator.name}!

I've been following your incredible work in sustainable beauty and I'm impressed by your authentic commitment to eco-conscious living. ${creator.outreach_angle}

I represent a sustainable skincare brand that shares your values, and I believe your audience would genuinely benefit from our products. I'd love to explore a meaningful collaboration that feels authentic to both our communities.

Would you be open to discussing partnership opportunities?

Looking forward to connecting!`;
  };

  const handleCopy = () => {
    if (creator) {
      const message = generateOutreachMessage(creator);
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading creator profile...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <Link href="/report">
            <Button variant="ghost" className="text-gray-600 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Report
            </Button>
          </Link>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Creator not found</p>
          </div>
        </div>
      </div>
    );
  }

  const getSustainabilityColor = (focus: string) => {
    switch (focus) {
      case "Very High":
        return "bg-emerald-100 text-emerald-800";
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium-High":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 7.5) return "text-emerald-600";
    if (score >= 7) return "text-green-600";
    if (score >= 6.5) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/report">
            <Button variant="ghost" className="text-gray-600 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="md:col-span-1">
            <Card className="p-6 border-gray-100 sticky top-20">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{creator.name}</h1>
                <p className="text-gray-600 mb-4">@{creator.handle}</p>
                <a
                  href={`https://instagram.com/${creator.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
                >
                  View on Instagram <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </div>

              {/* Fit Score */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg mb-6 border border-emerald-100">
                <p className="text-xs text-gray-600 mb-1">Partnership Fit Score</p>
                <p className={`text-4xl font-bold ${getFitScoreColor(creator.fit_score_calculated)}`}>
                  {creator.fit_score_calculated}
                </p>
                <p className="text-xs text-gray-600 mt-2">Out of 10</p>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Followers</p>
                  <p className="text-2xl font-bold text-gray-900">{(creator.followers / 1000).toFixed(0)}K</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Engagement Rate</p>
                  <p className="text-2xl font-bold text-emerald-600">{creator.engagement_rate.toFixed(2)}%</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Audience Quality</p>
                  <p className="text-2xl font-bold text-gray-900">{creator.audience_quality}%</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Sustainability Focus</p>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSustainabilityColor(creator.sustainability_focus)}`}>
                    {creator.sustainability_focus}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2">
            {/* Content & Audience */}
            <Card className="p-6 border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Playfair Display" }}>
                Content & Audience
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Content Style</h3>
                <p className="text-gray-600">{creator.content_style}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Target Audience</h3>
                <p className="text-gray-600">{creator.audience_demographics}</p>
              </div>
            </Card>

            {/* Outreach Strategy */}
            <Card className="p-6 border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Playfair Display" }}>
                Partnership Potential
              </h2>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-6">
                <h3 className="text-sm font-semibold text-emerald-900 mb-2">Why Partner with {creator.name}?</h3>
                <p className="text-sm text-emerald-800">{creator.outreach_angle}</p>
              </div>

              <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggested Outreach Message</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 max-h-64 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{generateOutreachMessage(creator)}</p>
              </div>

              <Button
                onClick={handleCopy}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Message
                  </>
                )}
              </Button>
            </Card>

            {/* Collaboration Readiness */}
            <Card className="p-6 border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Playfair Display" }}>
                Quick Facts
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Rank in Analysis</span>
                  <span className="font-semibold text-gray-900">#{creator.rank}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Engagement Category</span>
                  <span className="font-semibold text-gray-900">
                    {creator.engagement_rate > 10
                      ? "Very High"
                      : creator.engagement_rate > 5
                        ? "High"
                        : creator.engagement_rate > 3
                          ? "Medium"
                          : "Standard"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Best For</span>
                  <span className="font-semibold text-gray-900">
                    {creator.sustainability_focus === "Very High" ? "Authentic Partnerships" : "Sponsored Content"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            Partnership analysis based on engagement metrics, audience quality, and sustainability commitment
          </p>
        </div>
      </footer>
    </div>
  );
}
