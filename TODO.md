# TODO - Multi-device sync (Supabase)

## Rencana implementasi (berdasarkan skema default yang disetujui)

### 1) Buat skema tabel Supabase
- `rekap_uang_masuk`
- `pengeluaran_besar`
- `pengeluaran_kecil`
- `saldo`

**Catatan:** perlu kolom `periode_label` dan `created_at` (default timestamptz).

### 2) Update `index.html`
- Tambahkan helper `saveToSupabase()` dan `loadFromSupabase()` untuk masing-masing data.
- Saat upload:
  - Rekap → insert ke `rekap_uang_masuk` (per baris per tanggal)
  - Pengeluaran Besar → insert ke `pengeluaran_besar`
  - Pengeluaran Kecil → insert ke `pengeluaran_kecil`
  - Saldo Awal/Akhir → insert/upsert ke `saldo`
- Saat load awal:
  - load data dari Supabase dan render ulang tab.
  - hitung `updateLaporanKas()` berdasarkan data dari Supabase.

### 3) Fallback offline (opsional)
- Tetap simpan cache localStorage sebagai backup, tapi tampilan utama dari Supabase.

### 4) Testing
- Upload data di device A.
- Buka di device B (pastikan tabel terisi dari Supabase).

## Status
- [x] Validasi penyebab (localStorage-only sebelumnya)
- [x] Skema tabel disetujui (rekap_uang_masuk, pengeluaran_besar, pengeluaran_kecil, saldo)
- [x] Perbaikan kecil di `index.html` (indentation stabil)
- [ ] Implement Supabase sync untuk rekap/pengeluaran/saldo
- [ ] Testing multi-device




