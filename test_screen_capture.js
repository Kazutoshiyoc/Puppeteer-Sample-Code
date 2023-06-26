const puppeteer = require('puppeteer');         // Puppeteerモジュールのロード

(async () => {

    const browser = await puppeteer.launch({    // ブラウザを開く
        headless: true,
        args: [                                     // オプション引数
            '--window-size=1920,1080',                  // Chromeウィンドウのサイズ
        ],
    });
    const page = await browser.newPage();                       // 新規タブ(ページ)
    await page.setViewport({ width: 1920, height: 1080 });      // Viewportの設定
    await page.goto('https://pptr.dev/api/puppeteer.page.screenshot');

    await page.screenshot({ path: 'screen_capture.png' });      // スクリーンキャプチャを保存
    
    await browser.close();                                      // ブラウザを閉じる

})();