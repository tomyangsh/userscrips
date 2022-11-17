// ==UserScript==
// @name    	TMDB
// @namespace   https://github.com/tomyangsh/userscrips
// @include   	https://www.themoviedb.org/movie/*
// @include   	https://www.themoviedb.org/tv/*
// @version   	1.0.1
// ==/UserScript==

(function() {
'use strict'

var trakt_url = 'https://trakt.tv/search/tmdb?query='+/\d+/.exec(document.baseURI)[0];
var social_links = document.getElementsByClassName("social_links")[0];
var trakt_link = social_links.appendChild(document.createElement("a"));
trakt_link.href = trakt_url;
trakt_link.target = "_blank";
var img = trakt_link.appendChild(document.createElement("img"));
img.src = "https://www.tomyangsh.pw/dav/trakt-icon-red-white.svg";
img.width = 30;

let m = location.pathname.match(/\/(\w+)\/(\d+)/);
let cat = m[1];
let id = m[2];
let url = 'https://api.themoviedb.org/3/' + cat + '/'+ id + '/translations?api_key=f090bb54758cabf231fb605d3e3e0468';
let zh_names = new Set();
let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let translations = JSON.parse(xhttp.responseText).translations;
    for (let translation of translations) {
    if (translation.iso_639_1 == 'zh') {
      if (translation.data.name) {
      zh_names.add(translation.data.name);
      } else if (translation.data.title) {
      zh_names.add(translation.data.title);
      }
    }
    }
    zh_names = Array.from(zh_names).join('/');
    if (zh_names) {
    document.querySelector('h2 a').innerText = zh_names;
    document.querySelector('h2 a').style = "font-size: 30px;";
    }
  }
};
xhttp.open("GET", url, true);
xhttp.send();

})()
