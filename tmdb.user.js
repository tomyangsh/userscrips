// ==UserScript==
// @name        TMDB 增强
// @author      大統領
// @namespace   https://github.com/tomyangsh/userscrips
// @include     /^https://www\.themoviedb\.org/movie/[0-9a-z-]+$/
// @include     /^https://www\.themoviedb\.org/tv/[0-9a-z-]+$/
// @grant       GM.xmlHttpRequest
// @version     1.9.0
// @description 补全中文标题，增加 IMDB 和豆瓣链接，一键复制 ptinfo
// @icon        https://www.themoviedb.org/assets/2/apple-touch-icon-57ed4b3b0450fd5e9a0c20f34e814b82adaa1085c79bdde2f00ca8787b63d2c4.png
// ==/UserScript==

const social_links = document.querySelector("div.social_links");

const m = location.pathname.match(/\/(\w+)\/(\d+)/);
const type = m[1];
const id = m[2];

function appendDoubanLink(imdb_id) {
  GM.xmlHttpRequest({
    method: "GET",
    url: `https://movie.douban.com/j/subject_suggest?q=${imdb_id}`,
    responseType: 'json',
    onload: function(response) {
      const result = response.response;
      if (result.length) {
        const douban_id = result[0].id;
        const douban_link = social_links.appendChild(document.createElement("a"));
        douban_link.href = `https://movie.douban.com/subject/${douban_id}/`;
        douban_link.target = "_blank";
        douban_link.style = "width: 30px;";
        const douban_icon = douban_link.appendChild(document.createElement("img"));
        douban_icon.src = "https://www.douban.com/favicon.ico";
      } else {
        GM.xmlHttpRequest({
          method: "GET",
          url: `https://query.wikidata.org/sparql?format=json&query=SELECT * WHERE {?s wdt:P345 "${imdb_id}". OPTIONAL { ?s wdt:P4529 ?Douban_film_ID. }}`,
          responseType: 'json',
          onload: res => {
            const results = res.response.results.bindings;
            if (results.length) {
              if (results[0].Douban_film_ID) {
                const douban_id = results[0].Douban_film_ID.value;
                const douban_link = social_links.appendChild(document.createElement("a"));
                douban_link.href = `https://movie.douban.com/subject/${douban_id}/`;
                douban_link.target = "_blank";
                douban_link.style = "width: 30px;";
                const douban_icon = douban_link.appendChild(document.createElement("img"));
                douban_icon.src = "https://www.douban.com/favicon.ico";
              }
            }
          }
        })
      }
    }
  });
}

GM.xmlHttpRequest({
  method: "GET",
  url: `https://tomyangsh.us/api/tmdb?type=${type}&id=${id}`,
  onload: function(response) {
    const result = JSON.parse(response.responseText);

    const title = document.querySelector('h2 a');
    title.removeAttribute('href');
    const zh_names = result.zh_names;

    if (zh_names) {
      title.innerText = zh_names;
      title.style = "font-size: 30px;";
      if (!document.querySelector('p.wrap')) {
        const p_ori_name = document.createElement('p');
        p_ori_name.appendChild(document.createElement('strong')).innerText = '原名';
        p_ori_name.append(result.ori_name);
        const section_facts = document.querySelector('section.facts');
        section_facts.insertBefore(p_ori_name, section_facts.querySelector('p'));
      }
    }

    const overview = result.overview;
    if (overview) {
      document.querySelector('div.overview').innerText = overview.replace('\r', '\n\n');
    }

    const imdb_id = result.imdb;

    if (imdb_id) {
      const imdb_link = social_links.appendChild(document.createElement("a"));
      imdb_link.href = `https://www.imdb.com/title/${imdb_id}/`;
      imdb_link.target = "_blank";
      imdb_link.style = "width: 30px;";
      const imdb_icon = imdb_link.appendChild(document.createElement("img"));
      imdb_icon.src = "https://imdb.com/favicon.ico";
      appendDoubanLink(imdb_id);
    }

    const web_date = result.web_date;

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
      'IMDb': `https://www.imdb.com/title/${imdb_id}/`,
      '演员 ': castinfo.join('\n　　   ')
    }

    poster = result.poster;

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

    ptinfo += `\n${result.overview}\n[/size]`;

    const ptinfo_button = document.querySelector('h2').appendChild(document.createElement("button"))
    ptinfo_button.innerText = '复制ptinfo'
    ptinfo_button.className = "copy";
    ptinfo_button.style = "font-size: 15px; cursor: pointer; color: black; font-weight: normal;border: 1px solid #dcdcdc;border-radius: 5px;background-color: #f9f9f9;padding: 2px 10px;"
    ptinfo_button.info = ptinfo;
    ptinfo_button.onclick = function() {
      navigator.clipboard.writeText(this.info).then(() => {
        document.querySelector('button').innerText = '已复制';
      });
    };
  }
})
