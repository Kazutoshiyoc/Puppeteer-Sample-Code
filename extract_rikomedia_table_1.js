'use strict';                               // 厳格モードの有効化
const puppeteer = require('puppeteer');     // Puppeteerモジュールのロード

// ========================================================================
// 理工メディアセンターのLinuxソフトウェア一覧を取得してコンソールに表示する関数
// ========================================================================
const getLinuxSoftwareTable = async (table_page_url) => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 });    // ブラウザ起動

    const page = await browser.newPage();                                       // 新規タブ(ページ)
    await page.goto(table_page_url);                                                // 理工メディアセンターのサイトへアクセス

    // ページ読込み完了の判定
    const selector = 'tfoot';                                                       // 判定基準とするセレクタを指定
    await page.waitForSelector(selector, {timeout: 30000});                         // セレクタが読み込まれるまで待機

    // -----------------------------------------------------
    // Table行の取得
    const raw_software_table_tr = await page.evaluate(() => {                       // 現在のページのTargetDOMの中身を全て取得し
        const Target_DOM = 'tr';                                                    // てraw_software_table_trに配列として格納
        const dom_area = Array.from(document.querySelectorAll(Target_DOM));
        return dom_area.map(dom_area => dom_area.innerHTML);
    });

    // 取得した情報の表示
    for ( var i = 0; i < raw_software_table_tr.length; i++ ) {                      // 全ての要素を処理
        await console.log('------------------');
        await console.log(raw_software_table_tr[i]);                                    // 取得した内容をコンソールに表示
    }
    // -----------------------------------------------------

    await browser.close();                                                      // ブラウザを閉じる
};

// =============================================================
// Main関数
// =============================================================
const main = async () => {
    await getLinuxSoftwareTable('https://www.waseda.jp/mse/web/pcroom/linux/');
};

main();