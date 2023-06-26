const puppeteer = require('puppeteer');         // Puppeteerモジュールのロード

(async () => {

    // -----------------------------------------------------------
    // ブラウザの起動
    const browser = await puppeteer.launch({        // ブラウザを開く
        headless: false,                                // ヘッドレスモード [true/false/'new']
        slowMo : 10,	                                // 目視確認用に操作遅延（ms）
        devtools : true,                                // DevToolsの有効化
        ignoreHTTPSErrors : true,                       // SSL認証非対応のサイトの場合にエラーを無視
        product : "chrome",                             // 実行にはchromeかfirefoxが利用可能
        executablePath : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",  // インストール済のChromeやFirefoxを使用する場合はこのオプションで指定
        defaultViewport: { width:1920, height: 1080 },  // Viewportの設定
        args: [                                         // オプション引数
            '--window-size=1920,1080',                      // Chromeウィンドウのサイズ
            '--window-position=0,0',                        // Chromeウィンドウのポジション
        ],
    });
    // -----------------------------------------------------------

    const page = await browser.newPage();                       // 新規タブ(ページ)
    await page.goto('https://devdocs.io/puppeteer/index#puppeteerlaunchoptions');

})();