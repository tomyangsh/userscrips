// ==UserScript==
// @name        dmm - list
// @match       https://www.dmm.co.jp/digital/videoa/-/list/*
// @version     1.0
// ==/UserScript==

for (i of document.querySelector("#list").children) {
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
