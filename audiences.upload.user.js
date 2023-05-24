// ==UserScript==
// @name        Audiences upload
// @namespace   https://github.com/tomyangsh/userscrips
// @include     https://audiences.me/upload.php#info=*
// @version     1.0.0
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let url = location.hash.match(/(^|#)info=([^#]*)(#|$)/)[2]
let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let dic = JSON.parse(xhttp.responseText);
    if (dic.cat == 'movie') {
      var cat = '401';
    } else if (dic.cat == 'tv') {
      var cat = '402';
    }
    document.querySelector('#browsecat').value = cat;
    document.getElementsByName('small_descr')[0].value = dic.name;
    document.getElementsByName('url')[0].value = `https://www.imdb.com/title/${dic.imdb}/`;
    if (dic.medium == 'web') {
      var medium = '10';
    } else if (dic.medium == 'remux') {
      var medium = '3';
    } else if (dic.medium == 'encode') {
      var medium = '15';
    }
    document.getElementsByName('medium_sel')[0].value = medium;
    if (dic.vcode == 'h264') {
      var vcode = '1';
    } else if (dic.vcode == 'hevc') {
      var vcode = '6';
    }
    document.getElementsByName('codec_sel')[0].value = vcode;
    if (dic.acode == 'ac3'||dic.acode == 'eac3') {
      var acode = '18';
    } else if (dic.acode == 'aac') {
      var acode = '6';
    } else if (dic.acode == 'dts') {
      var acode = '3';
    } else if (dic.acode == 'flac') {
      var acode = '1';
    }
    document.getElementsByName('audiocodec_sel')[0].value = acode;
    if (dic.width < 1280) {
      var standard = '4';
    } else if (dic.width == 1280) {
      var standard = '3';
    } else if (dic.width <= 1920) {
      var standard = '1';
    } else { var standard = '5'; }
    document.getElementsByName('standard_sel')[0].value = standard;
    let des = dic.des.replaceAll('expand', 'Mediainfo')
    document.querySelector('#descr').value = des;
    document.getElementsByName('tags[]')[3].checked = dic.zhsub;
    document.getElementsByName('tags[]')[7].checked = dic.full_season;
    document.getElementsByName('uplver')[0].checked = true;
  }
};
xhttp.open("GET", url, true);
xhttp.send();

})()
