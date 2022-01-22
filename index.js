import puppet from 'puppeteer';
import fs from 'fs'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const dictionary = fs.readFileSync('./wordle_dictionary_filtered.txt', 'utf8').toString().split('\n')

  const environment = async () => {
    console.log("[ENV]: Starting new environment")
    const browser = await puppet.launch()
    const page = await browser.newPage()
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
    })
    await page.goto('https://www.powerlanguage.co.uk/wordle/')

    const typeWord = async (word) => {
      console.log("[ENV]: Typing word: " + word)
      await page.keyboard.type(word)
      await page.keyboard.press('Enter')
    }
  
    const getFirstRow = async () => {
      console.log("[ENV]: Getting current game row")
      const gameSRows = await page.$$('pierce/game-theme-manager #board game-row')
      const firstRow = await gameSRows[0].$$('pierce/div game-tile')
      const tiles = await Promise.all(firstRow.map(async (tile) => {
        return await tile.$eval('pierce/.tile', el => ({l: el.innerText, s: el.getAttribute('data-state')})
      )}))
      return tiles
    }

    return [typeWord, getFirstRow, browser, page]
  }

  const tryWord = async (word, typeWord, getRow) => {

    await typeWord(word)
    await sleep(2000)
    let row = await getRow()

    while (row.some(tile => tile.s === 'tbd')) {
      console.log("[WARN]: Being rate limited, slowing down")
      await sleep(4000)
      row = await getRow()
    }

    return row
  }

  const getFromDictionary = (fixed, present, absent) => {
    return dictionary.filter(word => {
      const allFixed = Object.keys(fixed).every(letter => letter === word[fixed[letter]])
      const allPresent = present.every(letter => word.includes(letter))
      const allAbsent = absent.every(letter => !word.includes(letter))
      return allFixed && allPresent && allAbsent
    })
  }

  let fixed = {}
  let present = []
  let absent = []
  let newWord = 'TARES'
  let foundWord = null
  let iterations = 0
  let numCandidates = dictionary.length

  while (!foundWord) {
    const [typeWord, getRow, browser, page] = await environment()

    console.log("[INFO]: Trying word: " + newWord)
    const guess = await tryWord(newWord, typeWord, getRow)
    iterations++
    if (guess.filter(x => x.s === 'correct').length === 5) {
      foundWord = guess.map(x => x.l).join('')
      console.log("[INFO]: " + foundWord + " found after " + iterations + " iterations")
      await page.click('body')
      await sleep(2000)
      await page.screenshot({path: './' + foundWord.toLowerCase() + '.png'})
    } else {
      present = [...new Set(present.concat(guess.filter(x => ['present','correct'].includes(x.s) && !absent.includes(x.l)).map(x => x.l)))]
      absent = [...new Set(absent.concat(guess.filter(x => x.s === 'absent' && !present.includes(x.l)).map(x => x.l)))]
      fixed = guess.map((x,i) => ({...x, i})).filter(x => x.s === 'correct').map(x => ({[x.l]: x.i})).reduce((acc, cur) => ({...acc, ...cur}), {})
      console.log('[INFO]: Guessing with: (of ' + numCandidates + ') candidates')
      console.log('[INFO]: Fixed: ' + JSON.stringify(fixed))
      console.log('[INFO]: Present: ' + JSON.stringify(present))
      console.log('[INFO]: Absent: ' + JSON.stringify(absent))
      const candidates = getFromDictionary(fixed, present, absent)
      numCandidates = candidates.length
      
      if (newWord === candidates[0] && candidates.length > 1) {
        newWord = candidates[1]
      } else {
        newWord = candidates[0]
      }
    }

    await browser.close()
  }

})();
