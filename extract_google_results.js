'use strict';                               // 厳格モードの有効化
const puppeteer = require('puppeteer');     // Puppeteerモジュールのロード
const fs = require('fs');                   // fsモジュールのロード

// -------------------------------------------------------------
// 指定時間待機する関数
async function sleep_ms(delay_ms) {
    console.log( '> ' + (delay_ms / 1000.0) + '秒待機します。');
    return new Promise(resolve => setTimeout(resolve, delay_ms));
}

// =============================================================
// Googleで"puppeteer"と検索して結果をコンソールに表示するプログラム
// =============================================================
const getGoogleResults = async (keyword) => {
    const browser = await puppeteer.launch({                // ブラウザ起動
        headless: 'new',                                        // ヘッドレスモードON (enables new Headless mode)
        slowMo: 10,                                             // 動作遅延[ms] (Option)
        args: [                                                 // オプション引数の指定
            '--window-size=1920,1080',		                        // Chromeウィンドウのサイズ
        ]
    });
    const page = await browser.newPage();                   // 新規タブ(ページ)
    await page.setViewport({ width: 1920, height: 1080 });      // Viewportの設定
    await page.goto('https://www.google.com/');                 // Googleへアクセス
    await page.click('textarea[id="APjFqb"]');                  // 検索ボックスをクリック
    await page.type('textarea[id="APjFqb"]', keyword);          // 検索キーワードを入力
    await page.keyboard.press('Enter');                         // Enterキーを押す

    // ページ読込み完了の判定
    const selector = 'div[id="bres"]';                          // 判定基準とするセレクタを指定
    await page.waitForSelector(selector, {timeout: 30000});     // セレクタが読み込まれるまで待機

    // -----------------------------------------------------
    // 検索結果の取得
    const raw_search_results = await page.evaluate(() => {
        const Target_DOM = 'div[class=\"MjjYud\"]';
        const dom_area = Array.from(document.querySelectorAll(Target_DOM));
        return dom_area.map(dom_area => dom_area.innerHTML);
    });

    // 検索結果から必要な情報を抽出
    var search_results = [];            // 検索結果を格納する配列
    for ( var i = 0; i < raw_search_results.length; i++ ) {
        try {
            // タイトル情報の切り出し
            var tmp_array = raw_search_results[i].split(/<h3 class=\"LC20lb MBeuO DKV0Md\">/g);
            tmp_array = tmp_array[1].split(/<\/h3>/);
            var title = tmp_array[0];

            // リンク情報の切り出し
            var tmp_array = raw_search_results[i].split(/<a href=\"/g);
            tmp_array = tmp_array[1].split(/\"/);
            var link = tmp_array[0];

        } catch (e) {
            //console.log('> skip: i == ' + i);
            continue;                       // エラーが発生した場合は処理をスキップ
        }

        var result = {                      // 抽出した情報をオブジェクトとして格納
            title: title,                       // ページタイトル
            url: link,                          // URL
        };
        await search_results.push(result);  // 検索結果を格納する配列へ追加
    }
    console.log(search_results);            // 結果のターミナル出力
    //await sleep_ms(30*1000);                // 結果の目視確認用の処理遅延

    // -----------------------------------------------------
    // 終了処理
    await browser.close();                  // ブラウザを閉じる
    return search_results;                  // 検索結果を格納する配列をreturn
};

// =============================================================
// Main関数
// =============================================================
const main = async () => {

    // 引数が存在する場合
    if ( process.argv[2] != null ) {

        // Googleで検索して結果を返す
        var response = await getGoogleResults(process.argv[2]);
        console.log('> ------------------------------------------------------------------------------');

        // 検索結果をファイル出力
        try {
            fs.writeFileSync(__dirname + '/google__' + process.argv[2] + '.json', JSON.stringify(response));
            console.log('> データをファイルに保存しました。');
        } catch (e) {
            console.log('> ファイルの保存に失敗しました。（' + e + '）');
        }

    // 引数が存在しない場合はUsageを返す
    } else {
        console.log('Usage: node extract_google_results.js [keyword]');
    }
};

main();