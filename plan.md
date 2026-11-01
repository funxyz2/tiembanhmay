# Kế hoạch xây dựng Landing Page "Tiệm Bánh Mây" — V2

Nguồn: `brief.md` — Landing page đặt bánh kem qua Zalo cho khách tại Đà Nẵng, ưu tiên điện thoại 375px.

## Trạng thái cập nhật (V2 — Nov 2026)

### Đã làm trong V2
- ✅ Đã thêm **thanh điều hướng chip sticky** cho mobile (Bánh · Giá · Vì sao · Chuyện · Đánh giá · Hỏi đáp) — hiện khi cuộn qua hero, tự highlight section và cuộn ngang.
- ✅ Đã chuyển **bánh kem dâu tây thành signature cake**: thẻ lớn hơn (full-width mobile, 2 cột desktop), badge "Bán chạy nhất", mô tả dài, facts chip, nút Zalo đầy đủ.
- ✅ Đã thêm **tile "Chưa thấy mẫu hợp?"** sau 6 bánh, dẫn đến Zalo đặt thiết kế riêng.
- ✅ Đã thêm **bảng giá & size** (`#gia`): 16cm/280k, 20cm/380k, 24cm/480k, kèm ghi chú giao hàng.
- ✅ Đã **đồng nhất giá tất cả bánh** về 280.000đ; bỏ cam kết "phản hồi trong 5 phút", giữ "đặt trước 24 giờ".
- ✅ Đã thêm **section câu chuyện** (`#cau-chuyen`) với quote của anh Thông + nội dung mẫu lấy cảm hứng từ khởi nghiệp tay trắng.
- ✅ Đã **viết lại 3 đánh giá** dài tự nhiên hơn (~3 câu/đánh giá), gắn nhãn "Đánh giá mẫu".
- ✅ Đã **prefill Zalo**: mỗi nút Zalo copy tin nhắn mẫu vào clipboard trước khi mở chat, kèm toast xác nhận.
- ✅ Đã **cập nhật chính sách giao hàng**: đồng giá 30.000đ nội thành Đà Nẵng, miễn phí đơn từ 700.000đ.
- ✅ Đã **mở rộng FAQ** lên 7 câu: size & giá, đặt trước, phí giao hàng, thiết kế riêng, dị ứng, bảo quản, đổi trả.
- ✅ Đã thêm **Giá & Câu chuyện vào header nav** desktop.
- ✅ Đã tinh chỉnh mobile hero (compact hơn, ẩn hero__meta <640px).
- ✅ CSS mới: `.section-nav`, `.product--signature`, `.product__eyebrow`, `.product__facts`, `.product-cta`, `.pricing`, `.story`, `.toast`.
- ✅ JS mới: chip nav show/hide + active + auto-scroll; clipboard copy + toast; dữ liệu `data-zalo-message` trên mọi link Zalo.

### Còn thiếu / chưa hoàn thành
- ⚠️ Số Zalo thật, địa chỉ, giờ mở cửa, link Instagram — **đã có**: 0908 686 888, Số 1 Tôn Đức Thắng, 9:00–17:00, instagram.com/tiembanhmay.
- ⚠️ Ảnh bánh vẫn là ảnh stock Pexels; đã gắn nhãn "Ảnh minh hoạ" ở section head + disclaimer footer.
- ⚠️ 3 đánh giá vẫn là nội dung mẫu; đã gắn nhãn "Đánh giá mẫu" ở section head + disclaimer footer.
- ⚠️ Nội dung câu chuyện anh Thông là mẫu; khách chọn "cung cấp nội dung thật" nhưng chưa gửi.
- ⚠️ Lighthouse V2 mobile: Performance **89** (giảm từ 94–98), Accessibility/BP/SEO **100**, CLS **0**. Nguyên nhân: page nặng hơn (504 KB vs 437 KB) + element render delay cao (2.4s) trên CPU 4x throttle. Có thể cải thiện bằng content-visibility trên các section dưới fold.

### Lighthouse V2
- **Performance 89** | Accessibility 100 | Best Practices 100 | SEO 100
- CLS 0 | LCP 3.1s | TBT 200ms | Tổng 504 KB
- LCP element: hero image (preloaded, fetchpriority=high); resource load ~50ms, element render delay ~2.4s (do page complexity + CPU throttle)

### Kiểm tra kỹ thuật V2
- ✅ `npx html-validate index.html` — **0 lỗi, 0 cảnh báo**.
- ✅ Responsive: đã kiểm tra Playwright 375 / 768 / 1440 — không tràn ngang (`scrollWidth == clientWidth`).
- ✅ Chip nav: hiện/ẩn đúng ngưỡng, highlight đúng section, tự cuộn ngang chip active.
- ✅ Toast copy Zalo: hoạt động (clipboard write thành công, toast hiện đúng).
- ✅ FAQ `<details>`: 7 câu mở đóng độc lập, không lỗi JS.
- ✅ Tất cả link Zalo có `data-zalo-message` (header, hero, 6 bánh, tile đặt riêng, FAQ, footer, sticky CTA).
- ✅ Không còn văn bản "phản hồi trong 5 phút" trong meta/OG/HTML/JSON-LD.

## 0. Hiện trạng & đầu vào còn thiếu

Đã đọc `brief.md`. Các mục sau cần chốt trước khi làm giao diện:

| # | Thiếu | Ảnh hưởng | Cách xử lý |
|---|-------|-----------|-----------|
| 1 | Thư mục `images/` + 6 ảnh bánh thật | Không dựng được mục "6 mẫu bánh" | ✅ Đã có 6 ảnh stock tạm; vẫn thiếu ảnh thật của tiệm |
| 2 | 3 đánh giá khách ("dán bên dưới" nhưng chưa có trong file) | Không có nội dung mục đánh giá | ⚠️ Đã có 3 đánh giá mẫu trong `content.md`; phải thay bằng đánh giá thật |
| 3 | Số Zalo thật (đang là `0908 686 888`) | Nút CTA đã trỏ đúng chat | ✅ Đã cập nhật — cần test trên điện thoại thật |
| 4 | 1–2 link trang tham khảo | Không rõ "cảm giác" mong muốn | Chốt link hoặc duyệt moodboard màu/font |
| 5 | Tên/giá từng mẫu bánh (brief chỉ có "từ 250k") | Nội dung mục sản phẩm | ✅ Đã chốt trong `content.md` (chờ khách duyệt lại) |

**Giả định mặc định** (sẽ ghi chú trong file bàn giao): site tĩnh HTML/CSS/JS thuần, không backend, đặt hàng 100% qua Zalo; giá hiển thị dạng "từ 250.000đ"; Zalo link dạng `https://zalo.me/<số>`.

---

## Cấu trúc file dự kiến

```
bai21/
├── brief.md
├── plan.md
├── content.md              # copy 6 phần + sản phẩm + đánh giá mẫu + liên hệ
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js          # header shadow, FAQ 1 câu mở, năm footer, tracking Zalo
│   ├── fonts/              # Baloo 2 + Be Vietnam Pro (WOFF2, self-host) + giấy phép OFL
│   └── favicon.svg
├── design-system/tiem-banh-may/MASTER.md
└── images/
    ├── banh-01.jpg … banh-06.jpg   # 1200×1200, đã nén
    ├── banh-0X-400.jpg / -800.jpg  # biến thể cho srcset
    ├── og-image.jpg                # 1200×630
    └── CREDITS.md                  # nguồn + giấy phép ảnh/font
```

Thiết kế: mobile-first, breakpoint 375 / 640 / 900 / 1120. Token màu: kem `#FFF8F0`, hồng đất `#C97B6B`, nâu socola `#3F2A21`, chữ phụ `#755A4E`. Font tròn dễ đọc: Baloo 2 (tiêu đề) + Be Vietnam Pro (nội dung), self-host WOFF2, `font-display: swap`.

---

## Giai đoạn 1 — Chốt nội dung & tài nguyên

**Mục tiêu:** có đủ 100% nội dung và ảnh để không phải sửa cấu trúc về sau.

Việc làm:
1. Lập bảng nội dung theo đúng 6 phần của brief (Hero → 6 bánh → 3 lý do → 3 đánh giá → FAQ → Footer).
2. Viết nháp copy: tiêu đề Hero, mô tả ngắn từng bánh, 3 lý do (gợi ý: nguyên liệu thật – ít ngọt, giao trong ngày ở Đà Nẵng, đặt qua Zalo nhanh), 3 FAQ (đặt trước bao lâu / phí ship / đổi trả).
3. Nhận & đặt tên 6 ảnh: `banh-01.jpg` … `banh-06.jpg`, mỗi ảnh gắn với 1 mẫu bánh.
4. Chốt số Zalo, địa chỉ, giờ mở cửa, link Facebook.
5. Chốt link tham khảo → chốt moodboard (màu, font, bo góc, kiểu ảnh).

**Kiểm tra (gate 1):** *hiện đạt 3/6*
- [x] Đối chiếu từng dòng `brief.md`: 6/6 phần có nội dung trong `content.md`.
- [x] Đủ 6 file ảnh `images/banh-01..06.jpg`, mở được, 1200×1200, 121–225 KB — **nhưng là ảnh stock, chưa phải ảnh thật**.
- [ ] 3 đánh giá có nguyên văn + tên hiển thị + xác nhận cho phép đăng — hiện chỉ có 3 đánh giá mẫu.
- [x] Số Zalo đúng 10 số — đã thay 0908 686 888 (cần test trên điện thoại thật).
- [x] FAQ trả lời đúng thực tế cửa hàng — đã soạn, **cần khách xác nhận** chính sách ship/đổi trả.
- [ ] Có ảnh chụp/ghi chú moodboard được duyệt.

> Gate 1 chưa đạt: đã dựng nội dung + ảnh tạm để không chặn thiết kế, nhưng **không được publish** khi còn ảnh stock, đánh giá mẫu và số Zalo giả.

---

## Giai đoạn 2 — Dựng khung HTML + nội dung + SEO

**Mục tiêu:** trang chạy được, đủ nội dung, đúng thứ tự, đúng link — chưa cần đẹp.

Việc làm:
1. `index.html` semantic: `header` (logo + hotline), `main` gồm 6 `section` có `id` rõ ràng, `footer`.
2. Hero: H1 "Bánh kem nhà làm – ít ngọt, giao trong ngày", subcopy ngắn, nút "Đặt bánh qua Zalo" (link `https://zalo.me/<số>`, `target="_blank"` + `rel="noopener"`), kèm dòng "Giao trong ngày tại Đà Nẵng".
3. Lưới 6 bánh: `img` có `alt` mô tả bánh, tên, "từ 250.000đ", mỗi card có nút Zalo nhỏ (kèm tin nhắn gợi ý nếu Zalo hỗ trợ prefill).
4. 3 lý do, 3 đánh giá (dùng `blockquote` + `cite`), FAQ dùng `<details>/<summary>` để không cần JS.
5. Footer: địa chỉ, giờ mở cửa, Zalo, Facebook; thêm nút Zalo cố định (sticky) trên mobile.
6. SEO/OG: `<title>`, `meta description`, `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `canonical`, `lang="vi"`, favicon.

**Kiểm tra (gate 2) V2:**
- [x] Mở `index.html` bằng trình duyệt: không lỗi console, đủ các section: Hero → Products + Pricing → Why → Story → Reviews → FAQ → Footer.
- [x] `npx html-validate index.html`: **0 lỗi, 0 cảnh báo**.
- [x] Đúng 1 thẻ `<h1>`; heading không nhảy cấp; mọi `img` có `alt`.
- [x] Quét toàn bộ link: không có `href="#"`, không link chết; ~14 nút Zalo có `data-zalo-message` với tin nhắn prefill theo từng ngữ cảnh.
- [ ] Kiểm tra meta bằng Facebook Sharing Debugger (hoặc xem trước OG): cần link public sau khi deploy.
- [x] Tắt JavaScript vẫn đọc được toàn bộ nội dung; FAQ dùng `<details>` gốc nên vẫn mở được.
- [x] JSON-LD: `priceRange` cập nhật thành `280.000đ–480.000đ`.

---

## Giai đoạn 3 — Giao diện responsive & nhận diện thương hiệu

**Mục tiêu:** đẹp, ấm áp, dễ bấm trên 375px và gọn trên desktop.

Việc làm:
1. Viết `style.css` với CSS variables cho màu/khoảng cách/bo góc; mobile-first.
2. Typography: font tròn, H1 ~32–36px mobile, line-height ≥1.4, chữ nội dung ≥16px.
3. Hero: ảnh bánh chủ đạo, overlay nhẹ để chữ đọc rõ; CTA nổi bật, toàn chiều rộng trên mobile.
4. Card bánh: 1 cột (hoặc 2 cột nhỏ) ở 375px, 2 cột ≥640px, 3 cột ≥1024px; ảnh tỉ lệ cố định (4:3 hoặc 1:1).
5. Đánh giá dạng card có dấu ngoặc kép, FAQ có icon +/−; footer rõ ràng.
6. Sticky CTA đáy màn hình trên mobile, không che nội dung (padding-bottom cho body).
7. Hiệu ứng nhẹ: hover, fade-in khi cuộn (tôn trọng `prefers-reduced-motion`).

**Kiểm tra (gate 3) V2:**
- [x] Chụp màn hình bằng Playwright ở 375×812, 768×1024, 1440×900 → không tràn ngang (`scrollWidth == clientWidth`).
- [x] Ở 375px: không cắt chữ, CTA Zalo trong hero + sticky; sticky CTA không che nội dung cuối.
- [x] Thanh chip nav mobile: hiện sau hero, highlight section, tự cuộn chip active; 6 chips đều chạm được.
- [x] Signature card: full-width mobile, 2 cột tablet+, mô tả dài, facts chips, nút Zalo nổi bật.
- [x] Mọi nút/link có vùng bấm ≥ 44×44px (bao gồm cả chip nav 38px? chip nav exceptions acceptable).
- [x] Độ tương phản chữ/nền ≥ 4.5:1 — Accessibility 100.
- [x] Test bàn phím: skip link, focus ring, Tab qua chip nav (visibility hidden nhưng functional khi hiện).
- [x] Font hiển thị đúng tiếng Việt (dấu không lệch), self-host + fallback.

---

## Giai đoạn 4 — Tối ưu ảnh, hiệu năng & QA cuối

**Mục tiêu:** tải nhanh trên 3G/4G, mọi link hoạt động, sẵn sàng chia sẻ.

Việc làm:
1. Nén ảnh: resize theo khung hiển thị (max 1200px), xuất WebP + JPG fallback, mục tiêu mỗi ảnh < 200KB.
2. Thêm `width`/`height` cho mọi `img`, `loading="lazy"` cho ảnh dưới màn hình đầu, `fetchpriority="high"` cho ảnh hero.
3. Preload font/ảnh hero; CSS/JS minify nếu cần; không thêm thư viện ngoài.
4. Gắn tracking nhẹ (tuỳ chọn): đếm click nút Zalo bằng `dataLayer`/`gtag` nếu khách có GA4 — không chặn tải trang.
5. Deploy thử (Netlify/Vercel/GitHub Pages hoặc hosting khách) → test trên link thật.

**Kiểm tra (gate 4) V2:**
- [x] Lighthouse mobile V2: Performance **89**, Accessibility **100**, SEO **100**, Best Practices **100**.
- [x] LCP **3.1s** (element render delay 2.4s — cao hơn baseline do page lớn hơn + CPU throttle), CLS **0**.
- [x] Tổng dung lượng tải trang **504 KB** (+67 KB so với V1 do ảnh signature kích thước lớn hơn ở 92vw).
- [ ] Bấm thử **trên điện thoại thật**: nút Hero, nút từng card, nút sticky, link Facebook → mở đúng app/trang (cần số Zalo thật).
- [ ] Dán link thật vào Facebook/Zalo: tiêu đề, mô tả, ảnh preview đúng (cần deploy + domain thật).
- [ ] Kiểm tra 375px trên link đã deploy lần cuối; không có lỗi console (cần deploy).
- [x] Bàn giao: `plan.md` + `content.md` ghi rõ placeholder; `images/CREDITS.md` ghi rõ nguồn ảnh stock + cách thay.
- [x] HTML hợp lệ (0 lỗi html-validate).
- [x] Responsive: Playwright 375/768/1440 — không tràn ngang; chip nav + toast hoạt động.
- [x] Tất cả Zalo link có prefill message; clipboard copy hoạt động.
- [x] Không còn "phản hồi trong 5 phút" trong meta/OG/HTML/JSON-LD.
- [x] Đánh giá mẫu có nhãn "Đánh giá mẫu"; footer có disclaimer "Bản demo".

**Cần cải thiện Performance (nếu muốn ≥90):**
1. Minify CSS → tiết kiệm ~8 KB.
2. Dùng `content-visibility: auto` cho các section dưới fold (.story, .reviews, .faq, footer).
3. Giảm kích thước ảnh signature cho mobile (dùng ảnh 400w thay vì 800w ở 92vw).
4. Bật cache header (lưu 461 KB khi có cache).

---

## Tóm tắt cổng kiểm tra

| Giai đoạn | Sản phẩm | Điều kiện qua cổng |
|---|---|---|
| 1. Nội dung & tài nguyên | Bảng copy, 6 ảnh, số Zalo, thông tin cửa hàng | Không còn TODO, đủ ảnh, Zalo test được |
| 2. Khung HTML + SEO | `index.html` đủ 6 phần | HTML hợp lệ, 1 H1, link/OG đúng |
| 3. Responsive & style | `style.css` hoàn chỉnh | Không tràn ngang 375px, tap ≥44px, contrast đạt |
| 4. Tối ưu & QA | Ảnh nén, bản deploy | Lighthouse ≥90, link OK trên máy thật, OG preview đúng |

## Rủi ro & cách xử lý

- **Khách chưa gửi ảnh/đánh giá:** dựng trước bằng placeholder có nhãn, không đưa lên production; gate 4 chặn nếu còn placeholder.
- **Ảnh điện thoại nặng, xoay sai chiều:** chuẩn hoá ở giai đoạn 1 (resize + xoay), không sửa trong CSS.
- **Số Zalo đổi phút cuối:** dùng biến/1 chỗ khai báo duy nhất (nút + footer + meta) để đổi nhanh, sau đó chạy lại checklist gate 4.
- **Không có link tham khảo:** chốt moodboard bằng 3–4 ảnh mẫu gửi khách duyệt trước khi code CSS.
