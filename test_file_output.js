const puppeteer = require('puppeteer');         // Puppeteerモジュールのロード
const fs = require('fs');                       // fsモジュールのロード

(async () => {

    const browser = await puppeteer.launch({    // ブラウザを開く
        headless: false,                            // ヘッドレスモード [true/false/'new']
        slowMo : 10,	                            // 目視確認用に操作遅延（ms）
    });
    const page = await browser.newPage();                       // 新規タブ(ページ)
    await page.goto('https://phantomjs.org/examples');

    // ブラウザ上で指定のDOMのinnerHTMLを取得＆変数に代入
    var page_title = await page.evaluate(() => {
        return document.querySelector('h1').innerHTML;          // h1タグの中身をreturn
    });
    console.log(page_title);                                    // 取得結果を表示

    await browser.close();                                      // ブラウザを閉じる

    fs.writeFileSync(__dirname + '/output.txt', page_title);    // output.txtに保存
    console.log('> 取得結果をファイルに保存しました。');

})();