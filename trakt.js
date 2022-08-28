// ==UserScript==
// @name        TMDB
// @namespace   Violentmonkey Scripts
// @match       https://www.themoviedb.org/*/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/21/2022, 12:50:38 AM
// ==/UserScript==

var trakt_url = 'https://trakt.tv/search/tmdb?query='+/\d+/.exec(document.baseURI)[0];
var social_links = document.getElementsByClassName("social_links")[0];
var trakt_link = social_links.appendChild(document.createElement("a"));
trakt_link.href = trakt_url;
trakt_link.target = "_blank";
var img = trakt_link.appendChild(document.createElement("img"));
img.src = "https://www.tomyangsh.pw/dav/trakt-icon-red-white.svg";
img.width = 30;
