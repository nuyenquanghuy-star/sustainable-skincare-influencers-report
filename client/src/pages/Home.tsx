import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

/**
 * Triết lý Thiết kế: Sự Thanh lịch Dữ liệu-Trước tiên
 * - Thẩm mỹ tối giản, sạch sẽ với điểm nhấn xanh lá
 * - Tập trung vào trực quan hóa dữ liệu và hệ thống thông tin rõ ràng
 * - Typography: Playfair Display (tiêu đề), Inter (nội dung)
 * - Màu sắc: Xanh lá (#10B981), trắng, xám nhạt
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Thanh điều hướng */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-emerald-600" style={{color: '#AE4C29'}}>HYGGE</div>
          <Link href="/report">
            <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">
              Xem Báo cáo
            </Button>
          </Link>
        </div>
      </nav>

      {/* Phần Hero */}
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
              Khám phá Đối tác Sáng tạo Hoàn hảo
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Phân tích toàn diện về 20 người sáng tạo làm đẹp bền vững hàng đầu. Tìm những người sáng tạo phù hợp với giá trị thương hiệu và khán giả của bạn.
            </p>
            <Link href="/report">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                Khám phá Báo cáo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Các Chỉ số Chính */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: "Playfair Display" }}>
            Tổng quan Nghiên cứu
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold">20 Người sáng tạo</h3>
              </div>
              <p className="text-gray-600">Những người sáng tạo làm đẹp và sức khỏe được chọn lọc cẩn thận với 10K-100K người theo dõi</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold">Tương tác Cao</h3>
              </div>
              <p className="text-gray-600">Tỷ lệ tương tác trung bình 9,47% với khán giả có chất lượng trên 70%</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold">Cam kết Bền vững</h3>
              </div>
              <p className="text-gray-600">35% có cam kết bền vững "Rất cao" phù hợp với giá trị thương hiệu của bạn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Phần Kêu gọi Hành động */}
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
            Sẵn sàng Tìm Đối tác Tiếp theo?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Truy cập hồ sơ chi tiết, chỉ số tương tác, góc độ tiếp cận cá nhân hóa, và điểm số sẵn sàng hợp tác cho mỗi người sáng tạo.
          </p>
          <Link href="/report">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              Xem Báo cáo Đầy đủ <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Chân trang */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Báo cáo Hợp tác Đối tác Người sáng tạo Chăm sóc da Bền vững • 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
