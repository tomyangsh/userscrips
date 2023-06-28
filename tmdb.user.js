// ==UserScript==
// @name    	TMDB
// @namespace   https://github.com/tomyangsh/userscrips
// @include   	/^https://www\.themoviedb\.org/movie/[0-9a-z-]+$/
// @include   	/^https://www\.themoviedb\.org/tv/[0-9a-z-]+$/
// @require     https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @version   	1.4.2
// ==/UserScript==

(function() {
  'use strict'

  var trakt_url = 'https://trakt.tv/search/tmdb?query='+/\d+/.exec(document.baseURI)[0];
  var social_links = document.getElementsByClassName("social_links")[0];
  var trakt_link = social_links.appendChild(document.createElement("a"));
  trakt_link.href = trakt_url;
  trakt_link.target = "_blank";
  var img = trakt_link.appendChild(document.createElement("img"));
  img.src = "https://tomyangsh.pw/trakt-icon.svg";
  img.width = 30;

  let m = location.pathname.match(/\/(\w+)\/(\d+)/);
  let cat = m[1];
  let id = m[2];
  let url = 'https://tomyangsh.pw/api/tmdb?cat=' + cat + '&id=' + id;
  let xhttp  = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  let result = JSON.parse(xhttp.responseText);

  let zh_names = result.zh_names;

  var ptinfo_link = document.querySelector('h2').appendChild(document.createElement("span")).appendChild(document.createElement("a"))
  ptinfo_link.innerText = '复制ptinfo'
  ptinfo_link.setAttribute("class", "copy");
  ptinfo_link.style = "font-size: 20px; cursor: pointer;"

  if (zh_names) {
  document.querySelector('h2 a').innerText = zh_names;
  document.querySelector('h2 a').style = "font-size: 30px;";
  }

  let teamdrive_id = result.teamdrive_id;
  let imdb = result.imdb;

  if (imdb) {
    let imdb_link = social_links.appendChild(document.createElement("a"));
    imdb_link.href = `https://www.imdb.com/title/${imdb}/`;
    imdb_link.target = "_blank";
    var icon = imdb_link.appendChild(document.createElement("img"));
    icon.src = "https://tomyangsh.pw/imdb.svg";
    icon.width = 30;
  }

  var castinfo = [];
  var i;
  for (i of result.cast) {
   if (i.character) {
     castinfo.push(`${i.name} 饰 ${i.character}`);
   } else {
     castinfo.push(i.name);
   }
  }

  var ptinfo;
  if (result.cat == 'movie') {
    ptinfo = `[img]${result.poster}[/img]
[size=3]
[b]${result.name} ${result.ori_name} (${result.year})[/b]

导演   ${result.director}
类型   ${result.genres}
国家   ${result.country}
语言   ${result.lang}
上映   ${result.date}
片长   ${result.runtime} 分钟
IMDb  https://www.imdb.com/title/${result.imdb}/
演员   ${castinfo.join('\n          ')}

${result.des}
[/size]`
  } else {
    ptinfo = `[img]${result.poster[0].path}[/img]
[size=3]
[b]${result.name} ${result.ori_name} (${result.year})[/b]

主创   ${result.creator}
类型   ${result.genres}
国家   ${result.country}
语言   ${result.lang}
网络   ${result.network}
首播   ${result.date}
IMDb  https://www.imdb.com/title/${result.imdb}/
演员   ${castinfo.join('\n          ')}

${result.des}
[/size]`
  }

  unsafeWindow.ptinfo = ptinfo;
  var clipboard = new ClipboardJS('.copy', {
    text: function () {
      return ptinfo;
    },
  });

  clipboard.on('success', function () {
    document.querySelector('h2 span a').innerText = '已复制';
  });

})()
