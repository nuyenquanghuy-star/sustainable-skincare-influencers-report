import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Filter, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Triết lý Thiết kế: Sự Thanh lịch Dữ liệu-Trước tiên
 * - Trực quan hóa dữ liệu tương tác với biểu đồ phân tán
 * - Thẻ người sáng tạo với điểm số phù hợp
 * - Lọc theo cam kết bền vững và tương tác
 * - Góc độ tiếp cận được cá nhân hóa
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
    // Tải dữ liệu từ JSON
    const loadData = async () => {
      try {
        const response = await fetch("/creators_analysis_detailed.json");
        if (!response.ok) throw new Error("Không thể tải dữ liệu");
        const data = await response.json();
        setCreators(data.creators);
        setFilteredCreators(data.creators);
      } catch (error) {
        console.error("Lỗi tải dữ liệu người sáng tạo:", error);
        // Fallback: sử dụng mảng trống
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
          <p className="text-gray-600">Đang tải dữ liệu người sáng tạo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Tiêu đề */}
      <div className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Playfair Display" }}>
            Báo cáo Hợp tác Người sáng tạo
          </h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Phần Hero với Nền */}
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
            Top 20 Người sáng tạo Làm đẹp Bền vững
          </h2>
          <p className="text-gray-600 mb-6">
            Phân tích chi tiết về tỷ lệ tương tác, chất lượng khán giả, cam kết bền vững, và tiềm năng hợp tác.
          </p>

          {/* Bộ lọc */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Bộ lọc:</span>
            </div>

            <div>
              <label className="text-sm text-gray-600 mr-2">Bền vững:</label>
              <select
                value={sustainabilityFilter}
                onChange={(e) => setSustainabilityFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="Very High">Rất cao</option>
                <option value="High">Cao</option>
                <option value="Medium-High">Trung bình-Cao</option>
                <option value="Medium">Trung bình</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mr-2">Tỷ lệ Tương tác:</label>
              <select
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="3">Lớn hơn 3%</option>
                <option value="5">Lớn hơn 5%</option>
                <option value="10">Lớn hơn 10%</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Hiển thị {filteredCreators.length} trên {creators.length} người sáng tạo
          </p>
        </div>
      </section>

      {/* Lưới Người sáng tạo */}
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

                  {/* Chỉ số */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-100">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Người theo dõi</p>
                      <p className="font-semibold text-gray-900">
                        {(creator.followers / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Tương tác</p>
                      <p className="font-semibold text-gray-900">{creator.engagement_rate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Chất lượng Khán giả</p>
                      <p className="font-semibold text-gray-900">{creator.audience_quality}%</p>
                    </div>
                  </div>

                  {/* Huy hiệu Bền vững */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getSustainabilityColor(creator.sustainability_focus)}`}>
                      {creator.sustainability_focus}
                    </span>
                  </div>

                  {/* Phong cách Nội dung */}
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Nội dung:</span> {creator.content_style}
                  </p>

                  {/* Nhân khẩu học Khán giả */}
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Khán giả:</span> {creator.audience_demographics}
                  </p>

                  {/* Góc độ Tiếp cận */}
                  {creator.outreach_angle && (
                    <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100">
                      <p className="text-xs text-emerald-900">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        <span className="font-semibold">Góc độ Tiếp cận:</span> {creator.outreach_angle}
                      </p>
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Không có người sáng tạo phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh lựa chọn.</p>
            </div>
          )}
        </div>
      </section>

      {/* Chân trang */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            Dữ liệu được biên soạn từ phân tích Instagram và nghiên cứu bền vững • Tháng 4 năm 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
