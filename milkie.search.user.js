// ==UserScript==
// @name        milkie - search
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/*
// @version     1.2.0
// @author      大統領
// ==/UserScript==

function add_search(mutations) {
  var link_box = document.querySelectorAll('div.inner')[1]
  var music_title_parse = mutations[0].target.innerText.match(/([^-]+)-([^-]+?)(-|_EP)/);
  if (music_title_parse) {
    var music_query = `${music_title_parse[1].replaceAll('_', ' ')} ${music_title_parse[2].replaceAll('_', ' ')}`
    var red_search_url = `https://redacted.ch/torrents.php?searchstr=${music_query}`;
    var red_search_link = link_box.appendChild(document.createElement("a"));
    red_search_link.innerText = 'search red';
    red_search_link.href = red_search_url;
    red_search_link.target = "_blank";
  }
};

var target = document.querySelector('title');
var observer = new MutationObserver(add_search);
var config = { childList: true };
observer.observe(target, config);
