// ==UserScript==
// @name        Orpheus upload
// @namespace   https://github.com/tomyangsh/userscrips
// @include     https://orpheus.network/upload.php#info=*
// @version     1.0.0
// @grant          none
// ==/UserScript==

let url = location.hash.match(/(^|#)info=([^#]*)(#|$)/)[2]
let xhttp  = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let dic = JSON.parse(xhttp.responseText);
    document.querySelector('#releasetype').value = dic.release_type;
    document.querySelector('#artist_0').value = dic.artist;
    document.querySelector('#title').value = dic.title;
    document.querySelector('#year').value = dic.year;
    document.querySelector('#record_label').value = dic.label;
    if (dic.catno) {
      document.querySelector('#catalogue_number').value = dic.catno;
    }
    document.querySelector('#media').value = dic.media;
    document.querySelector('#format').value = 'FLAC';
    document.querySelector('#bitrate').value = dic.bitrate;
    document.querySelector('#tags').value = dic.genre;
    document.querySelector('#album_desc').value = dic.desc;
  }
};
xhttp.open("GET", url, true);
xhttp.send();
