import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Filter, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Design Philosophy: Data-First Elegance
 * - Interactive data visualization with scatter plot
 * - Creator cards with fit scores
 * - Filter by sustainability focus and engagement
 * - Personalized outreach angles
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

export default function Report() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [sustainabilityFilter, setSustainabilityFilter] = useState<string>("all");
  const [engagementFilter, setEngagementFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from JSON
    const loadData = async () => {
      try {
        const response = await fetch("/creators_analysis_detailed.json");
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        setCreators(data.creators);
        setFilteredCreators(data.creators);
      } catch (error) {
        console.error("Error loading creators data:", error);
        // Fallback: use empty array
        setCreators([]);
        setFilteredCreators([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = creators;

    if (sustainabilityFilter !== "all") {
      filtered = filtered.filter((c) => c.sustainability_focus === sustainabilityFilter);
    }

    if (engagementFilter !== "all") {
      const threshold = parseInt(engagementFilter);
      filtered = filtered.filter((c) => c.engagement_rate >= threshold);
    }

    setFilteredCreators(filtered);
  }, [sustainabilityFilter, engagementFilter, creators]);

  const getSustainabilityColor = (focus: string) => {
    switch (focus) {
      case "Very High":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "High":
        return "bg-green-100 text-green-800 border-green-300";
      case "Medium-High":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 7.5) return "text-emerald-600";
    if (score >= 7) return "text-green-600";
    if (score >= 6.5) return "text-yellow-600";
    return "text-orange-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading creator data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Playfair Display" }}>
            Creator Partnership Report
          </h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Hero Section with Background */}
      <section
        className="py-12 relative"
        style={{
          backgroundImage:
            "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663591416683/LzvgnQgGDGquUotGdHBh9g/data-visualization-bg-R7bYosXScQw2LQt6pRunCc.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Playfair Display" }}>
            Top 20 Sustainable Beauty Influencers
          </h2>
          <p className="text-gray-600 mb-6">
            Detailed analysis of engagement rates, audience quality, sustainability commitment, and collaboration potential.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Filters:</span>
            </div>

            <div>
              <label className="text-sm text-gray-600 mr-2">Sustainability:</label>
              <select
                value={sustainabilityFilter}
                onChange={(e) => setSustainabilityFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Medium-High">Medium-High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mr-2">Engagement Rate:</label>
              <select
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="3">Greater than 3%</option>
                <option value="5">Greater than 5%</option>
                <option value="10">Greater than 10%</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredCreators.length} of {creators.length} creators
          </p>
        </div>
      </section>

      {/* Creators Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCreators.map((creator) => (
              <Link key={creator.handle} href={`/creator/${creator.handle}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-gray-100 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{creator.name}</h3>
                      <p className="text-sm text-gray-600">@{creator.handle}</p>
                    </div>
                    <div className={`text-2xl font-bold ${getFitScoreColor(creator.fit_score_calculated)}`}>
                      {creator.fit_score_calculated}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-100">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Followers</p>
                      <p className="font-semibold text-gray-900">
                        {(creator.followers / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Engagement</p>
                      <p className="font-semibold text-gray-900">{creator.engagement_rate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Audience Quality</p>
                      <p className="font-semibold text-gray-900">{creator.audience_quality}%</p>
                    </div>
                  </div>

                  {/* Sustainability Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getSustainabilityColor(creator.sustainability_focus)}`}>
                      {creator.sustainability_focus}
                    </span>
                  </div>

                  {/* Content Style */}
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Content:</span> {creator.content_style}
                  </p>

                  {/* Audience Demographics */}
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Audience:</span> {creator.audience_demographics}
                  </p>

                  {/* Outreach Angle */}
                  {creator.outreach_angle && (
                    <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100">
                      <p className="text-xs text-emerald-900">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        <span className="font-semibold">Outreach Angle:</span> {creator.outreach_angle}
                      </p>
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No creators match your filters. Try adjusting your selection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            Data compiled from Instagram analytics and sustainability research • April 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
