// ==UserScript==
// @name        JAV Library Assistant
// @namespace	  https://github.com/tomyangsh/userscrips
// @version     1.3.0
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
` );

const pid = document.querySelector("#video_id table tbody tr td.text").innerText;

function float_video(src) {
  var div_float = document.createElement("div");
  div_float.setAttribute("class", "float");
  document.querySelector("body").append(div_float);
  var preview_video = document.createElement("video");
  preview_video.setAttribute("controls", true);
  div_float.append(preview_video);
  var preview_source = document.createElement("source");
  preview_source.type = "video/mp4";
  preview_source.src = src;
  preview_video.append(preview_source);
  document.querySelector("div.fade").style.display = "block";
  preview_video.play();
}

unsafeWindow.float_video = float_video;

function float_img(src) {
  var div_float = document.createElement("div");
  div_float.setAttribute("class", "float");
  document.querySelector("body").append(div_float);
  var img_float = document.createElement("img");
  img_float.src = src;
  div_float.append(img_float);
  document.querySelector("div.fade").style.display = "block";
}

unsafeWindow.float_img = float_img;

function float_remove() {
  document.querySelector("div.float").remove();
  document.querySelector("div.fade").style.display = "none";
}

unsafeWindow.float_remove = float_remove;

div_fade = document.createElement("div");
div_fade.setAttribute("onClick", "float_remove();");
div_fade.setAttribute("class", "fade");
document.querySelector("body").append(div_fade);

document.querySelectorAll("div.previewthumbs a").forEach((i) => {
  if (i.className != "btn_videoplayer") {
    img_thumb = i.childNodes[0];
    img_thumb.src = i.href
    img_thumb.setAttribute("onClick", "float_img(this.src)");
    i.removeAttribute("href");
  }
});

let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let result = JSON.parse(this.responseText);
    if (result.length && result[0].pid == pid) {
      document.querySelector("#video_date table tr td.text").innerText = result[0].date;
      if (result[0].preview) {
        document.querySelectorAll("a.btn_videoplayer").forEach(i => i.remove());
        let src = result[0].preview;
        button_preview = document.createElement("a");
        button_preview.setAttribute("class", "smallbutton");
        button_preview.value = src;
        button_preview.innerText = "Preview";
        button_preview.setAttribute("onClick", "float_video(this.value);");
        button_preview.style.cursor = "pointer";
        h3.append(button_preview);
      }
    }
  }
}
let url = `https://tomyangsh.pw/api/dmm?keyword=${pid}`;
xhttp.open("GET", url, true);
xhttp.send();

// title
const h3 = document.querySelector("h3");
var title = h3.childNodes[0];
title.removeAttribute("href");

// btn: javbus
var javbus = document.createElement("a");
javbus.setAttribute("class", "smallbutton");
javbus.setAttribute("target", "_blank");
javbus.setAttribute("href", `https://www.javbus.com/${pid}`);
javbus.innerText = "JavBus";
h3.append(javbus);

// btn: sukebei
var sukebei = document.createElement("a");
sukebei.setAttribute("class", "smallbutton");
sukebei.setAttribute("target", "_blank");
sukebei.setAttribute("href", `https://sukebei.nyaa.si/?q=${pid}`);
sukebei.innerText = "Sukebei";
h3.append(sukebei);

// btn: M-Team
var mteam = document.createElement("a");
mteam.setAttribute("class", "smallbutton");
mteam.setAttribute("target", "_blank");
mteam.setAttribute("href", `https://kp.m-team.cc/adult.php?search=${pid}`);
mteam.innerText = "M-Team";
h3.append(mteam);

// btn: FSM
var button_fsm = document.createElement("a");
button_fsm.setAttribute("class", "smallbutton");
button_fsm.setAttribute("target", "_blank");
button_fsm.setAttribute("href", `https://fsm.name/Torrents?keyword=${pid}`);
button_fsm.innerText = "FSM";
h3.append(button_fsm);
