// ==UserScript==
// @name        milkie
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://milkie.cc/*
// @version     1.5.2
// @author      大統領
// ==/UserScript==

function add_link(mutations) {
  var mutation_result = mutations[0].target.innerText;
  if (mutation_result.match(/^(Browse|Details)/)) { return; };
  var info_box = document.querySelectorAll('div.inner')[0];
  if (mutation_result.match(/NFO/)) {
    document.querySelectorAll('a.autolink').forEach(i => i.href = i.innerText);
    return;
  } else if (mutation_result.match(/External information loaded/)) {
    var imdb_link = document.querySelector('div.rest div div a');
    imdb_id = imdb_link.innerText.match(/tt\d+/)[0];
    imdb_link.href = `https://www.imdb.com/title/${imdb_id}`;
    link_innerText = 'View on TMDB';
    link_href = `https://www.themoviedb.org/redirect?external_source=imdb_id&external_id=${imdb_id}`;
  } else if (mutations[0].target.localName == 'title') {
    var category = document.querySelector('div.box div div').childNodes[1].innerText;
    if (category == 'Music') {
      var nfo = document.querySelector('span.toggle').__ngContext__[8].ngIf;
      var artist = nfo.match(/artist(\(s\))?[^\w]+(.+\w)/i)[2];
      var album = nfo.match(/(album|title)[^\w]+(.+\w)/i)[2].replace(' EP', '');
      var music_query = `${artist} ${album}`;
      link_innerText = 'Search RED';
      link_href = `https://redacted.ch/torrents.php?searchstr=${music_query}`;
      observer.observe(info_box.childNodes[7], config_childList)
    } else if (category == 'TV' || 'Movie') {
      var target_externals = document.querySelector('div.externals');
      observer.observe(target_externals, config_childList);
      return;
    }
  }
  var link = document.createElement("a");
  link.target = "_blank";
  link.innerText = link_innerText;
  link.href = link_href;
  link.setAttribute('class', 'mat-caption');
  link.setAttribute('style', 'color: #ffc107;');
  info_box.append(link);
};

var observer = new MutationObserver(add_link);
var target_title = document.querySelector('title');
var config_childList = { childList: true };
observer.observe(target_title, config_childList);
