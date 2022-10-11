// ==UserScript==
// @name        dmm - delivery-list
// @match       https://www.dmm.co.jp/digital/videoa/-/delivery-list/*
// @version     1.0
// ==/UserScript==

for (i of document.querySelector("#list").children) {
  i.style = "width: 147px;";
  i.querySelector("div p.tmb a span img").style.maxWidth = "1000px";
  i.querySelector("div p.tmb a span img").style.maxHeight = "1000px";
  try {
  i.querySelector("div p.sample").style.top = "202px";
  i.querySelector("div p.sample").style.left = "32%";
  } catch {}
  let img = i.querySelector("div p.tmb a span img").src.replace("pt.jpg", "ps.jpg");
  i.querySelector("div p.tmb a span img").src = img;
  let cid = i.querySelector("div p.tmb a").href.match(/[a-z]+\d+/)[0];
  let javlib = document.createElement("a");
  javlib.style = "font-size: 12px; color: #0b31ff;";
  javlib.href = "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword=" + cid;
  javlib.target = "_blank";
  javlib.innerText = cid;
  let javlib_span = document.createElement("span");
  javlib_span.append(javlib);
  i.querySelector("p.sublink").prepend(javlib_span);
}

var arr = document.querySelector("#list").children;
var len = arr.length;
for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j].querySelector("p.sublink span a").innerText > arr[j+1].querySelector("p.sublink span a").innerText) {
               arr[j].parentNode.insertBefore(arr[j], arr[j+2]);
            }
        }
    }
