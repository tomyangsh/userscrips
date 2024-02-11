// ==UserScript==
// @name        TMDB
// @author      大統領
// @namespace   https://github.com/tomyangsh/userscrips
// @include     /^https://www\.themoviedb\.org/movie/[0-9a-z-]+$/
// @include     /^https://www\.themoviedb\.org/tv/[0-9a-z-]+$/
// @version     1.7.3
// ==/UserScript==

const social_links = document.querySelector("div.social_links");

const m = location.pathname.match(/\/(\w+)\/(\d+)/);
const cat = m[1];
const id = m[2];
const url = 'https://tomyangsh.pw/api/tmdb?cat=' + cat + '&id=' + id;
const xhr  = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onload = function() {
  if (this.readyState == 4 & this.status === 200) {
    const result = JSON.parse(this.responseText);

    const title = document.querySelector('h2 a');
    title.removeAttribute('href');
    const zh_names = result.zh_names;

    if (zh_names) {
      title.innerText = zh_names;
      title.style = "font-size: 30px;";
      if (!document.querySelector('p.wrap')) {
        const p_ori_name = document.createElement('p');
        p_ori_name.appendChild(document.createElement('strong')).innerText = '原产地片名';
        p_ori_name.append(result.ori_name);
        const section_facts = document.querySelector('section.facts');
        section_facts.insertBefore(p_ori_name, section_facts.querySelector('p'));
      }
    }

    const des = result.des;
    document.querySelector('div.overview').innerText = des.replace('\r', '\n\n');

    const imdb = result.imdb;

    if (imdb) {
      const imdb_link = social_links.appendChild(document.createElement("a"));
      imdb_link.href = `https://www.imdb.com/title/${imdb}/`;
      imdb_link.target = "_blank";
      const imdb_icon = imdb_link.appendChild(document.createElement("img"));
      imdb_icon.src = "https://tomyangsh.pw/imdb.svg";
      imdb_icon.width = 30;
    }

    const web_date = result.web_date

    if (web_date) {
      const web_date_span = document.querySelector('div.facts').appendChild(document.createElement("span"));
      web_date_span.innerText = 'WEB: ' + web_date;
    }

    const castinfo = [];
    for (i of result.cast) {
      if (i.character) {
       castinfo.push(`${i.name} 饰 ${i.character}`);
      } else {
       castinfo.push(i.name);
      }
      index = result.cast.indexOf(i);
      document.querySelector('ol.people.scroller').children[index].querySelector('p a').innerText = i.name;
    }

    runtime = result.runtime ? `${result.runtime} 分钟` : null;

    attributes = {
      '导演 ': result.director,
      '主创 ': result.creator,
      '类型 ': result.genres,
      '国家 ': result.country,
      '语言 ': result.lang,
      '网络 ': result.network,
      '上映 ': result.date,
      '片长 ': runtime,
      'IMDb': `https://www.imdb.com/title/${result.imdb}/`,
      '演员 ': castinfo.join('\n　　   ')
    }

    poster = result.poster_main ? result.poster_main : result.poster;

    var ptinfo = `[img]${poster}[/img]\n[size=3]\n[b]${result.name}`;

    if (result.name != result.ori_name) {
      ptinfo += ` ${result.ori_name}`;
    }
    ptinfo += ` (${result.year})[/b]\n\n`;

    for (i of Object.keys(attributes)) {
      if (attributes[i]) {
        ptinfo += `${i}  ${attributes[i]}\n`
      }
    }

    if (result.cat == 'tv') {
      ptinfo = ptinfo.replace('上映', '首播');
    }

    ptinfo += `\n${result.des}\n[/size]`;

    const ptinfo_button = document.querySelector('h2').appendChild(document.createElement("button"))
    ptinfo_button.innerText = '复制ptinfo'
    ptinfo_button.className = "copy";
    ptinfo_button.style = "font-size: 15px; cursor: pointer; color: black; font-weight: normal;"
    ptinfo_button.info = ptinfo;
    ptinfo_button.onclick = function() {
      navigator.clipboard.writeText(this.info).then(() => {
        document.querySelector('button').innerText = '已复制';
      });
    };
  }
}

xhr.send();
