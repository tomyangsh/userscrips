// ==UserScript==
// @name        JAV Library Assistant
// @namespace	  https://github.com/tomyangsh/userscrips
// @version     1.2.1
// @include     *://www.javlibrary.com/*/?v=*
// @include     https://kp.m-team.cc/upload.php#fillinfo=*
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle ( `
#fade {
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

div.video {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1002;
  transform: translate(-50%, -50%);
}
` );

const pid = document.querySelector("#video_id table tbody tr td.text").innerText;

function video_player_open() {
  var video_player = document.querySelector("video");
  document.querySelector("div.video").style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  video_player.play();
}

unsafeWindow.video_player_open = video_player_open;

function video_player_close() {
  var video_player = document.querySelector("video");
  document.querySelector("div.video").style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  video_player.pause();
}

unsafeWindow.video_player_close = video_player_close;

let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let result = JSON.parse(this.responseText);
    if (result.length && result[0].pid == pid) {
      document.querySelector("#video_date table tr td.text").innerText = result[0].date;
      if (result[0].preview) {
        document.querySelectorAll('a.btn_videoplayer').forEach(i => i.remove());
        let src = result[0].preview;
        var div_video = document.createElement("div");
        div_video.setAttribute('class', 'video')
        document.querySelector("body").append(div_video);
        var preview_video = document.createElement("video");
        preview_video.setAttribute("controls", true);
        div_video.append(preview_video);
        var preview_source = document.createElement("source");
        preview_source.type = "video/mp4";
        preview_source.src = src;
        preview_video.append(preview_source);
        div_fade = document.createElement("div");
        div_fade.setAttribute("onClick", "video_player_close();");
        div_fade.id = 'fade';
        document.querySelector("body").append(div_fade);
        button_preview = document.createElement("a");
        button_preview.setAttribute("class", "smallbutton");
        button_preview.innerText = "Preview";
        button_preview.setAttribute("onClick", "video_player_open();");
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
