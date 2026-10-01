-- Data contoh (fiktif) untuk demo. Jalankan di Supabase > SQL Editor SETELAH database-schema.sql.
-- Gambar dan logo bisa ditambahkan lewat dashboard (menu Edit).
insert into public.services (name, description) values
 ('Digital Archive','Pemindaian, pengindeksan, dan penyimpanan dokumen fisik menjadi arsip digital yang mudah dicari.'),
 ('Web Development','Pembuatan website perusahaan, portal informasi, dan aplikasi web sesuai kebutuhan.'),
 ('Information System','Perancangan sistem informasi untuk data kepegawaian, surat, dan layanan.'),
 ('Document Management','Pengaturan alur, hak akses, dan versi dokumen agar tetap tertib dan aman.'),
 ('IT Consultation','Pendampingan memilih dan menerapkan teknologi yang tepat untuk organisasi.');
insert into public.events (title, description, event_date) values
 ('Workshop Digitalisasi Arsip','Pelatihan pemindaian dan pengelolaan dokumen untuk staf administrasi.','2026-02-14'),
 ('Seminar Transformasi Digital','Diskusi penerapan sistem informasi di instansi dan usaha kecil.','2026-03-21'),
 ('Open House Archiva','Kunjungan ke kantor dan demo layanan Archiva.','2026-04-30');
insert into public.clients (name) values
 ('Dinas Arsip Kota Contoh'),('PT Nusa Dokumen'),('Yayasan Cahaya Ilmu'),('CV Sinar Data'),
 ('Koperasi Maju Bersama'),('Klinik Sehat Sentosa'),('Sekolah Harapan Bangsa'),('PT Logistik Andalan');
