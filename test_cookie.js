const puppeteer = require('puppeteer');         // Puppeteerモジュールのロード
const fs = require('fs');                       // fsモジュールのロード

// 指定時間待機する関数
async function sleep_ms(delay_ms) {
    console.log( (delay_ms / 1000.0) + '秒待機します。');
    return new Promise(resolve => setTimeout(resolve, delay_ms));
}

(async () => {

    const browser = await puppeteer.launch({    // ブラウザを開く
        headless: false,                            // ヘッドレスモード [true/false/'new']
        slowMo : 10,	                            // 目視確認用に操作遅延（ms）
    });
    const page = await browser.newPage();           // 新規タブ(ページ)
    
    if ( process.argv[2] == null ) {
        console.log('> node test_cookie.js 0　を実行すると、10秒後にCookieを保存して終了します。');
        console.log('> node test_cookie.js 1　を実行すると、保存したCookieをロードします。');
    }

    // -----------------------------------------------------------
    // Cookieの読込み
    if ( process.argv[2] == 1 ) {
        try {
            const cookies_path = __dirname + '/cookies.json';
            const cookies = JSON.parse(fs.readFileSync(cookies_path, 'utf-8'));
            for (let cookie of cookies) {
                await page.setCookie(cookie);
            }
            console.log('> Cookiesを読み込みました。');
        } catch(e) {
            console.log('> Cookiesを読み込めません。');
        }
    }
    // -----------------------------------------------------------
    // Cookieのテストページに移動
    await page.goto('https://www.tohoho-web.com/cgi/wwwcook.cgi');

    // -----------------------------------------------------------
    // Cookieの保存
    if ( process.argv[2] == 0 ) {
        
        await page.reload();        // 2回目のアクセス
        await page.reload();        // 3回目のアクセス
        await page.reload();        // 4回目のアクセス

        await sleep_ms(10*1000);    // 10秒間待機

        const thisCookies = await page.cookies();
        fs.writeFileSync(__dirname + '/cookies.json', JSON.stringify(thisCookies));
        console.log('> Cookiesを保存しました。終了します。');

        await browser.close();      // ブラウザを閉じる

        console.log('> node test_cookie.js 1　を実行すると、保存したCookieをロードします。');
    }
    // -----------------------------------------------------------

})();