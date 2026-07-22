import { test, expect } from '@playwright/test';

test('Garena Job Application', async ({ page }) => {
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

    // upload transkrip nilai UPI
    await page.locator('input[type="file"]').nth(1).setInputFiles('C:\\Users\\Nezhio Altelier\\OneDrive\\Documents\\Pribadi\\transkrip nilai\\Transkrip Nilai Nuruzh merged.pdf');

    await expect(page.locator('text=Transkrip Nilai Nuruzh merged.pdf')).toBeVisible({ timeout: 5000 });

});