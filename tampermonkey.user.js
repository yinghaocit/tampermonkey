// ==UserScript==
// @name         CoverMore辅助工具
// @namespace    http://tampermonkey.net/
// @version      v0.1.1
// @description  CoverMore的辅助小工具
// @author       EchoJ
// @include      *insurance*
// @include      *covermore*
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/499553/CoverMore%E8%BE%85%E5%8A%A9%E5%B7%A5%E5%85%B7.user.js
// @updateURL https://update.greasyfork.org/scripts/499553/CoverMore%E8%BE%85%E5%8A%A9%E5%B7%A5%E5%85%B7.meta.js
// ==/UserScript==

(function () {
  'use strict';

  // 创建一个悬浮按钮
  function createButton(text, clickHandler) {
    var button = document.createElement('button');
    button.textContent = text;
    button.style.position = 'fixed';

    // 计算 bottom 和 right 的值
    var numButtons = document.querySelectorAll('.echo-j-button').length; // 选择具有特定类名的按钮进行计数
    var bottom = 50 + numButtons * 60 + 'px';
    var right = '20px';

    button.style.bottom = bottom;
    button.style.right = right;
    button.style.padding = '10px';
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', clickHandler);

    button.classList.add('echo-j-button'); // 添加类名 "echo-j-button"
    document.body.appendChild(button);

  }

  // 复制文本到剪贴板
  function copyToClipboard(text) {
    var tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  // 生成链接方法
  function generateLink() {
    var recallElement = document.getElementById('recallID');
    if (recallElement) {
      var recallID = recallElement.value;
      var currentURL = window.location.origin; // 获取协议和域名部分
      var recallLink = `${currentURL}/recall-quote-v2?quoteId=${recallID}`;

      // 创建一个临时文本框来实现复制链接
      copyToClipboard(recallLink);

      alert(recallLink + '已复制');
    }
    else {
      alert('未找到 recallID 元素');
    }
  }

  // 获取 Site ID 值方法
  function getSiteID() {
    var linkElements = document.querySelectorAll('script');
    var pattern = /\/sites\/g\/files\/xfwnwa(\d+)/;
    var siteid = '';
    for (let index = 0; index < linkElements.length; index++) {
      if(!linkElements[index].hasAttribute('src')) continue;
      var href = linkElements[index].getAttribute('src');
      var match = href.match(pattern);
      if (match) {
        // 提取数字部分
        siteid = match[1];
        break;
      }
    }
    return siteid;
  }

  // 复制 recallID 值方法
  function copySiteID() {

    var recallElement = getSiteID();
    if (recallElement) {
      copyToClipboard(recallElement);
      alert(recallElement + '已复制');
    }
    else {
      alert('未找到 site ID ');
    }
  }

  // 复制 recallID 值方法
  function copyRecallID() {
    var recallElement = getRecallID();
    if (recallElement) {
      copyToClipboard(recallElement);
      alert(recallElement + '已复制');
    }
    else {
      alert('未找到 recallID 元素');
    }
  }

  // 复制 recallID 值方法
  function getRecallID() {
    var recallElement = document.getElementById('recallID');
    if (recallElement) {
      return recallElement.value;
    }
    else {
      return 'Nil';
    }
  }

  // 创建生成链接按钮
  createButton('生成 recall-v2 链接', generateLink);

  // 创建复制 recallID 值按钮
  createButton('复制 recallID: ' + getRecallID(), copyRecallID);

  // 创建复制 recallID 值按钮
  createButton('复制 siteID: ' + getSiteID(), copySiteID);

})();
