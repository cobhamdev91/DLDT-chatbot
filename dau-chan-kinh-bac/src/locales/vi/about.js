/**
 * @file locales/vi/about.js
 * @description Câu chữ trang "Về chúng tôi": hero, sứ mệnh, giá trị cốt lõi, CTA.
 */

export const about = {
  /** Metadata trang */
  meta: {
    title: 'Về chúng tôi – Dấu chân Kinh Bắc',
    description: 'Hành trình số hóa & lan tỏa tình yêu di sản văn hóa miền Quan họ.',
  },

  /** Hero đầu trang */
  hero: {
    title: 'Về Chúng Tôi',
    description: 'Hành trình số hóa & lan tỏa tình yêu di sản văn hóa miền Quan họ',
    imageAlt: 'Dấu chân Kinh Bắc',
    cutoutText: 'KINH BẮC',
  },

  breadcrumb: 'Về chúng tôi',

  /** Khối sứ mệnh */
  mission: {
    eyebrow: 'Sứ Mệnh Của Chúng Tôi',
    title: 'Dấu Chân Kinh Bắc – Kết Nối Quá Khứ & Hiện Đại',
    /** Đoạn giới thiệu chia 3 phần để in đậm tên dự án */
    intro: {
      before: 'Website ',
      strong: 'Dấu Chân Kinh Bắc',
      after:
        ' là dự án cẩm nang du lịch điện tử toàn diện về vùng đất Bắc Ninh. Với mong muốn đưa nét đẹp của những làn điệu dân ca Quan họ, mái chùa cổ Chùa Dâu, Đền Đô, cùng những tinh hoa làng nghề thủ công đến gần hơn với du khách thập phương và thế hệ trẻ.',
    },
  },

  /** Giá trị cốt lõi – khoá khớp data/about.js → aboutValues[].id */
  values: {
    heritage: {
      title: 'Tôn Vinh Di Sản',
      desc: 'Bảo tồn và số hóa các giá trị văn hóa vô giá: Di sản Quan họ, các ngôi chùa cổ kính, và tinh hoa các làng nghề ngàn năm.',
    },
    experience: {
      title: 'Trải Nghiệm Thực Tế',
      desc: 'Cung cấp cẩm nang chi tiết từ phương tiện di chuyển, lộ trình mẫu, cơ sở lưu trú đến ẩm thực đặc trưng của từng vùng miền.',
    },
    trust: {
      title: 'Độ Tin Cậy & Chính Xác',
      desc: 'Mọi thông tin về giá vé, khoảng cách, cung đường và địa chỉ đều được kiểm chứng và cập nhật theo thực tế mới nhất.',
    },
    companion: {
      title: 'Đồng Hành Cùng Du Khách',
      desc: 'Tích hợp trợ lý AI thông minh sẵn sàng giải đáp 24/7 mọi thắc mắc về điểm đến và kế hoạch vi vu Kinh Bắc.',
    },
  },

  /** Hộp kêu gọi hành động */
  cta: {
    title: 'Cùng Dấu Chân Kinh Bắc Khám Phá Ngay Hôm Nay',
    text: 'Khám phá trọn bộ cẩm nang các điểm di tích lịch sử, tinh hoa ẩm thực, văn hóa lễ hội và các làng nghề độc đáo nhất của Bắc Ninh.',
    primary: 'Khám phá Điểm đến',
    secondary: 'Hướng dẫn Di chuyển',
  },
};
