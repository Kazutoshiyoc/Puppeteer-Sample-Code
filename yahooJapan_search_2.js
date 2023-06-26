const puppeteer = require('puppeteer');     // Puppeteerモジュールのロード

// 指定時間待機する関数
async function sleep_ms(delay_ms) {
    console.log( (delay_ms / 1000.0) + '秒待機します。');
    return new Promise(resolve => setTimeout(resolve, delay_ms));
}

// Puppeteer制御
(async () => {
    const browser = await puppeteer.launch({        // ブラウザ起動
        headless: false,                                // ヘッドレスモードOFF (Option)
        slowMo: 50,                                     // 動作遅延[ms] (Option)
    });

    const page = await browser.newPage();           // 新規タブ(ページ)
    await page.goto('https://www.yahoo.co.jp/');        // YahooJapanへアクセス
    await page.click('input[type="search"]');           // 検索ボックスをクリック
    await page.type('input[type="search"]', "早稲田");   // 検索キーワードを入力
    await page.click('button[type="submit"]');          // 検索ボタンをクリック

    await sleep_ms(5*1000);                         // 5秒間待機
    await browser.close();                          // ブラウザを閉じる

})();