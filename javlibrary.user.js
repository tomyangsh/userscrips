// ==UserScript==
// @name        JAV Library Assistant
// @namespace	  https://github.com/tomyangsh/userscrips
// @version     1.5.1
// @include     *://www.javlibrary.com/*/?v=*
// @grant       GM_addStyle
// @grant       GM.xmlHttpRequest
// @icon        https://www.javlibrary.com/favicon.ico
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

GM.xmlHttpRequest({
    method: "GET",
    url: `https://tomyangsh.us/api/dmm?query=${pid}`,
    responseType: 'json',
    onload: function(response) {
      const result = response.response;
      if (result) {
        document.querySelector("#video_date table tr td.text").innerText = result.date;
        if (result.preview) {
          document.querySelectorAll("a.btn_videoplayer").forEach(i => i.remove());
          button_preview = document.createElement("button");
          button_preview.className = "smallbutton";
          button_preview.src = result.preview;
          button_preview.innerText = "Preview";
          button_preview.onclick = float_video;
          /*button_preview.onclick = function() {
            window.open(result.preview, '_blank').focus();
          }*/
          button_preview.style = "cursor: pointer; color: black;";
          h3.append(button_preview);
        }
      }
    }
})

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
mteam.href = `https://next.m-team.cc/browse/adult?keyword=${pid}`;
mteam.innerText = "M-Team";
h3.append(mteam);

// btn: Picix
var button_fsm = document.createElement("a");
button_fsm.className = "smallbutton";
button_fsm.target = "_blank";
button_fsm.href = `https://picix.us/Movies/Search?keyword=${pid}`;
button_fsm.innerText = "Picix";
h3.append(button_fsm);
