# Design System — Tiệm Bánh Mây

Nguồn: `brief.md`, `content.md`, và kết quả tra cứu UI UX Pro Max (product: Bakery/Cafe, style: Nature Distilled + Soft UI Evolution, landing: Hero + Social proof + CTA, typography: Vietnamese Friendly).

## 1. Hướng thiết kế

- **Pattern:** Hero-Centric → Sản phẩm → Lý do → Đánh giá → FAQ → Footer. CTA Zalo xuất hiện ở hero, header, từng card bánh, FAQ và sticky bar mobile.
- **Style:** Nature Distilled (ấm, mộc, thủ công) + Soft UI Evolution (shadow mềm, tương phản đủ, chuyển động nhẹ).
- **Từ khoá:** kem, hồng đất, socola, mây, thủ công, gần gũi, đáng tin.
- **Tránh:** gradient tím/xanh AI, neon, brutalist, ảnh bánh tối/mờ, giấu giờ mở cửa.

## 2. Token

### Màu primitive

| Token | Hex | Dùng cho |
|---|---|---|
| `--cream-50` | `#FFFBF7` | nền sáng nhất |
| `--cream-100` | `#FFF8F0` | nền trang |
| `--cream-200` | `#FCEFE4` | section phụ, chip |
| `--cream-300` | `#F4DFCE` | viền mềm |
| `--pink-100` | `#F8E3DC` | avatar, badge |
| `--pink-300` | `#E3A897` | icon, trang trí |
| `--pink-500` | `#C97B6B` | brand, nhấn |
| `--pink-600` | `#A85443` | chữ nhấn, nút phụ (5.23:1 với trắng) |
| `--pink-700` | `#8E4436` | hover, chữ trên nền kem |
| `--choco-900` | `#3F2A21` | chữ chính, nền footer (12.74:1 với kem) |
| `--choco-700` | `#5A4035` | chữ phụ đậm |
| `--choco-500` | `#755A4E` | chữ phụ (5.99:1 với kem) |
| `--gold-500` | `#B0742C` | sao đánh giá (3.9:1 với trắng) |
| `--zalo-500` | `#0068FF` | CTA Zalo (4.75:1 với trắng) |
| `--zalo-600` | `#0052CC` | hover CTA |
| `--white` | `#FFFFFF` | card |
| `--border` | `#EAD9CB` | viền |

### Màu semantic

```css
--color-bg: var(--cream-100);
--color-surface: var(--white);
--color-text: var(--choco-900);
--color-text-muted: var(--choco-500);
--color-primary: var(--pink-600);
--color-primary-hover: var(--pink-700);
--color-accent: var(--gold-500);
--color-border: var(--border);
--color-focus: #6C9BFF;
--color-cta: var(--zalo-500);
--color-cta-hover: var(--zalo-600);
```

### Typography

| Vai trò | Font | Size / line-height |
|---|---|---|
| Display / H1 | Baloo 2 700 | `clamp(2.25rem, 5.2vw, 4rem)` / 1.08 |
| H2 | Baloo 2 700 | `clamp(1.75rem, 3.6vw, 2.75rem)` / 1.15 |
| H3 | Baloo 2 600 | `1.125–1.375rem` / 1.3 |
| Body | Be Vietnam Pro 400 | `1rem` / 1.7 |
| Body nhỏ | Be Vietnam Pro 400 | `0.9375rem` / 1.65 |
| Label / eyebrow | Be Vietnam Pro 600 | `0.75rem`, letter-spacing `.12em`, uppercase |

### Spacing, radius, shadow

- Thang spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px.
- Radius: `10px` (input/chip), `16px` (card nhỏ), `24px` (card lớn), `999px` (nút).
- Shadow: `0 1px 2px rgba(63,42,33,.06), 0 18px 40px -24px rgba(63,42,33,.35)`.
- Container: `min(100% - 32px, 1120px)`; section padding `clamp(56px, 9vw, 96px)`.

### Breakpoint

`375px` (mặc định) → `640px` → `900px` → `1120px`.

## 3. Component

| Component | Quy tắc |
|---|---|
| Header | Sticky, nền kem 85% + blur, cao 68/76px, thêm viền + shadow khi scroll |
| Nút Zalo | Nền `--zalo-500`, chữ trắng, cao ≥52px, icon chat, radius pill |
| Nút phụ | Viền 1.5px `--border`, nền trong, chữ `--choco-900` |
| Product card | Ảnh 1:1, radius 20px, tên + mô tả 2 dòng + giá + link đặt; hover nhấc 2px, ảnh scale 1.04 |
| Reason card | Nền trắng 4% trên nền socola, viền trắng 14%, icon 48px |
| Review card | Trắng, viền, 5 sao vàng, quote, avatar chữ cái đầu |
| FAQ item | `<details>` + `<summary>`, icon +/−, mở 1 câu tại một thời điểm |
| Sticky CTA | Chỉ <900px, cao ~72px + safe-area, có padding-bottom cho body |
| Footer | Nền `--choco-900`, chữ kem, link cao ≥44px |

## 4. Motion

- Hover/focus: 150–250ms `ease-out`.
- Scroll reveal: opacity 0→1, translateY 14px→0, 500ms; chỉ bật khi có JS, tôn trọng `prefers-reduced-motion`.
- Không auto-carousel; đánh giá hiển thị tĩnh.

## 5. Accessibility

- Chữ thường ≥4.5:1; CTA Zalo 4.75:1; chữ chính 12.7:1.
- Tap target ≥44×44px, khoảng cách ≥8px.
- Focus ring 3px màu `--color-focus`, offset 3px.
- Ảnh có alt mô tả; icon trang trí `aria-hidden="true"`.
- Không dùng emoji làm icon; SVG stroke 1.6–2px thống nhất.
- Có skip link, heading đúng cấp, `lang="vi"`.

## 6. Ghi chú triển khai

- Không dùng framework CSS; token nằm trong `assets/css/style.css`.
- Font self-host tại `assets/fonts/`: Baloo 2 (600,700) + Be Vietnam Pro (400,500,600), subset tiếng Việt + Latin, `font-display: swap`.
- Ảnh: `images/banh-0X.jpg` (1200×1200) + biến thể `-400.jpg` / `-800.jpg` cho srcset.
- Ảnh stock và đánh giá mẫu: xem `images/CREDITS.md` và cảnh báo trong `content.md`.
