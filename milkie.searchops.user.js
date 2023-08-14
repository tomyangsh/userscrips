// ==UserScript==
// @name        milkie - ops search
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/browse/*
// @version     1.0
// @author      大統領
// ==/UserScript==

setTimeout(function() {
  var title_parse = document.querySelector('title').innerText.match(/(\w+)-(\w+)/);
  var search_url = `https://orpheus.network/torrents.php?searchstr=${title_parse[1].replaceAll('_', ' ')} ${title_parse[2].replaceAll('_', ' ')}`;
  var search_link = document.querySelectorAll('div.inner')[1].appendChild(document.createElement("a"));
  search_link.innerText = 'search ops';
  search_link.href = search_url;
  search_link.target = "_blank";
}, 1000);
