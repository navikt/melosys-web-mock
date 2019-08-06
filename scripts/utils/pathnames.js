
const pathname2String = (pathname, params) => {
  if (pathname.indexOf(':') === -1) return pathname;
  const paths = pathname.split('/');
  let path = paths.shift();
  paths.forEach(item => {
    if (item.startsWith(':')) {
      const param = params[item.slice(1)];
      path += `/${param}`;
    }
    else {
      const param = params[item] ? params[item] : item;
      path += `/${param}`;
    }
  });
  return path;
};
const pathObject2String = pathobject => {
  const { pathname, params } = pathobject;
  const queryStartIndex = pathname.indexOf('?');
  if (queryStartIndex > 0) {
    const path = pathname.substring(0, queryStartIndex);
    const queryString = pathname.substr(queryStartIndex);
    return pathname2String(path, params) + queryString;
  }
  return pathname2String(pathname, params);
};
module.exports.pathObject2String = pathObject2String;
