export const transportTypes = [
  {
    id: 1,
    slug: "xe-khach-xe-buyt",
    name: "Xe khách & Xe buýt công cộng",
    icon: "🚌",
    category: "Phương tiện công cộng",
    priceRange: "30.000 – 100.000 VNĐ/lượt",
    summary: "Lựa chọn tiết kiệm chi phí tối đa, an toàn và thuận tiện kết nối từ các bến xe Hà Nội về thẳng trung tâm thành phố và các huyện Bắc Ninh.",
    details: "Từ Hà Nội, du khách có thể bắt các tuyến buýt quen thuộc như buýt 54 (Long Biên - TP. Bắc Ninh), buýt 203 (Giáp Bát - Bắc Giang qua Bắc Ninh), buýt 204 (Lương Yên - Thuận Thành) hoặc các chuyến limousine, xe khách chất lượng cao từ bến xe Mỹ Đình, Nước Ngầm.",
    suitableFor: "Sinh viên, khách du lịch một mình, du khách muốn tối ưu ngân sách.",
    pros: ["Chi phí rất rẻ", "Không phải tự lái xe", "Nhiều chuyến liên tục trong ngày (15-20 phút/chuyến)"],
    cons: ["Phụ thuộc vào lộ trình cố định", "Cần bắt thêm taxi/xe ôm từ bến xe đến điểm du lịch"],
    tips: "Hãy chuẩn bị sẵn tiền lẻ và tải các ứng dụng xe buýt (như Tìm Buýt) để theo dõi lộ trình dừng đỗ chính xác."
  },
  {
    id: 2,
    slug: "o-to-ca-nhan",
    name: "Ô tô cá nhân",
    icon: "🚗",
    category: "Phương tiện riêng",
    priceRange: "200.000 – 500.000 VNĐ/chuyến (xăng + phí cao tốc)",
    summary: "Sự lựa chọn hoàn hảo cho các gia đình và nhóm bạn muốn hoàn toàn làm chủ thời gian và tự do kết nối các điểm tham quan liên hoàn.",
    details: "Từ trung tâm Hà Nội theo hướng cầu Thanh Trì hoặc cầu Chương Dương nhập vào Quốc lộ 1A mới (Cao tốc Hà Nội - Bắc Giang) chỉ mất khoảng 40-50 phút lái xe êm ái trên đường cao tốc hiện đại.",
    suitableFor: "Gia đình có người già và trẻ nhỏ, nhóm đồng nghiệp, khách mang theo nhiều hành lý và quà biếu.",
    pros: ["Chủ động lịch trình 100%", "Không gian điều hòa riêng tư, thoải mái", "Chở được nhiều đồ lưu niệm, quà đặc sản"],
    cons: ["Cần tìm hiểu trước chỗ đỗ xe tại các đền chùa vào mùa lễ hội đông đúc"],
    tips: "Trang bị sẵn tài khoản ETC thu phí tự động không dừng khi qua các trạm cao tốc."
  },
  {
    id: 3,
    slug: "xe-may",
    name: "Xe máy phượt tự do",
    icon: "🏍️",
    category: "Phương tiện riêng linh hoạt",
    priceRange: "100.000 – 200.000 VNĐ/ngày (xăng xe)",
    summary: "Dành cho những tâm hồn thích phiêu lưu, luồn lách qua từng ngõ ngách đường làng, bến đò sông Đuống và ngắm nhìn đồng lúa chín vàng.",
    details: "Đi xe máy theo cung đường Quốc lộ 1A cũ qua cầu Đuống, thị xã Từ Sơn để về TP. Bắc Ninh; hoặc men theo đê sông Đuống thơ mộng để ghé Chùa Bút Tháp, Chùa Dâu, Làng Tranh Đông Hồ.",
    suitableFor: "Khách trẻ tuổi, nhóm bạn bè thích trải nghiệm phượt, nhiếp ảnh gia đường phố.",
    pros: ["Cực kỳ linh hoạt, dễ dàng dừng lại check-in bất cứ góc đẹp nào", "Chi phí xăng xe rất thấp", "Dễ dàng luồn lách vào sâu trong các xưởng làng nghề"],
    cons: ["Dễ mệt mỏi khi thời tiết nắng gắt hoặc mưa gió", "Cần tay lái vững khi di chuyển cùng các xe tải lớn trên quốc lộ"],
    tips: "Luôn đội mũ bảo hiểm đạt chuẩn, mang theo áo chống nắng hoặc áo mưa bộ và kiểm tra kỹ lốp xe trước khi lên đường."
  },
  {
    id: 4,
    slug: "taxi-cong-nghe",
    name: "Taxi & Xe công nghệ",
    icon: "🚕",
    category: "Di chuyển nội đô nhanh chóng",
    priceRange: "Tính theo km (khoảng 12.000 – 15.000 VNĐ/km)",
    summary: "Phương án di chuyển tiện nghi nhất giữa khách sạn, nhà hàng, ga tàu và các di tích văn hóa trong khu vực thành phố Bắc Ninh.",
    details: "Tại Bắc Ninh có đầy đủ các hãng taxi uy tín như Taxi Mai Linh Bắc Ninh (0222.3895.895), Taxi Sao Mai (0222.3875.875), Taxi Kinh Bắc cùng các ứng dụng đặt xe công nghệ phổ biến như Grab, Xanh SM, Be.",
    suitableFor: "Khách công tác, nhóm 3–4 người, gia đình đi ăn tối hoặc đi dạo phố buổi tối.",
    pros: ["Nhanh chóng, gọi xe dễ dàng qua điện thoại hoặc app", "Không lo tìm chỗ đỗ xe, có tài xế địa phương rành đường", "Xe mát lạnh, sạch sẽ"],
    cons: ["Chi phí tăng cao nếu đi các cung đường xa ngoài huyện ngoại ô"],
    tips: "Nếu đi nhiều điểm liên tiếp trong ngày, bạn nên thương lượng trọn gói ngày với tài xế taxi để tiết kiệm hơn."
  },
  {
    id: 5,
    slug: "thue-xe-co-lai",
    name: "Xe du lịch đưa đón & Thuê xe riêng",
    icon: "🚐",
    category: "Xe hợp đồng du lịch",
    priceRange: "800.000 – 2.500.000 VNĐ/ngày (xe 4–7–16–29–45 chỗ)",
    summary: "Giải pháp trọn gói, an nhàn cho các đoàn khách đông người, công ty du lịch MICE hoặc các tour hành hương gia đình nhiều thế hệ.",
    details: "Thuê xe hợp đồng trọn gói đón tận nơi tại Hà Nội hoặc Nội Bài, tài xế phục vụ suốt hành trình theo lộ trình do bạn lựa chọn, từ tour di sản văn hóa đến tour sinh thái Tây Yên Tử.",
    suitableFor: "Đoàn khách gia đình đông người, tour công ty, đoàn khảo sát doanh nghiệp.",
    pros: ["Đưa đón tận cửa, không lo lạc đường", "Không gian đồng bộ, thoải mái cho cả đoàn giao lưu", "Linh hoạt tùy chỉnh điểm dừng nghỉ theo nhu cầu"],
    cons: ["Cần lên lịch trình và đặt cọc xe trước vài ngày"],
    tips: "Nên trao đổi rõ ràng với nhà xe về các phụ phí cầu đường, bến bãi đỗ xe và tiền tip cho tài xế trước khi ký hợp đồng."
  },
  {
    id: 6,
    slug: "xe-dien-noi-khu",
    name: "Xe điện & Xe tham quan tại điểm",
    icon: "🛺",
    category: "Phương tiện nội khu sinh thái",
    priceRange: "10.000 – 30.000 VNĐ/lượt hoặc 100.000 – 200.000 VNĐ/xe",
    summary: "Phương tiện xanh, thân thiện môi trường phục vụ trung chuyển tham quan trong các quần thể di tích và khu du lịch sinh thái rộng lớn.",
    details: "Được triển khai tại một số quần thể du lịch lớn như khu di tích Tây Yên Tử, khu du lịch Suối Mỡ hoặc các điểm hành hương nhằm giúp du khách tiết kiệm sức lực đi bộ giữa các phân khu.",
    suitableFor: "Người cao tuổi, trẻ nhỏ, người mang vác lễ vật cúng bái cồng kềnh.",
    pros: ["Thoáng mát, vừa đi vừa ngắm cảnh nhẹ nhàng", "Thân thiện môi trường, không ồn ào khói bụi", "Tiết kiệm thời gian và sức lực đi bộ"],
    cons: ["Chỉ phục vụ trong phạm vi nội bộ từng khu di tích"],
    tips: "Hỏi rõ giá niêm yết tại quầy vé bán xe điện trước khi lên xe."
  },
  {
    id: 7,
    slug: "tau-hoa",
    name: "Tàu hỏa ngắm cảnh",
    icon: "🚂",
    category: "Đường sắt hoài niệm",
    priceRange: "40.000 – 90.000 VNĐ/vé",
    summary: "Hành trình hoài niệm thơ mộng: Không vội vã đến điểm cuối – hãy để chuyến đi bắt đầu ngay từ khung cửa sổ toa tàu đường sắt Bắc Nam cổ kính.",
    details: "Tuyến đường sắt Hà Nội – Đồng Đăng (Lạng Sơn) dừng tại Ga Bắc Ninh và Ga Thị Cầu. Ngồi trên tàu hỏa thong dong ngắm nhìn những cánh đồng xanh, những làng quê cổ kính vùng châu thổ sông Hồng mang lại cảm giác thi vị khác biệt.",
    suitableFor: "Khách thích du lịch chậm (Slow Travel), các bạn trẻ mê phong cách vintage, người muốn trải nghiệm không khí đường sắt xưa.",
    pros: ["Trải nghiệm độc đáo, khác biệt hoàn toàn với ô tô xe máy", "Rất an toàn, thoải mái ngắm cảnh và chụp ảnh check-in", "Không lo ùn tắc giao thông"],
    cons: ["Số chuyến tàu mỗi ngày hạn chế, cần canh đúng giờ tàu chạy"],
    tips: "Ga Bắc Ninh là một trong những ga tàu cổ có kiến trúc rất đẹp, nhớ chụp vài bức ảnh lưu niệm trước khi rời ga."
  },
  {
    id: 8,
    slug: "thue-xe-may-dia-phuong",
    name: "Thuê xe máy tại TP. Bắc Ninh",
    icon: "🛵",
    category: "Dịch vụ thuê xe tự lái",
    priceRange: "100.000 – 150.000 VNĐ/ngày",
    summary: "Tự do tuyệt đối cho khách đi xe khách hoặc tàu hỏa đến Bắc Ninh nhưng muốn có 'đôi chân cơ động' để len lỏi mọi con phố và ngõ xóm.",
    details: "Dịch vụ giao nhận xe tận nơi tại các khách sạn, homestay, bến xe hoặc ga Bắc Ninh. Thủ tục đơn giản: chỉ cần CCCD/hộ chiếu và bằng lái xe máy A1 hợp lệ.",
    suitableFor: "Khách du lịch tự túc đi 1-2 người, các cặp đôi trẻ năng động.",
    pros: ["Chủ động 100%, chi phí siêu rẻ", "Được chủ xe trang bị sẵn 2 mũ bảo hiểm và áo mưa", "Giao nhận xe tận nơi nhanh chóng"],
    cons: ["Tự chịu trách nhiệm về an toàn giao thông và tự đổ xăng"],
    tips: "Hãy kiểm tra phanh, đèn còi, lốp xe và chụp ảnh hiện trạng xe trước khi nhận bàn giao."
  },
  {
    id: 9,
    slug: "xe-dap-trai-nghiem",
    name: "Xe đạp – Trải nghiệm Kinh Bắc sống chậm",
    icon: "🚲",
    category: "Phương tiện sống chậm & xanh",
    priceRange: "Miễn phí tại các homestay / resort hoặc thuê từ 50.000 VNĐ/ngày",
    summary: "Đi chậm hơn để lắng nghe tiếng chuông chùa, ngửi hương sen thơm mát và nhìn thấy những nét đẹp tinh tế mà khi ngồi trên ô tô rất dễ lướt qua.",
    details: "Cực kỳ lý tưởng cho các cung đường làng cổ như Làng Diềm (Thủy tổ Quan họ), ngõ gạch làng gốm Phù Lãng hoặc quanh chân núi Phật Tích thanh bình. Nhiều homestay như Senna, Senvibe đều bố trí sẵn xe đạp miễn phí cho du khách.",
    suitableFor: "Khách yêu thích rèn luyện sức khỏe, du khách quốc tế thích du lịch sinh thái bền vững.",
    pros: ["Không khí trong lành, tăng cường sức khỏe", "Dễ dàng dừng lại trò chuyện cùng các cụ già, liền anh liền chị bên hiên nhà", "Hoàn toàn không xả khí thải"],
    cons: ["Chỉ thích hợp cho cự ly ngắn từ 2–5 km quanh điểm lưu trú"],
    tips: "Thời điểm đạp xe tuyệt nhất là sáng sớm tinh sương từ 6h00–7h30 hoặc chiều tà hoàng hôn từ 16h30–18h00."
  }
];

export const itineraries = [
  {
    id: 1,
    title: "Đi Kinh Bắc tiết kiệm",
    icon: "🎒",
    target: "Sinh viên & Khách du lịch phượt",
    route: "Hà Nội → Xe khách / xe buýt 54 → Thuê xe máy tại bến → Khám phá ẩm thực & di tích → Chiều về lại Hà Nội",
    highlight: "Chi phí trọn gói dưới 250.000 VNĐ/người cho một ngày trải nghiệm phong phú."
  },
  {
    id: 2,
    title: "Kinh Bắc cùng gia đình ấm áp",
    icon: "👨‍👩‍👧‍👦",
    target: "Gia đình nhiều thế hệ & trẻ nhỏ",
    route: "Hà Nội → Ô tô riêng cao tốc → Đền Đô → Làng Diềm thưởng thức Quan họ → Văn Miếu Bắc Ninh → Khách sạn 4-5 sao → Hôm sau thăm Chùa Phật Tích",
    highlight: "Thư thả, không mệt mỏi, kết hợp nghỉ dưỡng và giáo dục lịch sử cho con trẻ."
  },
  {
    id: 3,
    title: "Một ngày rong ruổi Kinh Bắc",
    icon: "🏍️",
    target: "Các bạn trẻ yêu thích tự do & văn hóa truyền thống",
    route: "Xe máy dọc đê sông Đuống → Đền Đô → Chùa Dâu → Chùa Bút Tháp → Làng tranh Đông Hồ → Ăn nem bùi & bánh phu thê",
    highlight: "Chạm vào những di sản ngàn năm và cảnh sắc sông Đuống huyền thoại."
  },
  {
    id: 4,
    title: "Kinh Bắc xanh & Sinh thái",
    icon: "🌲",
    target: "Những người yêu thiên nhiên và trekking",
    route: "Ô tô riêng → Chùa Vĩnh Nghiêm → Quần thể Tây Yên Tử → Cắm trại Cao nguyên Đồng Cao → Suối Mỡ / Khe Rỗ",
    highlight: "Không khí núi rừng trong lành, biển mây bồng bềnh và cảnh quan hoang sơ hùng vĩ."
  },
  {
    id: 5,
    title: "Kinh Bắc Gen Z – Check-in & Chill",
    icon: "📸",
    target: "Giới trẻ, cặp đôi mê nhiếp ảnh",
    route: "Xe buýt từ Hà Nội → Check-in Jungle House / Homestay 21 Cinema → Cà phê view phố → Thưởng thức phở gan cháy → Check-in làng gốm Phù Lãng",
    highlight: "Album ảnh sống ảo triệu view đậm chất thơ và trải nghiệm ẩm thực trendy."
  }
];

export const safetyRules = [
  {
    title: "Kiểm tra thời tiết & cung đường",
    desc: "Trước mỗi hành trình, hãy theo dõi dự báo thời tiết, đặc biệt nếu bạn đi các cung đường đồi núi như Tây Yên Tử, Khe Rỗ hay Đồng Cao."
  },
  {
    title: "An toàn giao thông là trên hết",
    desc: "Khi đi xe máy bắt buộc phải đội mũ bảo hiểm đạt chuẩn, cài quai chắc chắn; khi ngồi trên ô tô phải thắt dây an toàn ở tất cả các vị trí."
  },
  {
    title: "Tốc độ và khoảng cách an toàn",
    desc: "Không phóng nhanh vượt ẩu trên các tuyến quốc lộ có nhiều xe container; giảm tốc độ và bấm còi cảnh báo khi vào các đường làng ngõ xóm quanh co."
  },
  {
    title: "Dự phòng thời gian di chuyển",
    desc: "Thời gian hiển thị trên bản đồ chỉ là ước tính lý tưởng; vào các dịp cuối tuần và lễ hội đầu năm, hãy dự trù thêm 30-45 phút do lưu lượng phương tiện tăng cao."
  },
  {
    title: "Giữ gìn vệ sinh và cảnh quan",
    desc: "Bảo vệ môi trường sinh thái xanh Kinh Bắc, không vứt rác thải nhựa bừa bãi tại các điểm dừng chân trên đường di chuyển."
  }
];
