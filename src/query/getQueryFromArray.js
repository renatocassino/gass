function getQueryFromArray(array) {
  return array.map(function(part) {
    if(part[0] === '&') return part.slice(1)
    if(part[0] === ':') return part
    return ' ' + part
  }).join('').trim()
}

module.exports = getQueryFromArray
