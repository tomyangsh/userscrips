// ==UserScript==
// @name        一键转种至 fsm
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://exoticaz.to/torrent/*
// @match       https://www.pttime.org/details.php?id=*
// @match       https://pornbay.org/torrents.php?id=*
// @match       https://www.empornium.*/torrents.php?id=*
// @match       https://kp.m-team.cc/detail/*
// @match       https://zp.m-team.io/detail/*
// @match       https://fsm.name/Torrents/new?autofill
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM.xmlHttpRequest
// @version     2.3.2
// @author      大統領
// @description 馒头/emp/pb/ptt/exo 一键转种至 fsm
// @icon        https://img.fsm.name/21/69/2169f715a4805d2643db30a4b8fd95d0.jpg
// ==/UserScript==

const HOST = document.location.host.match(/([^.]+)\.\w+$/)[1];

function upload_img(img_node) {
  const source_url = img_node.src;
  img_node.alt = "加载中，请稍候。。。。";

  GM.xmlHttpRequest({
    url: source_url,
    method: "GET",
    responseType: 'blob',
    onload: res => {
      const form_data = new FormData();
      form_data.append("file", res.response, img_node.src.match(/\w+\.\w+$/)[0]);

      GM.xmlHttpRequest({
        url: "https://fsm.name/api/PicUpload/upload",
        method: "POST",
        data: form_data,
        responseType: 'json',
        onload: res => {
          img_node.src = res.response.data.url;
        }
      })
    }
  })
}

function add_observer(action) {
  const observer = new MutationObserver(action);
  const target = document.querySelector('title');
  const config = { childList: true };
  observer.observe(target, config);
}

function create_link(collect_data) {
  const fsm_link = document.createElement('a');
  fsm_link.innerText = '[转至 FSM]';
  fsm_link.style = "cursor: pointer;";
  fsm_link.onclick = function() {
    collect_data();
    const url_autofill = 'https://fsm.name/Torrents/new?autofill';
    window.open(url_autofill, '_blank').focus();
  }

  return fsm_link;
}

switch (HOST) {
  case 'exoticaz': {
    const action_bar = document.querySelector('div.p-2 div.float-right');

    function collect_data () {
      const title = document.querySelector('h1').innerText;
      const img_list = [];
      const tags = [];

      document.querySelectorAll('#TorrentDescription img').forEach(img => {
        img_list.push(img.src);
      })

      document.querySelectorAll('#screenshots img').forEach(img => {
        img_list.push(img.src);
      })

      document.querySelectorAll('div.tags a').forEach(a => {
        tags.push(a.innerText);
      })

      const tag = tags.join();
      const upload_info = {
        "title": title,
        "img_list": img_list,
        "tag": tag
      }
      GM_setValue("upload_info", upload_info);
    }

    const fsm_link = create_link(collect_data);
    action_bar.prepend(fsm_link);

    break;
  }
  case 'pttime': {
    let subtitle;
    let action_bar;
    let tags = [];

    document.querySelectorAll('td.rowhead').forEach(td => {
      switch (td.innerText) {
        case '资源标签': {
          td.nextElementSibling.querySelectorAll('span').forEach(span => {
            tags.push(span.innerText);
          })

          break;
        }
        case '副标题': {
          subtitle = td.nextElementSibling.innerText;

          break;
        }
        case '基本信息': {
          const attribute = td.nextElementSibling.innerText;
          if (attribute.match('无码')) {
            tags.push('无码')
          } else if (attribute.match('有码')) {
            tags.push('有码')
          } else if (attribute.match('写真')) {
            tags.push('写真')
          } else if (attribute.match('综艺')) {
            tags.push('综艺')
          }

          break;
        }
        case '行为': {
          action_bar = td.nextElementSibling;

          break;
        }
      }
    })

    function collect_data () {
      const title = document.querySelector('h1').firstChild.textContent;
      const info_node = document.querySelector('#kdescr');
      const img_list = [];

      info_node.querySelectorAll('img').forEach(img => {
        if (img.src.match('attachments')) {
          img_list.push(img.src);
        }
      })

      const tag = tags.join();
      const upload_info = {
        "title": title,
        "subtitle": subtitle,
        "img_list": img_list,
        "tag": tag
      }
      GM_setValue("upload_info", upload_info);
    }

    const fsm_link = create_link(collect_data);
    action_bar.append(' | ');
    action_bar.append(fsm_link);

    break;
  }
  case 'pornbay': {
    const link_box = document.querySelector('div.linkbox');

    function collect_data() {
      let title = document.querySelector('h2').innerText;
      let info_node = document.querySelector('div.body');
      let img_list = []

      img_list.push(document.querySelector('#coverimage img').src);
      info_node.querySelectorAll('img').forEach(node => {
        if (node.src.match(/https:\/\/\w+\.empornium\.\w+\/images/)) {
          img_src = node.src.replace(/\.(th|md)(\.\w+)$/, '$2');
          img_list.push(img_src);
        } else if (node.src.match(/pstorage\.space/)) {img_list.push(node.src)}
      });

      const tag = document.querySelector('td.cats_col div').title;
      const upload_info = {
        "title": title,
        "img_list": img_list,
        "tag": tag
      }
      GM_setValue("upload_info", upload_info);
    }

    const fsm_link = create_link(collect_data);
    link_box.append(fsm_link);

    break;
  }
  case 'empornium': {
    const link_box = document.querySelector('div.linkbox');

    function collect_data() {
      let title = document.querySelector('h2').innerText;
      let info_node = document.querySelector('div.body');
      let img_list = []

      img_list.push(document.querySelector('#coverimage img').onclick.toString().match(/'(.+)'/)[1]);
      info_node.querySelectorAll('img').forEach(node => {
        if (node.src.match(/https:\/\/\w+\.empornium\.\w+\/images/)) {
          img_src = node.src.replace(/\.(th|md)(\.\w+)$/, '$2');
          img_list.push(img_src);
        }
      });

      const tag = document.querySelector('div.cats_icon').title;
      const upload_info = {
        "title": title,
        "img_list": img_list,
        "tag": tag
      }
      GM_setValue("upload_info", upload_info);
    }

    const fsm_link = create_link(collect_data);
    link_box.append(fsm_link);

    break;
  }
  case 'm-team': {
    function collect_data_mt() {
      const title = document.querySelector('h2 span').innerText;
      let subtitle = '';
      let img_list = [];
      let tag = '';

      document.querySelectorAll('span').forEach(node => {
        if (node.innerText == '副標題') {
          subtitle = node.parentNode.nextSibling.innerText;
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
        }
      });

      document.querySelectorAll('.braft-output-content img').forEach(img => {
        img_list.push(img.src);
      });

      const upload_info = {
        "title": title,
        "subtitle": subtitle,
        "img_list": img_list,
        "tag": tag
      }
      GM_setValue("upload_info", upload_info);
    }

    function append_link() {
      const fsm_link = create_link(collect_data_mt);
      let action_bar;

      document.querySelectorAll('span').forEach(node => {
        if (node.innerText == '行為') {
          action_bar = node.parentNode.nextSibling.childNodes[0].childNodes[0];
        }
      })

      action_bar.append(fsm_link);
    }

    add_observer(append_link);

    break;
  }
  case 'fsm': {
    function fill_info(mutations) {
      if (!document.querySelector('title').innerText.match('FSM')) {return;}

      const editor = document.querySelector('div.ql-editor');
      const upload_info = GM_getValue("upload_info");
      const upload_data = app.__vue_app__.config.globalProperties.$route.matched[0].instances.default._.data;
      const note_node = document.createElement('div');
      note_node.innerText = "请等待下方图片全部加载完成后再点击发布！记得删去不必要的图片，及拖动改变顺序，第一张图片会用作封面";
      editor.parentNode.parentNode.parentNode.prepend(note_node);

      document.querySelectorAll('label')[1].control.value = upload_info.title;
      upload_data.title = upload_info.title;
      document.querySelectorAll('label')[2].control.value = upload_info.tag;
      upload_data.tag = upload_info.tag;

      if (upload_info.subtitle) {
        subtitle_node = document.createElement('p');
        subtitle_node.innerText = upload_info.subtitle;
        editor.append(subtitle_node);
      }

      for (img_url of upload_info.img_list) {
        let img_node = document.createElement('img');
        img_node.src = img_url;
        img_node.onerror = function() {
          upload_img(this);
        }

        editor.append(img_node);
      }

    }

    add_observer(fill_info);

    break;
  }
}
