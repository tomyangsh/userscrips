// ==UserScript==
// @name        TMDB 自动填写人物中文名
// @namespace   https://github.com/tomyangsh/userscrips
// @match       https://www.themoviedb.org/person/*/edit*
// @grant       GM.xmlHttpRequest
// @version     1.0.1
// @author      大統領
// @description 在编辑人物/创建 zh_CN 翻译时自动填写中文名
// @icon        https://www.themoviedb.org/favicon.ico
// ==/UserScript==

const person_id = location.pathname.match(/\d+/)[0];

GM.xmlHttpRequest({
  method: "GET",
  url: `https://query.wikidata.org/sparql?format=json&query=SELECT ?itemLabel WHERE { ?item wdt:P4985 "${person_id}". SERVICE wikibase:label { bd:serviceParam wikibase:language "zh-cn,zh-hans,zh". } }`,
  responseType: 'json',
  onload: res => {
    const results = res.response.results.bindings;
    for (i of results) {
      if (i.itemLabel["xml:lang"]) {
        zh_name = i.itemLabel.value;
        document.querySelector('#zh_CN_name').value = zh_name;
        break;
      }
    }
  }
})
