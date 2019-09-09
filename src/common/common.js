let urlName = '//erpbi.zbj.com/';
// let urlName = 'http://172.17.51.6:8087/'
if (document.location.hostname == 'erpbi.test.zbjdev.com') {
    urlName = '//erpbi.test.zbjdev.com/';
}
if (document.location.hostname == 'localhost' || document.location.hostname.indexOf('172.17') > -1) {
    // urlName = 'http://172.31.14.59:8087/'//ql
    urlName = 'http://172.17.51.6:8087/'//dy
    // urlName = 'http://172.17.91.28:8087/'//lx
}
export const SERVER_ADDRESS = urlName;