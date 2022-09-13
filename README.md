
# Student Reports Website


## https://reports-saraht04.vercel.app/


# Overview dan Purpose

Website ini dibangun sebagai latihan self-project Sarah. Website ini mencakup user authentication, admin configuration, route protection, dan data-sharing.

Tujuan dari website ini adalah untuk membaca laporan yang telah dibuat, serta membuat laporan setiap murid pada kelas. 


# Technology yang Dipakai



1. Next.js for website framework
2. ChakraUI for most of the website UI.
3. MongoDB for the database.
4. Vercel for website deployment.


# Detail Website

[[LINK]](https://reports-saraht04.vercel.app/)

Landing page dari website ini ada 2, yaitu ‘/authentication’ pada user yang belum login (user harus login terlebih dahulu untuk bisa menggunakan website) dan ‘/’ dimana ada 4 tombol tersedia. 

User yang merupakan seorang admin dapat mengakses bagian admin dari website dan melakukan konfigurasi admin serta melakukan semua hal user biasa dapat lakukan.

User yang bukan merupakan seorang admin dapat menulis laporan, dan membaca laporan yang telah dibuat.

Dalam menulis laporan, ada 4 form-field yang harus diisi, nama kelas (sudah ditambahkan terlebih dahulu), tanggal dan jam kelas, nama murid, serta komentar yang mereka punyai. 3 form-field optional adalah untuk menulis kelemahan, kekuatan, dan apa yang bisa ditingkatkan oleh murid.

Dalam melihat laporan, user bisa melihat laporan yang telah mereka buat. Fitur ‘Load More’ tersedia pada laporan.

Dalam website admin, admin dapat melihat laporan dari informasi kelas atau dari nama coach. Admin juga dapat menambah nama kelas.


# Cara Menggunakan

Register terlebih dahulu pada website. Secret Key nya adalah: ‘ILOVECOACH7’ untuk user biasa dan ‘!!ADMIN123__’ untuk user admin.

Atau dapat login menggunakan username: ‘sarah’ dengan password: ‘iliketurtles’

Tekan tombol yang tersedia pada layar untuk membawa anda ke rute website tujuan.


# Komentar

UI masih agak kurang intuitif.
/admin/class tidak tersortir.