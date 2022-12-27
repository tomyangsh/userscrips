// ==UserScript==
// @name        mt upload
// @namespace   https://github.com/tomyangsh/userscrips
// @include     https://kp.m-team.cc/upload.php#info=*
// @version     1.1.1
// @grant          none
// ==/UserScript==

(function() {
'use strict'

let url = location.hash.match(/(^|#)info=([^#]*)(#|$)/)[2]
let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let dic = JSON.parse(xhttp.responseText);
    document.querySelector('#browsecat').value = dic.cat;
    document.getElementsByName('small_descr')[0].value = dic.name;
    document.getElementsByName('url')[0].value = `https://www.imdb.com/title/${dic.imdb}/`;
    document.getElementsByName('codec_sel')[0].value = dic.code;
    document.getElementsByName('standard_sel')[0].value = dic.res;
    document.getElementsByName('processing_sel')[0].value = dic.area;
    document.querySelector('#descr').value = dic.des;
    document.querySelector("#l_sub").checked = dic.zhsub;
  }
};
xhttp.open("GET", url, true);
xhttp.send();

})()
