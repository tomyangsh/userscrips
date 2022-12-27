// ==UserScript==
// @name    	TMDB
// @namespace   https://github.com/tomyangsh/userscrips
// @include   	https://www.themoviedb.org/movie/*
// @include   	https://www.themoviedb.org/tv/*
// @version   	1.3.1
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
let url = 'https://oracle.tomyangsh.pw/ptinfo/api/detail?cat=' + cat + '&id=' + id;
let zh_names = new Set();
let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let result = JSON.parse(xhttp.responseText);
    let zh_names = result.zh_names;

    if (zh_names) {
    document.querySelector('h2 a').innerText = zh_names;
    document.querySelector('h2 a').style = "font-size: 30px;";
    }

    let teamdrive_id = result.teamdrive_id;
    let gdrive_id = result.gdrive_id;
    let imdb = result.imdb;

    if (imdb) {
      let imdb_link = social_links.appendChild(document.createElement("a"));
      imdb_link.href = `https://www.imdb.com/title/${imdb}/`;
      var icon = imdb_link.appendChild(document.createElement("img"));
      icon.src = "https://oracle.tomyangsh.pw/imdb.svg";
      icon.width = 30;
    }

    if (teamdrive_id) {
      let teamdrive_link = social_links.appendChild(document.createElement("a"));
      teamdrive_link.href = `https://drive.google.com/file/d/${teamdrive_id}`;
      teamdrive_link.target = "_blank";
      var icon = teamdrive_link.appendChild(document.createElement("img"));
      icon.src = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
      icon.width = 30;
    }
    
    if (gdrive_id) {
      let gdrive_link = social_links.appendChild(document.createElement("a"));
      gdrive_link.href = `mpv:https://drive.google.com/file/d/${gdrive_id}`;
      var icon = gdrive_link.appendChild(document.createElement("img"));
      icon.src = "https://mpv.io/images/mpv-logo-128-0baae5aa.png";
      icon.width = 30;
    }
  }
};
xhttp.open("GET", url, true);
xhttp.send();

})()
