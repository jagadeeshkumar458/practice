const axios = require('axios')
const fs = require('fs')

const url = 'https://www.w3schools.com/python/exercise.asp?x=xrcise_getstarted1'

axios.get(url, { headers: { 'User-Agent': 'node.js' } })
  .then(res => {
    fs.writeFileSync('scripts/sample_exercise.html', res.data)
    console.log('Wrote scripts/sample_exercise.html')
  })
  .catch(err => {
    console.error(err.message)
  })
