// ==UserScript==
// @name        Picix - Preview
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://picix.us/Movies/Detail/*
// @grant       GM_addStyle
// @grant       GM.xmlHttpRequest
// @icon        https://picix.us/favicon.ico
// @version     1.0
// @author      大統領
// @description 为 Picix 增加预览影片
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

function float_remove() {
  document.querySelector("div.float").remove();
  this.style.display = "none";
}

function add_observer(action) {
  const observer = new MutationObserver(action);
  const target = document.querySelector('div#app');
  const config = { subtree: true, childList: true };
  observer.observe(target, config);
}

div_fade = document.createElement("div");
div_fade.onclick = float_remove;
div_fade.className = "fade";
document.querySelector("body").append(div_fade);

function add_preview(mutations) {
  for (mutation of mutations) {
    if (!mutation.addedNodes.length == 0) {
      if (mutation.addedNodes[0].className == "main-title-box") {
        const pid_span = document.querySelector('span.el-descriptions__content');
        if (pid_span) {
          const pid = pid_span.innerText;

          GM.xmlHttpRequest({
              method: "GET",
              url: `https://tomyangsh.us/api/dmm?query=${pid}`,
              responseType: 'json',
              onload: function(response) {
                const result = response.response;
                if (result) {
                  if (result.preview) {
                    preview_button = document.createElement("button");
                    preview_button.src = result.preview;
                    preview_button.innerText = "预览";
                    preview_button.onclick = float_video;
                    preview_button.style = "cursor: pointer; color: black; margin-left: 10px;";
                    preview_span = document.createElement("span");
                    preview_span.append(preview_button);
                    document.querySelector('span.main-title-txt').parentNode.append(preview_span);
                  }
                }
              }
          })
        }
      }
    }
  }
}

add_observer(add_preview);
