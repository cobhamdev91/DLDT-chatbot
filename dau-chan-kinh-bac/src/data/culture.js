/**
 * @file data/culture.js
 * @description Dữ liệu nội dung Văn hóa Kinh Bắc (SSOT): 4 chuyên đề chi
 * tiết (sections – trang /van-hoa/[slug]), 4 trụ cột văn hóa (thẻ lật ở
 * trang /van-hoa), các trải nghiệm gợi ý và danh sách làn điệu cổ.
 */

/**
 * @typedef {Object} CulturePoint
 * @property {string} heading - Tiêu đề mục con.
 * @property {string} content - Nội dung mục con.
 */

/**
 * @typedef {Object} CultureSection
 * @property {string} id     - Slug của trang chi tiết.
 * @property {string} title  - Tiêu đề (có số thứ tự đầu dòng).
 * @property {string} badge  - Nhãn chủ đề.
 * @property {string} image  - Ảnh hero / thẻ liên quan.
 * @property {string} intro  - Đoạn giới thiệu.
 * @property {CulturePoint[]} points - Các mục nội dung chi tiết.
 */

/**
 * @typedef {Object} CultureStat
 * @property {string} id         - Khoá ghép với câu chữ trong locales/vi/culture.js (widgets[id]).
 * @property {string} icon       - Tên icon (components/shared/Icon).
 * @property {number} iconSize   - Kích thước icon (px).
 * @property {'red'|'forest'|'gold'|'gold-dark'} tone - Tông màu icon.
 * @property {number} [end]      - Giá trị đếm tới (bỏ trống = ô không có số).
 * @property {number} [duration] - Thời gian đếm (ms).
 * @property {string} [suffix]   - Hậu tố sau số (vd "+").
 */

/**
 * Cấu hình 4 ô số liệu nhanh ở trang /van-hoa.
 * @type {CultureStat[]}
 */
export const cultureStats = [
  { id: 'heritage', icon: 'Landmark', iconSize: 28, tone: 'red', end: 2009, duration: 2000 },
  { id: 'villages', icon: 'Home', iconSize: 28, tone: 'forest', end: 49, duration: 1500 },
  { id: 'festivals', icon: 'Sparkles', iconSize: 28, tone: 'gold', end: 500, duration: 1800, suffix: '+' },
  { id: 'landmark', icon: 'Music', iconSize: 26, tone: 'gold-dark' },
];

/**
 * Dữ liệu văn hóa.
 * @type {{
 *   sections: CultureSection[],
 *   pillars: Array<{ slug: string, title: string, subtitle: string, desc: string, image: string, tag: string }>,
 *   experiences: Array<{ iconName: string, title: string, desc: string }>,
 *   songs: Array<{ title: string, type: string, dur: string, desc: string }>
 * }}
 */
export const cultureData = {
  /* ===== 4 CHUYÊN ĐỀ CHI TIẾT ===== */
  sections: [
    {
      id: "quan-ho",
      title: "1. Dân ca Quan họ – Hồn cốt Kinh Bắc",
      badge: "Âm Nhạc",
      image: "/images/quan_ho_culture.jpg",
      intro: "Khi nhắc đến văn hóa Kinh Bắc, dân ca Quan họ là một trong những giá trị đặc trưng được nhắc đến nhiều nhất. Quan họ gắn với đời sống cộng đồng của người dân vùng Kinh Bắc và được lưu truyền qua nhiều thế hệ.",
      points: [
        {
          heading: "Di sản văn hóa nhân loại",
          content: "Năm 2009, Dân ca Quan họ Bắc Ninh được UNESCO chính thức ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại. Đây là niềm tự hào to lớn của người dân Kinh Bắc nói riêng và dân tộc Việt Nam nói chung."
        },
        {
          heading: "Nghệ thuật hát đối đáp độc đáo",
          content: "Điểm đặc biệt của Quan họ là hình thức hát đối đáp giữa bên liền anh và bên liền chị. Người hát không chỉ biểu diễn một bài ca hoàn chỉnh mà trao đổi tâm tình, đối đáp ứng biến thông minh, ví von giàu hình ảnh, tạo cảm giác như một cuộc chuyện trò đầy thi vị bằng âm nhạc."
        },
        {
          heading: "Kỹ thuật hát Vang - Rền - Nền - Nảy",
          content: "Để hát được Quan họ chuẩn mực, người nghệ nhân phải rèn luyện công phu kỹ thuật 'Vang - Rền - Nền - Nảy', đưa hơi từ bụng, luyến láy tinh tế nhưng vẫn giữ được độ trong trẻo, đằm thắm đi vào lòng người."
        },
        {
          heading: "Không gian diễn xướng truyền thống",
          content: "Quan họ không bó hẹp trên sân khấu hiện đại mà hòa quyện trong không gian cộng đồng: sân đình, cổng chùa, nhà chứa Quan họ, bến nước, và đặc biệt là Quan họ hát đối trên thuyền rồng bồng bềnh sóng nước hội làng."
        }
      ]
    },
    {
      id: "trang-phuc",
      title: "2. Nét đẹp Trang phục Quan họ",
      badge: "Trang Phục",
      image: "/images/hero_kinh_bac.jpg",
      intro: "Trang phục Quan họ không chỉ là trang phục biểu diễn đơn thuần, mà là một tác phẩm nghệ thuật dệt may truyền thống thể hiện sự tinh tế, chỉn chu và phong thái nho nhã của người Kinh Bắc.",
      points: [
        {
          heading: "Trang phục Liền chị – Duyên dáng nón quai thao",
          content: "Liền chị duyên dáng trong bộ áo mớ ba mớ bảy, áo tứ thân lụa mềm tha thướt nhiều lớp màu sắc phối hợp nhã nhặn, bên trong mặc yếm đào cổ xây, thắt lưng lụa đào buông rủ. Đầu đội khăn mỏ quạ đen tuyền tôn lên làn da trắng và nụ cười tươi tắn, tay cầm chiếc nón quai thao (nón ba tầm) đung đưa sợi chỉ ngũ sắc quai thao buông dài."
        },
        {
          heading: "Trang phục Liền anh – Lịch lãm khăn xếp áo the",
          content: "Liền anh trang trọng, đĩnh đạc trong bộ áo dài năm thân lương the đen hoặc the tím than, bên trong lót áo trắng tinh khôi, quần lụa trắng, đầu đội khăn xếp 40 nếp quấn tròn tỉ mỉ, tay cầm quạt giấy hoặc ô đen thể hiện phong thái người quân tử hào hoa, mực thước."
        },
        {
          heading: "Trang phục gắn liền với đời sống trải nghiệm",
          content: "Đến với các làng Quan họ, du khách có thể khoác lên mình bộ trang phục truyền thống đầy tự hào, đội chiếc nón quai thao và check-in bên những mái đình rêu phong, ao làng sen ngát hương."
        }
      ]
    },
    {
      id: "khong-gian",
      title: "3. Không gian Làng Quan họ & Nhà Chứa",
      badge: "Không Gian",
      image: "/images/craft_village_pottery.jpg",
      intro: "Quan họ sinh ra từ làng, sống trong lòng làng và được nuôi dưỡng bởi mạch nguồn văn hóa cộng đồng bền chặt qua hàng trăm năm.",
      points: [
        {
          heading: "Làng Quan họ gốc",
          content: "Hiện nay Bắc Ninh có 49 làng Quan họ gốc (như Làng Diềm - Viêm Xá, Bùi Xá, Khả Lễ, Đỗ Xá...). Mỗi ngôi làng là một bảo tàng sống lưu giữ hàng trăm làn điệu cổ truyền và truyền thống kết chạ nghĩa tình."
        },
        {
          heading: "Thiết chế Nhà Chứa Quan họ độc nhất vô nhị",
          content: "Nhà chứa Quan họ là không gian sinh hoạt đặc thù của các bọn Quan họ ngày xưa: nơi các liền anh, liền chị gặp gỡ, truyền dạy câu hát cho thế hệ măng non và tiếp đón các 'bọn Quan họ' làng bạn vào mỗi dịp xuân sang hội hè."
        },
        {
          heading: "Thủy tổ Quan họ Làng Diềm",
          content: "Đền Cùng Giếng Ngọc và Đền thờ Đức Vua Bà (Thủy tổ Quan họ) tại làng Diềm là thánh địa tâm linh mà bất kỳ ai yêu mến câu ca Quan họ đều khao khát một lần trong đời về chiêm bái."
        }
      ]
    },
    {
      id: "con-nguoi",
      title: "4. Con người & Cách ứng xử Kinh Bắc",
      badge: "Con Người",
      image: "/images/den_do.jpg",
      intro: "Văn hóa Kinh Bắc tỏa sáng rực rỡ nhất chính ở cốt cách con người: trọng tình trọng nghĩa, hiếu khách, nhã nhặn và tinh tế trong từng lời ăn tiếng nói.",
      points: [
        {
          heading: "Xưng hô 'người ngoan', 'liền anh', 'liền chị'",
          content: "Trong giao tiếp, người Quan họ luôn xưng hô khiêm nhường 'chúng em', gọi bạn hát là 'liền anh', 'liền chị' hay gọi bằng cái tên thân thương 'người ngoan', 'người ơi'."
        },
        {
          heading: "Tục kết chạ kết nghĩa bền chặt",
          content: "Các làng Quan họ kết chạ gắn bó keo sơn qua nhiều đời. Theo lệ tục xưa, nam nữ giữa hai làng kết chạ không kết hôn với nhau để giữ trọn vẹn tình bạn thanh cao, trong sáng 'chơi Quan họ bằng cả tấm lòng'."
        },
        {
          heading: "Miếng trầu têm cánh phượng",
          content: "'Miếng trầu là đầu câu chuyện' – lá trầu không têm hình cánh phượng khéo léo cùng quả cau nhánh vỏ chay thắm đỏ, mời nhau bằng cả hai tay với nụ cười e ấp: 'Trầu này trầu tính trầu tình, ăn vào cho đỏ môi mình môi ta'."
        }
      ]
    }
  ],

  /* ===== 4 TRỤ CỘT VĂN HÓA (thẻ lật trang danh sách) ===== */
  pillars: [
    {
      slug: "quan-ho",
      title: "Lối Hát Giao Duyên Đối Đáp",
      subtitle: "Nghệ thuật ứng tác đỉnh cao",
      desc: "Những câu hát mộc không cần nhạc đệm, thể hiện sự am hiểu điển tích, tình tứ và kính trọng lẫn nhau giữa liền anh liền chị.",
      image: "/images/quan_ho_culture.jpg",
      tag: "Âm Nhạc"
    },
    {
      slug: "trang-phuc",
      title: "Trang Phục Áo Tứ Thân & Nón Quai Thao",
      subtitle: "Nét duyên Kinh Bắc xưa",
      desc: "Áo năm thân the thâm, dải yếm đào hoa sen, nón quai thao che nghiêng duyên dáng tạo nên biểu tượng thanh tao của người quan họ.",
      image: "/images/hero_kinh_bac.jpg",
      tag: "Trang Phục"
    },
    {
      slug: "khong-gian",
      title: "Tục Kết Chạ Nghĩa Tình",
      subtitle: "Chuẩn mực ứng xử hiếu nghĩa",
      desc: "Mối tình kết chạ bền chặt qua nhiều thế hệ giữa các làng quan họ: trọng nghĩa khinh tài, xem nhau như ruột thịt.",
      image: "/images/craft_village_pottery.jpg",
      tag: "Phong Tục"
    },
    {
      slug: "con-nguoi",
      title: "Làng Diềm Thủy Tổ Quan Họ",
      subtitle: "Cội nguồn câu hát ngàn năm",
      desc: "Ngôi làng cổ thờ Đức Vua Bà – Thủy tổ sáng lập làn điệu Quan họ, nơi giếng ngọc nghìn năm nước ngọt lành linh thiêng.",
      image: "/images/den_do.jpg",
      tag: "Cội Nguồn"
    }
  ],

  /* ===== TRẢI NGHIỆM GỢI Ý ===== */
  experiences: [
    {
      iconName: "Music",
      title: "Nghe canh hát Quan họ cổ",
      desc: "Lắng nghe nghệ nhân cất giọng mộc không micro trong không gian nhà chứa Quan họ hoặc sân đình ấm cúng."
    },
    {
      iconName: "Sparkles",
      title: "Mặc thử áo tứ thân & nón quai thao",
      desc: "Trải nghiệm hóa thân thành liền anh, liền chị duyên dáng và lưu lại những khung hình kỷ niệm tuyệt đẹp."
    },
    {
      iconName: "Mic",
      title: "Tập hát đối một câu Quan họ",
      desc: "Học cách lấy hơi, luyến láy và thử hát câu đáp 'Người ở đừng về' cùng các nghệ nhân bản địa."
    },
    {
      iconName: "Leaf",
      title: "Tự tay têm trầu cánh phượng",
      desc: "Học nghệ thuật têm trầu cánh phượng tỉ mỉ và tìm hiểu triết lý giao tiếp thanh lịch của người xưa."
    },
    {
      iconName: "Compass",
      title: "Đi thuyền rồng nghe Quan họ",
      desc: "Ngồi trên thuyền rồng bồng bềnh giữa hồ nước biếc trong các dịp lễ hội rằm tháng Giêng (Hội Lim)."
    },
    {
      iconName: "Home",
      title: "Tản bộ qua những con ngõ cổ",
      desc: "Dạo bước trên đường làng lát gạch nghiêng, ngắm nhìn giếng ngọc, cây đa trăm tuổi và nhà cổ Bắc Bộ."
    }
  ],

  /* ===== LÀN ĐIỆU CỔ (thẻ nghe thử) ===== */
  songs: [
    { title: "Ngồi Tựa Mạn Thuyền", type: "Giọng vặt", dur: "4:15", desc: "Làn điệu mượt mà khắc họa khung cảnh bến đò bến nước trao duyên tình tứ." },
    { title: "Khách Đến Chơi Nhà", type: "Giọng lề lối", dur: "3:50", desc: "Câu hát chào đón nồng hậu, têm trầu mời nước thắm đượm tình người đất Bắc." },
    { title: "Cò Lả Kinh Bắc", type: "Dân ca biến tấu", dur: "3:20", desc: "Giai điệu thanh thoát, bay bổng trên những cánh đồng lúa chín vàng trĩu hạt." },
    { title: "Người Ơi Người Ở Đừng Về", type: "Giọng giã bạn", dur: "5:10", desc: "Lời từ biệt dùng dằng kẻ ở người đi đẫm lệ quyến luyến lúc chia tay canh hát." }
  ]
};
