const puppeteer = require('puppeteer');     // Puppeteerモジュールのロード

(async () => {
    const browser = await puppeteer.launch({    // ブラウザ起動
        headless: false,                            // ヘッドレスモードOFF (Option)
        slowMo: 1000,                               // 動作遅延[ms] (Option)
    });

    const page = await browser.newPage();       // 新規タブ(ページ)
    await page.goto('https://pptr.dev/');       // 指定のURLに移動

    await browser.close();                      // ブラウザを閉じる
    
})();