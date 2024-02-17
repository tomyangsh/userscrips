// ==UserScript==
// @name        JAV Library Assistant
// @namespace	  https://github.com/tomyangsh/userscrips
// @version     1.3.3
// @include     *://www.javlibrary.com/*/?v=*
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle ( `
.fade {
  display: none;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  opacity: .80;
  filter: alpha(opacity=80);
}

.float {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1002;
  transform: translate(-50%, -50%);
}

video {
      width: 800px;
    }
` );

const pid = document.querySelector("#video_id table tbody tr td.text").innerText;

function float_video() {
  var div_float = document.createElement("div");
  div_float.className = "float";
  document.querySelector("body").append(div_float);
  var preview_video = document.createElement("video");
  preview_video.controls = true;

  div_float.append(preview_video);
  var preview_source = document.createElement("source");
  preview_source.type = "video/mp4";
  preview_source.src = this.src;
  preview_video.append(preview_source);
  document.querySelector("div.fade").style.display = "block";
  preview_video.play();
}

function float_img() {
  var div_float = document.createElement("div");
  div_float.className = "float";
  document.querySelector("body").append(div_float);
  var img_float = document.createElement("img");
  img_float.src = this.src;
  div_float.append(img_float);
  document.querySelector("div.fade").style.display = "block";
}

function float_remove() {
  document.querySelector("div.float").remove();
  this.style.display = "none";
}

div_fade = document.createElement("div");
div_fade.onclick = float_remove;
div_fade.className = "fade";
document.querySelector("body").append(div_fade);

document.querySelectorAll("div.previewthumbs a").forEach((i) => {
  if (i.className != "btn_videoplayer") {
    img_thumb = i.childNodes[0];
    img_thumb.src = i.href
    img_thumb.onclick = float_img;
    i.removeAttribute("href");
  }
});

let xhr  = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState == 4 & this.status == 200) {
    let result = JSON.parse(this.responseText);
    if (result.length && result[0].pid == pid) {
      document.querySelector("#video_date table tr td.text").innerText = result[0].date;
      if (result[0].preview) {
        document.querySelectorAll("a.btn_videoplayer").forEach(i => i.remove());
        button_preview = document.createElement("button");
        button_preview.className = "smallbutton";
        button_preview.src = result[0].preview;
        button_preview.innerText = "Preview";
        button_preview.onclick = float_video;
        button_preview.style = "cursor: pointer; color: black;";
        h3.append(button_preview);
      }
    }
  }
}
let url = `https://tomyangsh.pw/api/dmm?keyword=${pid}`;
xhr.open("GET", url);
xhr.send();

// title
const h3 = document.querySelector("h3");
var title = h3.childNodes[0];
title.removeAttribute("href");

// btn: javbus
var javbus = document.createElement("a");
javbus.className = "smallbutton";
javbus.target = "_blank";
javbus.href = `https://www.javbus.com/${pid}`;
javbus.innerText = "JavBus";
h3.append(javbus);

// btn: sukebei
var sukebei = document.createElement("a");
sukebei.className = "smallbutton";
sukebei.target = "_blank";
sukebei.href = `https://sukebei.nyaa.si/?q=${pid}`;
sukebei.innerText = "Sukebei";
h3.append(sukebei);

// btn: M-Team
var mteam = document.createElement("a");
mteam.className = "smallbutton";
mteam.target = "_blank";
mteam.href = `https://kp.m-team.cc/adult.php?search=${pid}`;
mteam.innerText = "M-Team";
h3.append(mteam);

// btn: FSM
var button_fsm = document.createElement("a");
button_fsm.className = "smallbutton";
button_fsm.target = "_blank";
button_fsm.href = `https://fsm.name/Torrents?keyword=${pid}`;
button_fsm.innerText = "FSM";
h3.append(button_fsm);
