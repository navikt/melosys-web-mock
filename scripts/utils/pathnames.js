
const pathname2String = (pathname, params, sepChar) => {
  if (pathname.indexOf(':') === -1) return pathname;
  const paths = pathname.split(sepChar);
  let path = paths.shift();
  paths.forEach(item => {
    if (item.startsWith(':')) {
      const param = params[item.slice(1)];
      path += `${sepChar}${param}`;
    }
    else {
      const param = params[item] ? params[item] : item;
      path += `${sepChar}${param}`;
    }
  });
  return path.startsWith('/') ? path.slice(1) : path;
};
const pathObject2String = (pathobject, sepChar = '/') => {
  const { pathname, params } = pathobject;
  const queryStartIndex = pathname.indexOf('?');
  if (queryStartIndex > 0) {
    const path = pathname.substring(0, queryStartIndex);
    const queryString = pathname.substr(queryStartIndex);
    return pathname2String(path, params, sepChar) + queryString;
  }
  return pathname2String(pathname, params, sepChar);
};
module.exports.pathObject2String = pathObject2String;
