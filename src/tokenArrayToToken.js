const tokenArrayToToken = function(tokenArray) {
  return {
    type: tokenArray[0],
    value: tokenArray[1],
    line: tokenArray[2]
  }
}

module.exports = tokenArrayToToken
