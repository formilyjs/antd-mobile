const path = require('path')

module.exports = {
  process(src, fileName) {
    return `module.exports = ${JSON.stringify(path.basename(fileName))} ;`
  },
}
