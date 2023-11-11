// ==UserScript==
// @name        milkie - search
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/browse/*
// @version     1.1.1
// @author      大統領
// ==/UserScript==

setTimeout(function() {
  var music_title_parse = document.querySelector('title').innerText.match(/([^-]+)-([^-]+)/);
  var music_query = `${music_title_parse[1].replaceAll('_', ' ')} ${music_title_parse[2].replaceAll('_', ' ')}`
  var ops_search_url = `https://orpheus.network/torrents.php?searchstr=${music_query}`;
  var ops_search_link = document.querySelectorAll('div.inner')[1].appendChild(document.createElement("a"));
  ops_search_link.innerText = 'search ops';
  ops_search_link.href = ops_search_url;
  ops_search_link.target = "_blank";
  var red_search_url = `https://redacted.ch/torrents.php?searchstr=${music_query}`;
  red_search_link.innerText = 'search red';
  red_search_link.href = red_search_url;
  red_search_link.target = "_blank";
}, 1000);
