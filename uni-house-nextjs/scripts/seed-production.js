const { MongoClient } = require('mongodb');

// Thay MONGODB_URI này bằng connection string của production
const PRODUCTION_MONGODB_URI = process.env.MONGODB_URI || 'YOUR_PRODUCTION_MONGODB_URI_HERE';

const services = [
  {
    id: 1,
    title: "GIA CÔNG CẮT LASER CNC",
    description: "Việc nhập về máy gia công cắt laser đã giúp cho Khách hàng có quy trình khép kín từ việc cung cấp phôi thô cho đến gia công.",
    color: "from-red-600 to-orange-500",
    features: [
      "Độ chính xác cao",
      "Tốc độ nhanh",
      "Biên dạng phức tạp"
    ],
    image: "/icons/services/gcls.png",
    detailContent: "<h1>GIA CÔNG CẮT LASER CNC</h1><p>Dịch vụ cắt laser CNC chuyên nghiệp với độ chính xác cao.</p>"
  },
  {
    id: 2,
    title: "GIA CÔNG PHAY VÀ MÀI 6 MẶT",
    description: "Gia công phay và mài cho độ phẳng và độ song song cao.",
    color: "from-blue-600 to-blue-800",
    features: [
      "Độ phẳng cao",
      "Bề mặt đẹp",
      "Kích thước chính xác"
    ],
    image: "/icons/services/phay1.png",
    detailContent: "<h1>GIA CÔNG PHAY VÀ MÀI 6 MẶT</h1><p>Dịch vụ phay và mài 6 mặt chuyên nghiệp.</p>"
  },
  {
    id: 3,
    title: "GIA CÔNG CẮT CƯA THÉP",
    description: "Đội ngũ kinh nghiệm, sản phẩm chính xác với thiết kế thông minh.",
    color: "from-green-600 to-green-800",
    features: [
      "Dung sai chặt",
      "Bền bỉ",
      "Vật liệu đa dạng"
    ],
    image: "/icons/services/tb6.png",
    detailContent: "<h1>GIA CÔNG CẮT CƯA THÉP</h1><p>Dịch vụ cắt cưa thép chuyên nghiệp.</p>"
  },
  {
    id: 4,
    title: "XỬ LÝ NHIỆT - NHIỆT LUYỆN",
    description: "Tư vấn & hỗ trợ tối đa để sản phẩm đạt chất lượng tốt nhất.",
    color: "from-orange-600 to-red-600",
    features: [
      "Tôi – Ram",
      "Thấm Cacbon",
      "Cải thiện cơ tính"
    ],
    image: "/icons/services/n1.png",
    detailContent: "<h1>XỬ LÝ NHIỆT - NHIỆT LUYỆN</h1><p>Dịch vụ xử lý nhiệt chuyên nghiệp.</p>"
  },
  {
    id: 5,
    title: "GIA CÔNG CẮT PLASMA",
    description: "Cắt chính xác – ưu tiên hàng đầu của chúng tôi.",
    color: "from-purple-600 to-blue-600",
    features: [
      "Tấm lớn",
      "Dày vật liệu",
      "Chi phí tối ưu"
    ],
    image: "/icons/services/plasma.jpg",
    detailContent: "<h1>GIA CÔNG CẮT PLASMA</h1><p>Dịch vụ cắt plasma chuyên nghiệp.</p>"
  },
  {
    id: 6,
    title: "GIA CÔNG OXY GAS – CNC",
    description: "Cung cấp sắt thép tốt nhất của các nước tiên tiến với thời gian ngắn.",
    color: "from-yellow-600 to-amber-600",
    features: [
      "Nguồn gốc rõ ràng",
      "Chất lượng đảm bảo",
      "Giá cả cạnh tranh"
    ],
    image: "/icons/services/oxy.png",
    detailContent: "<h1>GIA CÔNG OXY GAS – CNC</h1><p>Dịch vụ oxy gas CNC chuyên nghiệp.</p>"
  }
];

async function seedProduction() {
  if (!PRODUCTION_MONGODB_URI || PRODUCTION_MONGODB_URI === 'YOUR_PRODUCTION_MONGODB_URI_HERE') {
    console.error('❌ Please set MONGODB_URI environment variable or update PRODUCTION_MONGODB_URI in this script');
    console.log('\nUsage:');
    console.log('  MONGODB_URI="your_production_uri" node scripts/seed-production.js');
    process.exit(1);
  }

  const client = new MongoClient(PRODUCTION_MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to Production MongoDB');

    const db = client.db();
    const collection = db.collection('services');

    // Clear existing services
    const deleteResult = await collection.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing services`);

    // Insert new services
    const result = await collection.insertMany(services);
    console.log(`✅ Inserted ${result.insertedCount} services`);

    // Verify
    const count = await collection.countDocuments();
    console.log(`📊 Total services in production database: ${count}`);

    // List all services
    const allServices = await collection.find({}).toArray();
    console.log('\n📋 Services in database:');
    allServices.forEach(s => {
      console.log(`  - ${s.id}: ${s.title}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

seedProduction();
