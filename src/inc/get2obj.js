const get2obj = function () {
  if (window.location.search) {
    let _get = {};
    let get = window.location.search.replace(/^\?/, '').split('&');
    for (let i in get) {
      let tmp = get[i].split('=');
      _get[tmp[0]] = tmp[1];
    }
    return _get;
  }
  return {};
}
// export default get2obj;
module.exports = get2obj;