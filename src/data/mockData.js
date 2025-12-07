// src/data/mockData.js

/**
 * Data tiruan untuk produk-produk yang disewakan.
 * Disesuaikan untuk pasar Indonesia (khususnya Jakarta) dengan bahasa yang lebih santai.
 * GAMBAR TELAH DIPERBAIKI MENGGUNAKAN PLACEHOLDER YANG STABIL.
 */
export const mockProducts = [
  { 
    id: '1', 
    name: 'Sewa NMAX Harian, Siap Nemenin Wara-wiri Jakarta', 
    category: 'Kendaraan', 
    description: 'Butuh motor gesit buat selap-selip di kemacetan Jakarta? NMAX ini jawabannya! Irit, nyaman, bagasi luas. Udah termasuk 2 helm SNI & jas hujan. Siap gas!', 
    pricePerDay: 90000, 
    imageUrl: '/Nmax.jpg', 
    location: 'Jakarta Selatan', 
    availability: true, 
    owner: 'JuraganSewa Motor', 
    rating: 4.9, 
    reviews: 58, 
    specs: { Brand: 'Yamaha', Model: 'NMAX Connected', Tahun: '2023', Kelengkapan: '2 Helm, 1 Jas Hujan' } 
  },
  { 
    id: '2', 
    name: 'Kamera Mirrorless Sony A6400 Buat Konten Kece', 
    category: 'Elektronik', 
    description: 'Upgrade kontenmu pake kamera ini! Autofokusnya cepet banget, cocok buat vlog atau foto-foto estetik. Udah dapet lensa kit, tinggal pake aja. Gampang kok pakenya!', 
    pricePerDay: 200000, 
    imageUrl: '/Kamera.jpg', 
    location: 'Jakarta Barat', 
    availability: true, 
    owner: 'KameraKita', 
    rating: 4.8, 
    reviews: 32, 
    specs: { Brand: 'Sony', Model: 'Alpha a6400', Lensa: '16-50mm Kit', Resolusi: '24.2MP' } 
  },
  { 
    id: '3', 
    name: 'Kosan Eksklusif Deket MRT Lebak Bulus', 
    category: 'Properti', 
    description: 'Cari kosan nyaman dan strategis? Di sini tempatnya! Kamar fully furnished, ada AC, WiFi kenceng, kamar mandi dalem. Tinggal bawa koper aja. Jalan kaki ke MRT!', 
    pricePerDay: 150000, 
    imageUrl: '/Kosan.jpg', 
    location: 'Jakarta Selatan', 
    availability: true, 
    owner: 'Ibu Kos Bintaro', 
    rating: 4.6, 
    reviews: 25, 
    specs: { Tipe: 'Kamar Kos', AC: 'Ya', WiFi: 'Ya', 'Kamar Mandi': 'Dalam', Perabot: 'Lengkap' } 
  },
  { 
    id: '4', 
    name: 'Paket Nobar (Proyektor Full HD + Layar)', 
    category: 'Hobi & Acara', 
    description: 'Bikin acara di rumah jadi seru! Paket sewa proyektor jernih Full HD plus layar gede 70 inch. Cocok buat nobar bola, nonton film, atau main game bareng temen-temen.', 
    pricePerDay: 180000, 
    imageUrl: '/Proyektor.jpg', 
    location: 'Bekasi', 
    availability: true, 
    owner: 'LayarTancep Modern', 
    rating: 4.7, 
    reviews: 41, 
    specs: { Item: 'Proyektor & Layar', Kecerahan: '3500 Lumens', Konektivitas: 'HDMI, USB', Ukuran_Layar: '70 inch' } 
  },
  { 
    id: '5', 
    name: 'Sewa Kebaya Modern untuk Wisuda & Kondangan', 
    category: 'Pakaian', 
    description: 'Tampil anggun di hari spesialmu! Kebaya modern dengan desain kekinian, bahan adem dan nyaman. Banyak pilihan warna. Udah satu set sama rok batiknya lho.', 
    pricePerDay: 175000, 
    imageUrl: '/Kebaya.jpeg', 
    location: 'Depok', 
    availability: false, 
    owner: 'Butik Bidadari', 
    rating: 4.9, 
    reviews: 63, 
    specs: { Ukuran: 'All size (M-L)', Warna: 'Rose Gold', Bahan: 'Brokat & Tulle' } 
  },
  { 
    id: '6', 
    name: 'Koper Kabin Kece Buat Liburan Singkat', 
    category: 'Peralatan', 
    description: 'Ngapain beli koper mahal buat liburan sekali-sekali? Sewa aja! Koper ukuran kabin, roda 360 derajat, enteng didorong. Muat banyak buat traveling 2-3 hari.', 
    pricePerDay: 50000, 
    imageUrl: '/Koper.jpeg', 
    location: 'Tangerang', 
    availability: true, 
    owner: 'SewaKoper Aja', 
    rating: 4.5, 
    reviews: 30, 
    specs: { Ukuran: '20 inch (Kabin)', Roda: '4 Roda (360°)', Bahan: 'Hard Case Polycarbonate' } 
  },
  { 
    id: '7', 
    name: 'Drone DJI Mini 2, Gampang Diterbangin Pemula', 
    category: 'Hobi & Acara', 
    description: 'Bikin video sinematik dari udara! Drone ini kecil, enteng, dan gampang banget kontrolnya, bahkan buat yang baru pertama kali. Kualitas videonya udah 4K, mantap!', 
    pricePerDay: 175000, 
    imageUrl: '/Drone.jpg', 
    location: 'Jakarta Pusat', 
    availability: true, 
    owner: 'Terbangin Drone', 
    rating: 4.8, 
    reviews: 28, 
    specs: { Brand: 'DJI', Model: 'Mini 2', 'Resolusi Video': '4K/30fps', 'Waktu Terbang': '~30 menit' } 
  },
  { 
    id: '8', 
    name: 'Sepeda Lipat Element, Gowes Santai di CFD', 
    category: 'Kendaraan', 
    description: 'Weekend enaknya gowes! Sewa sepeda lipat ini, praktis dibawa masuk MRT atau mobil. Enteng, nyaman, dan pastinya bikin kamu makin hits di Car Free Day.', 
    pricePerDay: 60000, 
    imageUrl: '/Sepeda.jpg', 
    location: 'Jakarta Pusat', 
    availability: true, 
    owner: 'Gowes Kuy', 
    rating: 4.7, 
    reviews: 51, 
    specs: { Brand: 'Element', Tipe: 'Sepeda Lipat', Kecepatan: '8 Speed', 'Ukuran Roda': '20 inch' } 
  }
];

// Mengubah dari `const` menjadi `let` agar bisa diubah
export let mockReviews = {
    '1': [
        { id: 'r1-1', author: 'Budi', rating: 5, comment: 'Motornya mulus banget, tarikannya enteng. Penjualnya ramah, prosesnya cepet. Recommended!', type: 'positive' },
        { id: 'r1-2', author: 'Rina', rating: 4, comment: 'Overall oke, cuma jas hujannya agak kecil aja hehe. Tapi motornya mantap!', type: 'neutral' },
    ],
    '2': [
        { id: 'r2-1', author: 'ContentCreatorHits', rating: 5, comment: 'Gila, autofokusnya beneran dewa. Bikin vlog jadi gampang banget. Barangnya juga bersih kaya baru.', type: 'positive' },
        { id: 'r2-2', author: 'Anak DKV', rating: 4, comment: 'Baterainya dapet satu, jadi harus pinter-pinter manage. Tapi buat kualitas gambar, ga ada lawan sih.', type: 'neutral' },
    ],
    '3': [
        { id: 'r3-1', author: 'Pekerja Kantoran', rating: 5, comment: 'Sesuai deskripsi, tinggal jalan kaki ke stasiun MRT. Kamarnya bersih, ibu kosnya juga baik. Betah!', type: 'positive' },
    ],
    '4': [
        { id: 'r4-1', author: 'Ayu', rating: 5, comment: 'Gambarnya jernih banget! Nobar final liga champion jadi berasa di stadion. Mantap!', type: 'positive' },
    ],
    '5': [
        { id: 'r5-1', author: 'Lina Wisudawati', rating: 5, comment: 'Kebaya-nya cantik banget, pas di badan. Banyak yang muji. Makasih banyak ya!', type: 'positive' },
    ],
    '6': [
        { id: 'r6-1', author: 'Traveler Dadakan', rating: 5, comment: 'Ngebantu banget buat trip singkat. Ga perlu beli. Kopernya juga enteng. Sip!', type: 'positive' },
    ],
    '7': [
        { id: 'r7-1', author: 'Dono', rating: 4, comment: 'Agak deg-degan nerbangin pertama kali, tapi ternyata gampang. Hasil videonya stabil dan keren.', type: 'positive' },
    ],
    '8': [
        { id: 'r8-1', author: 'Goweser CFD', rating: 5, comment: 'Sepedanya enak, lipetannya juga gampang. Jadi ga ribet pas mau naik KRL. Bakal sewa lagi minggu depan!', type: 'positive' },
    ]
};

// Fungsi untuk menambahkan ulasan baru secara dinamis
export const addMockReview = (productId, newReview) => {
    if (!mockReviews[productId]) {
        mockReviews[productId] = [];
    }
    // Tambahkan ulasan baru ke awal array agar muncul paling atas
    mockReviews[productId].unshift(newReview);
};


export const categories = ['Properti', 'Elektronik', 'Kendaraan', 'Pakaian', 'Peralatan', 'Hobi & Acara'];
