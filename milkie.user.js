// ==UserScript==
// @name        milkie
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/*
// @version     1.4
// @author      大統領
// ==/UserScript==

function add_link(mutations) {
  var mutation_result = mutations[0].target.innerText;
  if (mutation_result.match(/^(Browse|Details)/)) { return; };
  var category = document.querySelector('div.box div div').childNodes[1].innerText;
  if (category == 'Music') {
    var nfo = document.querySelector('span.toggle').__ngContext__[8].ngIf;
    var artist = nfo.match(/artist[^\w]+(.+\w)/i)[1];
    var album = nfo.match(/(album|title)[^\w]+(.+\w)/i)[2].replace(' EP', '');
    var music_query = `${artist} ${album}`;
    link_innerText = 'Search RED';
    link_href = `https://redacted.ch/torrents.php?searchstr=${music_query}`;
  } else if (mutation_result.match(/External information loaded/)) {
    var imdb_link = document.querySelector('div.rest div div a');
    imdb_link.href = imdb_link.innerText;
    imdb_id = imdb_link.innerText.match(/tt\d+/)[0];
    link_innerText = 'View on TMDB';
    link_href = `https://www.themoviedb.org/redirect?external_source=imdb_id&external_id=${imdb_id}`;
  } else if (category == 'TV' || 'Movie') {
    var target_tmdb = document.querySelector('div.externals');
    observer.observe(target_tmdb, config);
    return;
  }
  var link = document.createElement("a");
  link.target = "_blank";
  link.innerText = link_innerText;
  link.href = link_href;
  link.setAttribute('class', 'mat-caption');
  link.setAttribute('style', 'color: #ffc107;');
  var info_box = document.querySelectorAll('div.inner')[0];
  info_box.append(link);
};

var observer = new MutationObserver(add_link);
var target_search = document.querySelector('title');
var config = { childList: true };
observer.observe(target_search, config);
