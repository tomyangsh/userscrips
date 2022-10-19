// ==UserScript==
// @name        TMDB - Person
// @match       https://www.themoviedb.org/person/*
// @version     1.0
// ==/UserScript==

let m = location.pathname.match(/\/(\w+)\/(\d+)\-\w+/);
let id = m[2];
let url = 'https://oracle.tomyangsh.pw/wiki/' + id;
let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let zh_name = xhttp.responseText;
      if (zh_name) {
        document.querySelector('h2 a').innerText = zh_name;
        document.querySelector('h2 a').style = "font-size: 30px;";
      }
    }
};
xhttp.open("GET", url, true);
xhttp.send();

