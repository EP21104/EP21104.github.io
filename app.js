const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// CORS設定
app.use(cors());

// 静的ファイルとして画像を提供
app.use("/uploads", express.static("uploads"));

// multerの設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// データを格納する配列（ここではメモリ内）
let markers = [];

// 投稿されたマーカー情報を処理
app.post("/upload", upload.single("image"), (req, res) => {
  const { comment, lat, lng, route } = req.body;

  // 緯度・経度の形式チェックと数値変換
  const latNumber = parseFloat(lat);
  const lngNumber = parseFloat(lng);

  if (isNaN(latNumber) || isNaN(lngNumber)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  // 画像パスを取得
  const imagePath = `/uploads/${req.file.filename}`;
  
  // ルートデータがあればJSONとして解析
  const routeData = route ? JSON.parse(route) : [];

  markers.push({
    comment,
    lat: latNumber,
    lng: lngNumber,
    route: routeData,
    imagePath
  });

  res.json({ success: true });
});

// マーカー情報を取得
app.get("/markers", (req, res) => {
  res.json(markers);
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
