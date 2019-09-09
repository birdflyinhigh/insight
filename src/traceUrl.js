const desUrl = window.location.href.indexOf('erpbi.zbj.com') > - 1 ? "//data.zbj.com" : '//172.17.183.33:8080';
const desPath = '/data/navigation/recordAccess';
const accessTime = Date.now();
//const href = window.location.href;
const reg = /(^| )bosszid=([^;]*)(;|$)/;
//const result = document.cookie.match(reg);
const result = reg.exec(document.cookie);
const bossUserId = result && result[2] || 0;
//const url = `${desUrl}${desPath}?userID=${bossUserId}&url=${href}&accessTime=${accessTime}`;

export default href => fetch(`${desUrl}${desPath}?userID=${bossUserId}&url=${href}&accessTime=${accessTime}`, {
  credentials: 'include',
  // cache: 'no-cache',
}).catch(e=>{});