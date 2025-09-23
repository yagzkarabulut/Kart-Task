# Görev: “Card Comparator” — Kart Seç & Karşılaştır SPA

## Kapsam (özeti)

Ekranda bir kart ızgarası (ör: ürünler, karakterler, cihazlar…).

Kullanıcı iki kart seçer (çok seçime izin verme).

Üst çubukta karşılaştırma metriği seçimi (örn. price, rating, speed).

“Karşılaştır” butonuna basınca, kazanan kart görsel/animasyonla vurgulanır; eşitlik varsa “Draw”.

Basit filtre & sıralama (örn. kategori filtresi, rating’e göre azalan).

İsteğe bağlı: JSON yükleyip kendi kart setini ekleyebilme (tamamen client-side).

## Kabul Kriterleri

En fazla iki kart seçilebiliyor; üçüncü seçime izin verilmiyor (bilgilendirici Snackbar).

Metriği (price/rating/speed vb.) değiştirince karşılaştırma yeniden hesaplanıyor.

“Compare” tıklandığında:

Büyük değer “daha iyi” varsayımı (price gibi daha düşük daha iyi istiyorsanız toggle ile tersine çevirme).

Kazanan kart motion.div ile highlight; eşitlikte her ikisi de “Draw” rozeti alır.

Filtre (kategori) ve sıralama (rating desc/asc) anında uygulanır.

JSON yükleme (ops.): Şema geçmezse Zod hata listesi gösterilir, veri uygulanmaz.

## Basit Akış

Kullanıcı kartlara bakar → iki tane seçer.

TopBar’dan metric = rating (varsayılan) ve gerekirse reverse toggle.

Compare tıklar → kazanan animasyonla vurgulanır, üstte WinnerBanner.

Filtre/sort değişince grid yeniden hesaplanır.

(Ops.) “Veri Yükle” ile JSON ekler → Zod doğrular → grid’e eklenir.
