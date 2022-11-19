// ==UserScript==
// @name        JAV Library Assistant
// @namespace	https://github.com/tomyangsh/userscrips
// @version     1.1.0
// @include     *://www.javlibrary.com/*/?v=*
// @include     https://kp.m-team.cc/upload.php#fillinfo=*
// @grant       none
// ==/UserScript==

(function () {
  "use strict";

  try {
    var javl_bango = document.querySelector("#video_id table tbody tr td.text");
  } catch {}

  var pid = document.getElementsByName("keywords")[0].content.match(/[a-z]+\d+/)[0];
  var parent = document.getElementsByClassName("socialmedia")[0];
  parent.style = "height: 360px; text-align: left;";
  var preview = document.createElement("video");
  preview.width = 640;
  preview.height = 360;
  preview.setAttribute("controls", true);
  var source = document.createElement("source");
  source.type = "video/mp4"
  let xhttp  = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let src = this.responseURL;
      console.log(src);
      if (src) {
        source.src = src;
        preview.appendChild(source);
        parent.replaceChildren(preview);
      }
    }
  }
  let url = `https://oracle.tomyangsh.pw/dmm/api/preview?cid=${pid}`;
  xhttp.open("HEAD", url, true);
  xhttp.send();
  
  try {
    // JAVLIBRARY

    // misc
    // remove title link
    document
      .querySelector("#video_title h3.post-title.text a")
      .removeAttribute("href");

    // bango
    javl_bango = javl_bango.innerText;
    // title
    var javl_title = document.querySelector("#video_title h3.post-title.text");
    var ori_title = javl_title.innerText;
    var img = document.querySelector("#video_jacket_img").src;

    // btn: javbus
    var javbus = document.createElement("a");
    javbus.setAttribute("class", "smallbutton");
    javbus.setAttribute("target", "_blank");
    javbus.setAttribute("href", "https://www.javbus.com/" + javl_bango);
    javbus.innerText = "JavBus";
    javl_title.append(javbus);

    // btn: sukebei
    var sukebei = document.createElement("a");
    sukebei.setAttribute("class", "smallbutton");
    sukebei.setAttribute("target", "_blank");
    sukebei.setAttribute("href", "https://sukebei.nyaa.si/?q=" + javl_bango);
    sukebei.innerText = "Sukebei";
    javl_title.append(sukebei);
    
    // btn: m-team
    var mteam = document.createElement("a");
    mteam.setAttribute("class", "smallbutton");
    mteam.setAttribute("target", "_blank");
    mteam.setAttribute("href", "https://kp.m-team.cc/adult.php?search=" + javl_bango);
    mteam.innerText = "M-Team";
    javl_title.append(mteam);
    
    // btn: autofill
    var autofill = document.createElement("a");
    autofill.setAttribute("class", "smallbutton");
    autofill.setAttribute("target", "_blank");
    autofill.setAttribute("href", 'https://kp.m-team.cc/upload.php#fillinfo={"javl_bango":"' + javl_bango + '","title":"' + ori_title + '","description":"\n[img]'+ img +'[/img]\n"}');
    autofill.innerText = "upload";
    javl_title.append(autofill);

    // btn: dmm
    var title = document.querySelector("#video_title h3 a").innerText.replace(/\w+-\d+\s/, "");
    var dmm = document.createElement("a");
    dmm.setAttribute("class", "smallbutton");
    dmm.setAttribute("target", "_blank");
    dmm.setAttribute("href", "https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=" + title);
    dmm.innerText = "dmm";
    javl_title.append(dmm);
  } catch {}

  try {
    var infojson = JSON.parse(decodeURIComponent(location.hash.match(/(^|#)fillinfo=([^#]*)(#|$)/)[2]))
    var input=document.querySelector('#name');
    input.value=infojson.title;
    var input=document.querySelector('#dmmtxt');
    input.value=infojson.javl_bango;
    var input=document.querySelector('#descr');
    input.value=infojson.description;
    document.getElementById("browsecat").value=410;
    document.getElementsByName("codec_sel")[0].value=1;
    document.getElementsByName("standard_sel")[0].value=1;
    document.getElementsByName("processing_sel")[0].value=4;
    document.getElementsByName("uplver")[0].checked=true;
    document.getElementsByClassName("codebuttons")[0].click();
  } catch {}

})();
