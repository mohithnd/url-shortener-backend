function isUrlValid(url) {
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  const localPattern =
    /^(https?:\/\/)?(localhost)(:[0-9]+)?([\/\w \.-]*)*\/?$/i;

  return urlPattern.test(url) || localPattern.test(url);
}

function repairUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}

module.exports = {
  isUrlValid,
  repairUrl,
};
