import { test, expect } from '@playwright/test';

test('Go To Garena Job Application Page', async ({ page }) => {
    await page.goto('https://careers.garena.com/global/application/J02167389');
    await expect(page).toHaveURL(/J02167389/);
    // Cari elemen input yang tipe-nya file, lalu set file-nya
    await page.locator('input[type="file"]').first().setInputFiles('E:\\Documents\\Pribadi\\Resume\\resume 2026\\Resume_Nuruzh Zhohiril Islami_Quality Assurance.pdf');
    // Best practice: tambahkan delay singkat untuk memvalidasi nama file sudah muncul di UI
    await expect(page.locator('text=Resume_Nuruzh Zhohiril Islami_Quality Assurance.pdf')).toBeVisible({ timeout: 5000 });
    // 1. Suruh Playwright ketik pelan-pelan agar website sempat memunculkan opsi dropdown
    const courseInput1 = page.getByPlaceholder('Course of Study').nth(0);
    await courseInput1.pressSequentially('Software Engineering', {delay: 100});
    // 2. Klik opsi yang muncul dari hasil pencarian dropdown
    // *Case sensitive, pastikan huruf besar/kecilnya sesuai dengan yang tampil di website
    await page.getByRole('option', { name: 'Software Engineering' }).click();
    // *Fokus ketik pelan-pelan di bagian Degree Classification
    const degreeInput1 = page.getByPlaceholder('Degree Classification').nth(0);
    await degreeInput1.pressSequentially('Others / Not Applicable', {delay: 100});
    // *Klik opsi yang muncul dari hasil pencarian dropdown
    await page.getByRole('option', { name: 'Others / Not Applicable' }).click();
    
    // Transcript on education 1
    // 1. Cari blok education-content yang di dalamnya mengandung teks universitasmu (misal UPI)
    // 1. SIMPAN pembungkus edukasi ke-1 ke dalam variabel
    // 2. Suruh Playwright MENUNGGU maksimal 15 detik sampai jumlah blok edukasi sesuai resume yang diupload (misal 2 blok)
    await expect(page.locator('.education-content')).toHaveCount(2, { timeout: 15000 });
    // 3. Setelah Playwright memastikan ada 2 blok, SEKARANG kita aman menggunakan nth(0)
    const educationBlock1 = page.locator('.education-content').nth(0);
    // 4. Upload file transkrip ke input yang ada di dalam blok ke-1 tersebut
    await educationBlock1.locator('input[type="file"]').setInputFiles('E:\\Documents\\Pribadi\\transkrip nilai\\Transkrip Nilai Nuruzh merged.pdf');
    
    // Education 2 degree classification
    const degreeInput2 = page.getByPlaceholder('Degree Classification').nth(1);
    await degreeInput2.pressSequentially('Others / Not Applicable', {delay: 100});
    await page.getByRole('option', { name: 'Others / Not Applicable' }).click();

    // Transcript on education 2
    // 1. Suruh Playwright MENUNGGU maksimal 15 detik sampai jumlah blok edukasi menjadi 2
    await expect(page.locator('.education-content')).toHaveCount(2, { timeout: 15000 });
    // 2. Setelah Playwright memastikan ada 2 blok, coba pakai nth(1) karena jumlah blok udah sama
    const educationBlock2 = page.locator('.education-content').nth(1);
    // 3. Upload file transkrip ke input yang ada di dalam blok ke-2 tersebut
    await educationBlock2.locator('input[type="file"]').setInputFiles('E:\\Documents\\Pribadi\\transkrip nilai\\merged Transkrip Nilai Game Design ICEI Nuruzh.pdf');
    const skillsToSelect = {
        'Skill 1': 'SQL',
        'Skill 2': 'Javascript',
        'Skill 3': 'Figma',
        'Skill 4': 'HTML/CSS',
        'Skill 5': 'C#',
    }
    const skillInput = page.getByPlaceholder('Skill');
    for (const [skillKey, skillValue] of Object.entries(skillsToSelect)) {
        // Fokuskan kursor ke dalam input
        await skillInput.focus();
        // Ketik nama skill
        await skillInput.pressSequentially(skillValue, { delay: 100 });
        // Jeda untuk menunggu animasi render
        await page.waitForTimeout(500);
        // Tekan Enter
        await skillInput.press('Enter');
        // Jeda untuk tag skill baru
        await page.waitForTimeout(500);
    }
    await skillInput.press('Escape'); // Menghilangkan fokus dari input skill setelah selesai looping

    // Other Information - Sponsorship
    // 1. Cari elemen pembungkus yang mengandung teks pertanyaan, lalu cari dropdown di dalamnya
    const questionContainer = page.locator('div')
    .filter({ hasText: 'Do you need, or will you need in the future, any immigration-related support or sponsorship from us to legally work in the country you are applying to?' })
    .locator('.form-item__select')
    .nth(16); // First() untuk pengaman kalau jika ada lebih dari 1 match di dalam container
    // 2. Klik dropdown
    await questionContainer.click();
    // 3. Pilih opsi "No"
    await page.getByRole('option', { name: 'No', exact: true }).click();

    // Other Information - How did you know about this role?
    // 1. Cari elemen pembungkus yang mengandung teks pertanyaannya, lalu cari dropdown di dalamnya
    // *Kurang lebih stepnya sama dan cukup hardcoded untuk urutan pilihannya karena gak bisa diketik pilihannya
    const questionContainer2 = page.locator('div')
    .filter({ hasText: 'How did you know about this role?' })
    .locator('.form-row.form-row--align-top > div:nth-child(2) > .form-select > .multiselect > .multiselect__tags')
    .getByText('Channel', { exact: true })
    await questionContainer2.click();
    await questionContainer2.focus();
    for (let i = 0; i < 4; i++) {
        await questionContainer2.press('ArrowDown');
    }
    await questionContainer2.press('Enter');
    await page.getByRole('checkbox', { name: 'By proceeding, I confirm that' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
});