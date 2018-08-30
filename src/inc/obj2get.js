const obj2get = (obj) => {
  let _get = [];
  for (let key in obj) {
    _get.push([key, obj[key]].join('='));
  }
  return _get.join('&');
}

export default obj2get;