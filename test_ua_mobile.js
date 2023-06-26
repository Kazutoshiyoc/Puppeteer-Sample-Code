const puppeteer = require('puppeteer');         // Puppeteerモジュールのロード

(async () => {

    const browser = await puppeteer.launch({    // ブラウザを開く
        headless: false,                            // ヘッドレスモード
        slowMo : 10,	                            // 目視確認用に操作遅延（ms）
        args: [                                     // オプション引数
            '--window-size=750,1334',                   // Chromeウィンドウのサイズ
            '--window-position=0,0',                    // Chromeウィンドウのポジション
        ],
    });

    // -----------------------------------------------------------
    // UAの定義
    const mobile = {
        viewport: {
            width: 750,
            height: 1334,
        },
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1 OPT/3.4.0",
    };

    const page = await browser.newPage();       // 新規タブ(ページ)
    await page.emulate(mobile);                 // モバイル表示の設定
    // -----------------------------------------------------------

    await page.goto('https://www.google.com/search?q=puppeteer');

})();