# Puppeteer-Sample-Code

Sample code for the puppeteer

---


## Initial setup

```
cd ~
git clone https://github.com/Kazutoshiyoc/Puppeteer-Sample-Code.git
cd Puppeteer-Sample-Code
npm init
npm install puppeteer
```


## Hello puppeteer

```
cd ~
cd Puppeteer-Sample-Code
node hello_puppeteer.js
```


## Basic sample code

```
cd ~
cd Puppeteer-Sample-Code
node test_launch_option.js
node test_ua_mobile.js
node test_screen_capture.js
node test_get_data.js
node test_file_output.js
node test_cookie.js
```


## Slack message

1. Set following parameter in send_slack.js: "INCOMING_WEBHOOKS_URI", "ICON_URL"

    ```
    cd ~
    cd Puppeteer-Sample-Code
    vi send_slack.js
    ```

1. Execute slack_message.js

    ```
    cd ~
    cd Puppeteer-Sample-Code
    node slack_message.js
    ```


## Keyword search sample

```
cd ~
cd Puppeteer-Sample-Code
node yahooJapan_search_1.js
node yahooJapan_search_2.js
node node .\extract_google_results.js puppeteer
```