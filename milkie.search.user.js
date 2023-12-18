// ==UserScript==
// @name        milkie - search
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/*
// @version     1.3
// @author      大統領
// ==/UserScript==

function add_search(mutations) {
  var info_box = document.querySelectorAll('div.inner')[0];
  var title = mutations[0].target.innerText;
  if (title.match(/^(Browse|Details)/)) { return; };
  var music_title_parse = title.match(/([^-]+)-([^-]+?)(-|_EP).+WEB-FLAC/);
  if (music_title_parse) {
    var nfo = document.querySelector('span.toggle').__ngContext__[8].ngIf;
    var artist = nfo.match(/artist[^\w]+(.+\w)/i)[1];
    var album = nfo.match(/(album|title)[^\w]+(.+\w)/i)[2].replace(' EP', '');
    var music_query = `${artist} ${album}`;
    var search_url = `https://redacted.ch/torrents.php?searchstr=${music_query}`;
  } else { return; }
  var search_link = document.createElement("a");
  search_link.innerText = 'Search RED';
  search_link.href = search_url;
  search_link.target = "_blank";
  search_link.setAttribute('class', 'mat-caption');
  search_link.setAttribute('style', 'color: #ffc107;');
  info_box.append(search_link);
};

var target = document.querySelector('title');
var observer = new MutationObserver(add_search);
var config = { childList: true };
observer.observe(target, config);
