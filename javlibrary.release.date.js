// ==UserScript==
// @name        JAV Library - add release date
// @match       https://www.javlibrary.com/cn/vl_maker.php
// @version     1.0
// @description 9/20/2022, 11:11:05 AM
// ==/UserScript==


for (let entry of document.getElementsByClassName("title")) {
  let keyword = entry.innerText;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let date = JSON.parse(this.responseText).result.items[0].date.slice(5, 10);
      entry.innerText = date + " " + keyword;
    }
};
  xhttp.open("GET", "https://api.dmm.com/affiliate/v3/ItemList?api_id=&affiliate_id=&site=FANZA&service=digital&floor=videoa&keyword=" + keyword, true);
  xhttp.send();
}
