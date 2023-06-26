const puppeteer = require('puppeteer');     // Puppeteerモジュールのロード

// 指定時間待機する関数
async function sleep_ms(delay_ms) {
    console.log( (delay_ms / 1000.0) + '秒待機します。');
    return new Promise(resolve => setTimeout(resolve, delay_ms));
}

// Puppeteer制御
(async () => {
    const browser = await puppeteer.launch({                // ブラウザ起動
        headless: false,                                        // ヘッドレスモードOFF (Option)
        slowMo: 50,                                             // 動作遅延[ms] (Option)
    });

    const page = await browser.newPage();                   // 新規タブ(ページ)
    await page.goto('https://www.google.com/');                 // Googleへアクセス
    await page.click('textarea[id="APjFqb"]');                  // 検索ボックスをクリック
    await page.type('textarea[id="APjFqb"]', "puppeteer");      // 検索キーワードを入力
    await page.keyboard.press('Enter');                         // Enterキーを押す

    await sleep_ms(20*1000);                                // 20秒間待機
    await browser.close();                                  // ブラウザを閉じる

})();