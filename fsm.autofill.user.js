// ==UserScript==
// @name        一键转种至 fsm
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://www.empornium.is/torrents.php?id=*
// @match       https://kp.m-team.cc/detail/*
// @match       https://fsm.name/Torrents/new?autofill
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      大統領
// @description 馒头/emp 一键转种至 fsm
// ==/UserScript==

const fsm_link = document.createElement('a');
fsm_link.innerText = '[转至 FSM]';
fsm_link.style = "cursor: pointer;";
url_autofill = 'https://fsm.name/Torrents/new?autofill';

if (location.hostname.match('emp')) {
  document.querySelector('div.linkbox').appendChild(fsm_link);

  fsm_link.onclick = function() {
    let title = document.querySelector('h2').innerText;
    let info_node = document.querySelector('div.body');
    let img_list = []

    img_list.push(document.querySelector('#coverimage img').onclick.toString().match(/'(.+)'/)[1]);
    info_node.querySelectorAll('img').forEach(node => {
      if (node.src.match(/https:\/\/\w+\.empornium\.\w+\/images/)) {
        img_src = node.src.replace(/\.th(\.\w+)$/, '$1');
        img_list.push(img_src);
      }
    });
    let info = `<p><img src="${img_list.join('"><img src="')}"></p>`;
    let tag = document.querySelector('div.cats_icon').title;
    let upload_info = {
      "title": title,
      "info": info,
      "tag": tag
    }
    GM_setValue("upload_info", upload_info);
    window.open(url_autofill, '_blank').focus();
  }
} else if (location.hostname.match('m-team')) {
  function append_link(mutations) {
    const title = document.querySelector('h2 span').innerText;
    let info = '';
    let tag = '';

    document.querySelectorAll('span').forEach(node => {
      if (node.innerText == '副標題') {
        const subtitle = node.parentNode.nextSibling.innerText;
        info += `<p>${subtitle}</p>`;
      } else if (node.innerText.match('無碼')) {
        tag = '无码';
      } else if (node.innerText.match('有碼')) {
        tag = '有码';
      } else if (node.innerText.match('寫真')) {
        tag = '写真';
      } else if (node.innerText.match('遊戲')) {
        tag = '黄油';
      } else if (node.innerText.match('漫畫')) {
        tag = '漫画';
      } else if (node.innerText.match('動畫')) {
        tag = '动画';
      } else if (node.innerText == '行為') {
        const action_bar = node.parentNode.nextSibling.childNodes[0].childNodes[0];
        action_bar.appendChild(fsm_link);
      }
    });

    fsm_link.onclick = function() {
      let img_list = [];

      document.querySelectorAll('.braft-output-content img').forEach(img => {
        img_list.push(img.src);
      });
      info += `<p><img src="${img_list.join('"><img src="')}"></p>`;

      let upload_info = {
        "title": title,
        "info": info,
        "tag": tag
      }
        GM_setValue("upload_info", upload_info);
        window.open(url_autofill, '_blank').focus();
      }
  }
  let observer = new MutationObserver(append_link);
  let target = document.querySelector('title');
  let config = { childList: true };
  observer.observe(target, config);
} else if (location.hostname.match('fsm')) {
  function fill_info(mutations) {
    const upload_info = GM_getValue("upload_info");
    document.querySelectorAll('label')[1].control.value = upload_info.title;
    app.__vue_app__.config.globalProperties.$route.matched[0].instances.default._.data.title = upload_info.title;
    document.querySelector('div.ql-editor').innerHTML = upload_info.info;
    document.querySelectorAll('label')[2].control.value = upload_info.tag;
    app.__vue_app__.config.globalProperties.$route.matched[0].instances.default._.data.tag = upload_info.tag;
  }
  let observer = new MutationObserver(fill_info);
  let target = document.querySelector('title');
  let config_childList = { childList: true };
  observer.observe(target, config_childList);
}

