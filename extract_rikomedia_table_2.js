'use strict';                               // 厳格モードの有効化
const puppeteer = require('puppeteer');     // Puppeteerモジュールのロード

// ========================================================================
// 理工メディアセンターのLinuxソフトウェア一覧を取得してコンソールに表示する関数
// ========================================================================
const getLinuxSoftwareTable = async (table_page_url) => {
    const browser = await puppeteer.launch({                // ブラウザ起動
        headless: false,                                        // ヘッドレスモードOFF (Option)
        slowMo: 10,                                             // 動作遅延[ms] (Option)
    });
    const page = await browser.newPage();                   // 新規タブ(ページ)
    await page.goto(table_page_url);                            // 理工メディアセンターのサイトへアクセス

    // ページ読込み完了の判定
    const selector = 'tfoot';                                   // 判定基準とするセレクタを指定
    await page.waitForSelector(selector, {timeout: 30000});     // セレクタが読み込まれるまで待機

    // -----------------------------------------------------
    // Table行の取得
    const raw_software_table_tr = await page.evaluate(() => {                   // 現在のページのTargetDOMの中身を全て取得
        const Target_DOM = 'tr';                                                // してraw_software_table_trに配列として格納
        const dom_area = Array.from(document.querySelectorAll(Target_DOM));
        return dom_area.map(dom_area => dom_area.innerHTML);
    });

    // -----------------------------------------------------
    // 文字列処理
    var table = [];
    var table_header = '';
    for ( var i = 0; i < raw_software_table_tr.length; i++ ) {
        
        // 初期化処理
        var table_data = [];

        // テーブルヘッダの抽出のため、'</th>'を区切り文字としてsplit
        var th_element = raw_software_table_tr[i].split('</th>');

        // '</th>'が一度以上出現した場合は、length > 1
        if ( th_element.length > 1 ) {

            // 目的の文字列部分のみを抽出するため、正規表現でsplit（thタグは一度しか出現しないはずなのでth_element[0]のみを処理）
            th_element = th_element[0].split(/<th.*>/);
            table_header = th_element[1];

            // 抽出結果をコンソールに出力
            console.log(table_header);
        }

        // テーブルヘッダ以外のデータを抽出するため、'</td>'を区切り文字としてsplit
        var td_element = raw_software_table_tr[i].split('</td>');

        // tdタグは複数回出現する可能性があるので、全ての要素(td_element[j])を処理
        for ( var j = 0; j < td_element.length-1; j++ ) {

            // 目的の文字列部分のみを抽出するため、正規表現でsplit
            var tmp = td_element[j].split(/<td.*>/);

            // 配列として保管
            table_data.push(tmp[1]);
        }

        // 抽出結果をコンソールに出力
        console.log(table_data);

        // tableに抽出データを保管
        await table.push([table_header, table_data]);
    }

    // -----------------------------------------------------
    // 終了処理
    await browser.close();  // ブラウザの終了
    return table;           // tableをreturn
};

// =============================================================
// Main関数
// =============================================================
const main = async () => {

    // 指定のURLから表を取得して表示
    var res = await getLinuxSoftwareTable('https://www.waseda.jp/mse/web/pcroom/linux/');
    //await console.log(res);
};

main();