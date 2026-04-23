import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Triết lý Thiết kế: Sự Thanh lịch Dữ liệu-Trước tiên
 * - Hồ sơ người sáng tạo chi tiết với tất cả các chỉ số
 * - Tin nhắn tiếp cận được cá nhân hóa
 * - Chức năng sao chép vào bộ nhớ tạm
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
        if (!response.ok) throw new Error("Không thể tải dữ liệu");
        const data = await response.json();
        const found = data.creators.find((c: Creator) => c.handle === handle);
        setCreator(found || null);
      } catch (error) {
        console.error("Lỗi tải dữ liệu người sáng tạo:", error);
        setCreator(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [handle]);

  const generateOutreachMessage = (creator: Creator) => {
    return `Chào ${creator.name}!

Tôi đã theo dõi công việc tuyệt vời của bạn trong lĩnh vực làm đẹp bền vững và tôi rất ấn tượng với cam kết chân thành của bạn đối với cuộc sống có ý thức về môi trường. ${creator.outreach_angle}

Tôi đại diện cho một thương hiệu chăm sóc da bền vững chia sẻ các giá trị của bạn, và tôi tin rằng khán giả của bạn sẽ thực sự hưởng lợi từ các sản phẩm của chúng tôi. Tôi rất muốn khám phá một hợp tác có ý nghĩa mà cảm thấy chân thực đối với cả hai cộng đồng của chúng ta.

Bạn có sẵn sàng thảo luận về các cơ hội hợp tác không?

Mong được kết nối!`;
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
          <p className="text-gray-600">Đang tải hồ sơ người sáng tạo...</p>
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
              Quay lại Báo cáo
            </Button>
          </Link>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không tìm thấy người sáng tạo</p>
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
      {/* Tiêu đề */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/report">
            <Button variant="ghost" className="text-gray-600 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Báo cáo
            </Button>
          </Link>
        </div>
      </div>

      {/* Nội dung Chính */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cột Trái - Hồ sơ */}
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
                  Xem trên Instagram <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </div>

              {/* Điểm số Phù hợp */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg mb-6 border border-emerald-100">
                <p className="text-xs text-gray-600 mb-1">Điểm số Phù hợp Hợp tác</p>
                <p className={`text-4xl font-bold ${getFitScoreColor(creator.fit_score_calculated)}`}>
                  {creator.fit_score_calculated}
                </p>
                <p className="text-xs text-gray-600 mt-2">Trên 10</p>
              </div>

              {/* Chỉ số Chính */}
              <div className="space-y-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Người theo dõi</p>
                  <p className="text-2xl font-bold text-gray-900">{(creator.followers / 1000).toFixed(0)}K</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Tỷ lệ Tương tác</p>
                  <p className="text-2xl font-bold text-emerald-600">{creator.engagement_rate.toFixed(2)}%</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Chất lượng Khán giả</p>
                  <p className="text-2xl font-bold text-gray-900">{creator.audience_quality}%</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-600 mb-1">Cam kết Bền vững</p>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSustainabilityColor(creator.sustainability_focus)}`}>
                    {creator.sustainability_focus}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Cột Phải - Chi tiết */}
          <div className="md:col-span-2">
            {/* Nội dung & Khán giả */}
            <Card className="p-6 border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Playfair Display" }}>
                Nội dung & Khán giả
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Phong cách Nội dung</h3>
                <p className="text-gray-600">{creator.content_style}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Khán giả Mục tiêu</h3>
                <p className="text-gray-600">{creator.audience_demographics}</p>
              </div>
            </Card>

            {/* Chiến lược Tiếp cận */}
            <Card className="p-6 border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Playfair Display" }}>
                Tiềm năng Hợp tác
              </h2>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-6">
                <h3 className="text-sm font-semibold text-emerald-900 mb-2">Tại sao Hợp tác với {creator.name}?</h3>
                <p className="text-sm text-emerald-800">{creator.outreach_angle}</p>
              </div>

              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tin nhắn Tiếp cận Được đề xuất</h3>
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
                    Đã sao chép vào Bộ nhớ tạm!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Sao chép Tin nhắn
                  </>
                )}
              </Button>
            </Card>

            {/* Sẵn sàng Hợp tác */}
            <Card className="p-6 border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Playfair Display" }}>
                Thông tin Nhanh
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Xếp hạng trong Phân tích</span>
                  <span className="font-semibold text-gray-900">#{creator.rank}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Danh mục Tương tác</span>
                  <span className="font-semibold text-gray-900">
                    {creator.engagement_rate > 10
                      ? "Rất cao"
                      : creator.engagement_rate > 5
                        ? "Cao"
                        : creator.engagement_rate > 3
                          ? "Trung bình"
                          : "Tiêu chuẩn"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tốt nhất cho</span>
                  <span className="font-semibold text-gray-900">
                    {creator.sustainability_focus === "Very High" ? "Hợp tác Chân thực" : "Nội dung Được tài trợ"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Chân trang */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            Phân tích hợp tác dựa trên chỉ số tương tác, chất lượng khán giả, và cam kết bền vững
          </p>
        </div>
      </footer>
    </div>
  );
}
