import { test, expect } from '@playwright/test';

test('Go To Garena Job Application Page', async ({ page }) => {
    await page.goto('https://careers.garena.com/global/application/J02167389?src=LinkedIn');
    await expect(page).toHaveURL(/J02167389/);
    // Cari elemen input yang tipe-nya file, lalu set file-nya
    await page.locator('input[type="file"]').first().setInputFiles('C:\\Users\\Nezhio Altelier\\OneDrive\\Documents\\Pribadi\\Resume\\resume nuruzh\\resume 2026\\Resume_Nuruzh Zhohiril Islami_Quality Assurance.pdf');
    
    // Opsional: Tambahkan delay singkat atau assertion untuk memvalidasi nama file sudah muncul di UI
    await expect(page.locator('text=Resume_Nuruzh Zhohiril Islami_Quality Assurance.pdf')).toBeVisible({ timeout: 5000 });
    // 1. Fokuskan dan ketik pelan-pelan agar website sempat memunculkan opsi dropdown
    const courseInput1 = page.getByPlaceholder('Course of Study').nth(0);
    await courseInput1.pressSequentially('Software Engineering', {delay: 100});
    
    // 2. Klik opsi yang muncul dari hasil pencarian dropdown
    // Pastikan huruf besar/kecilnya sesuai dengan yang tampil di website
    await page.getByRole('option', { name: 'Software Engineering' }).click();
    // Fokus ketik pelan-pelan di bagian Degree Classification
    const degreeInput1 = page.getByPlaceholder('Degree Classification').nth(0);
    await degreeInput1.pressSequentially('Others / Not Applicable', {delay: 100});
    
    // klik opsi yang muncul dari hasil pencarian dropdown
    await page.getByRole('option', { name: 'Others / Not Applicable' }).click();
    
    // Transcript on education 1
    // 1. Cari blok education-content yang di dalamnya mengandung teks universitasmu (misal UPI)
    // 1. SIMPAN pembungkus edukasi ke-1 ke dalam variabel
    // 1. (Asumsi kamu sudah menjalankan kode upload Resume Utama di baris sebelumnya)

    // 2. Suruh Playwright MENUNGGU maksimal 15 detik sampai jumlah blok edukasi sesuai resume yang diupload (misal 2 blok)
    await expect(page.locator('.education-content')).toHaveCount(2, { timeout: 15000 });

    // 3. Setelah Playwright memastikan ada 2 blok, SEKARANG kita aman menggunakan nth(0)
    const educationBlock1 = page.locator('.education-content').nth(0);

    // 4. Upload file transkrip ke input yang ada di dalam blok ke-1 tersebut
    await educationBlock1.locator('input[type="file"]').setInputFiles('C:\\Users\\Nezhio Altelier\\OneDrive\\Documents\\Pribadi\\transkrip nilai\\Transkrip Nilai Nuruzh merged.pdf');

    // Education 2 degree classification
    const degreeInput2 = page.getByPlaceholder('Degree Classification').nth(1);
    await degreeInput2.pressSequentially('Others / Not Applicable', {delay: 100});
    await page.getByRole('option', { name: 'Others / Not Applicable' }).click();

    // Transcript on education 2
    // 1. Cari blok education-content yang di dalamnya mengandung teks universitasmu (misal UPI)
    // 1. SIMPAN pembungkus edukasi ke-2 ke dalam variabel
    // 1. (Asumsi kamu sudah menjalankan kode upload Resume Utama di baris sebelumnya)

    // 2. Suruh Playwright MENUNGGU maksimal 15 detik sampai jumlah blok edukasi menjadi 2
    await expect(page.locator('.education-content')).toHaveCount(2, { timeout: 15000 });

    // 3. Setelah Playwright memastikan ada 2 blok, SEKARANG kita aman menggunakan nth(1)
    const educationBlock2 = page.locator('.education-content').nth(1);

    // 4. Upload file transkrip ke input yang ada di dalam blok ke-2 tersebut
    await educationBlock2.locator('input[type="file"]').setInputFiles('C:\\Users\\Nezhio Altelier\\Downloads\\modified sertifikat mcei game designer\\merged Transkrip Nilai Game Design ICEI Nuruzh.pdf');
});