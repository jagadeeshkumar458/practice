const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const base = 'https://www.w3schools.com'
const main = base + '/python/python_exercises.asp'

async function fetchHtml(url) {
  const res = await axios.get(url, { headers: { 'User-Agent': 'node.js' } })
  return res.data
}

function extractExerciseLinks(html) {
  const cheerio = require('cheerio')
  const $ = cheerio.load(html)
  const links = new Set()
  $('a').each((i, el) => {
    const href = $(el).attr('href')
    if (!href) return
    if (href.includes('exercise.asp?x=')) {
      let url
      if (href.startsWith('http')) url = href
      else if (href.startsWith('/')) {
        if (href.startsWith('/python/')) url = 'https://www.w3schools.com' + href
        else if (href.startsWith('/exercise.asp')) url = 'https://www.w3schools.com/python' + href
        else url = 'https://www.w3schools.com' + href
      } else {
        // relative link
        if (href.startsWith('python/')) url = 'https://www.w3schools.com/' + href
        else if (href.startsWith('exercise.asp')) url = 'https://www.w3schools.com/python/' + href
        else url = 'https://www.w3schools.com/' + href
      }
      links.add(url)
    }
  })
  return Array.from(links)
}

async function parseExercisePage(url) {
  const html = await fetchHtml(url)
  const $ = cheerio.load(html)

  // Find the exercise JS file that defines `qobjects`
  const scripts = $('script[src]').map((i, el) => $(el).attr('src')).get()
  const exerciseScript = scripts.find(s => s && s.match(/xrcise_.*\.js/))
  if (!exerciseScript) return []
  let scriptUrl
  if (exerciseScript.startsWith('http')) scriptUrl = exerciseScript
  else if (exerciseScript.startsWith('/')) scriptUrl = base + (exerciseScript.startsWith('/python') ? exerciseScript : '/python' + exerciseScript)
  else scriptUrl = base + '/python/' + exerciseScript

  const js = await fetchHtml(scriptUrl)

  // Extract qobjects array from JS
  const m = js.match(/qobjects\s*=\s*(\[([\s\S]*?)\])/) || js.match(/var\s+qobjects\s*=\s*(\[([\s\S]*?)\])/)
  if (!m) return []
  const arrText = m[1]

  // Evaluate the array text safely using vm
  const vm = require('vm')
  let qobjects = []
  try {
    qobjects = vm.runInNewContext('(' + arrText + ')')
  } catch (e) {
    console.error('VM parse failed', e.message)
    return []
  }

  const questions = qobjects.map((o, idx) => ({
    id: undefined,
    question: (o.question || '').replace(/\n/g, ' ').trim(),
    options: (o.options || []).map(s => s.replace(/<[^>]*>/g, '').trim()),
    answer: typeof o.correct === 'number' ? o.correct : null,
  }))

  return questions
}

;(async () => {
  try {
    console.log('Fetching main exercises page...')
    const html = await fetchHtml(main)
    const links = extractExerciseLinks(html)
    console.log('Found', links.length, 'exercise links')

    const allQuestions = []
    for (const link of links) {
      try {
        console.log('Parsing', link)
        const qs = await parseExercisePage(link)
        qs.forEach(q => allQuestions.push(q))
      } catch (e) {
        console.error('Failed', link, e.message)
      }
    }

    console.log('Total extracted questions:', allQuestions.length)
    const out = path.join(__dirname, '..', 'src', 'data', 'w3_questions.json')
    fs.writeFileSync(out, JSON.stringify(allQuestions, null, 2))
    console.log('Wrote', out)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
