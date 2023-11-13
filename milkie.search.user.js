// ==UserScript==
// @name        milkie - search
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/browse/*
// @version     1.1.3
// @author      大統領
// ==/UserScript==

setTimeout(function() {
  var link_box = document.querySelectorAll('div.inner')[1]
  var music_title_parse = document.querySelector('title').innerText.match(/([^-]+)-([^-]+?)(_EP)?/);
  var music_query = `${music_title_parse[2].replaceAll('_', ' ')}`
  var ops_search_url = `https://orpheus.network/torrents.php?searchstr=${music_query}`;
  var ops_search_link = link_box.appendChild(document.createElement("a"));
  ops_search_link.innerText = 'search ops';
  ops_search_link.href = ops_search_url;
  ops_search_link.target = "_blank";
  link_box.appendChild(document.createElement("br"));
  var red_search_url = `https://redacted.ch/torrents.php?searchstr=${music_query}`;
  var red_search_link = link_box.appendChild(document.createElement("a"));
  red_search_link.innerText = 'search red';
  red_search_link.href = red_search_url;
  red_search_link.target = "_blank";
}, 1000);
