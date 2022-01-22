# Wordle Solver 🟩🟩🟩🟩🟩
A hilariously inefficient pseudo-brute-force solver for the viral web game [Wordle](https://www.powerlanguage.co.uk/wordle/).  What started as a funny joke became a painful exploration into emulating browsers and web scraping - rather than just extracting the answer from the source code, this seemed a much more "fun" solution!  It also outputs a screenshot of the final answer for good measure.

## How it works 🪄
Essentially this solver uses Puppeteer to open the web page and repeatedly type guesses and eliminate potential solutions from a pool.  Imagine divide-and-conquer, just way more convoluted than necessary.  After trying any given word, the program keeps track of which letters are present, absent and those that are already in the correct place - this data is used to filter down the dictionary and inform the next guess.  Currently, there's no additional heursistic selection to choose the next word from a list of candidates - simply put it's entirely unecessary (most words will be solvable somewhere in the order of 10 guesses).

Do note that if you intend on running this (why?!) you'll need >=Node 16 as I make use of ESM.

## Difficulties 🤦
Turns out nested Shadow DOMs make things hard - read the source code at your own peril, you were warned.

## Learnings 🎓
In all seriousness, building this solver has genuinely proven a valuable exercise - I've never touched web scraping/emulation before and, despite being thrown in the deep end, I'd say it's gone pretty well.

## Example output (22/01/2022)
```
[ENV]: Starting new environment
[INFO]: Trying word: TARES
[ENV]: Typing word: TARES
[ENV]: Getting current game row
[INFO]: Guessing with: (of 12972) candidates
[INFO]: Fixed: {}
[INFO]: Present: ["E"]
[INFO]: Absent: ["T","A","R","S"]
[ENV]: Starting new environment
[INFO]: Trying word: BEBOP
[ENV]: Typing word: BEBOP
[ENV]: Getting current game row
[INFO]: Guessing with: (of 1058) candidates
[INFO]: Fixed: {}
[INFO]: Present: ["E"]
[INFO]: Absent: ["T","A","R","S","B","O","P"]
[ENV]: Starting new environment
[INFO]: Trying word: CECUM
[ENV]: Typing word: CECUM
[ENV]: Getting current game row
[INFO]: Guessing with: (of 476) candidates
[INFO]: Fixed: {}
[INFO]: Present: ["E","C"]
[INFO]: Absent: ["T","A","R","S","B","O","P","U","M"]
[ENV]: Starting new environment
[INFO]: Trying word: CEDED
[ENV]: Typing word: CEDED
[ENV]: Getting current game row
[INFO]: Guessing with: (of 58) candidates
[INFO]: Fixed: {}
[INFO]: Present: ["E","C"]
[INFO]: Absent: ["T","A","R","S","B","O","P","U","M","D"]
[ENV]: Starting new environment
[INFO]: Trying word: CEILI
[ENV]: Typing word: CEILI
[ENV]: Getting current game row
[INFO]: Guessing with: (of 46) candidates
[INFO]: Fixed: {}
[INFO]: Present: ["E","C","I"]
[INFO]: Absent: ["T","A","R","S","B","O","P","U","M","D","L"]
[ENV]: Starting new environment
[INFO]: Trying word: CHIEF
[ENV]: Typing word: CHIEF
[ENV]: Getting current game row
[INFO]: Guessing with: (of 11) candidates
[INFO]: Fixed: {}
[INFO]: Present: ["E","C","I"]
[INFO]: Absent: ["T","A","R","S","B","O","P","U","M","D","L","H","F"]
[ENV]: Starting new environment
[INFO]: Trying word: CIVIE
[ENV]: Typing word: CIVIE
[ENV]: Getting current game row
[INFO]: Guessing with: (of 6) candidates
[INFO]: Fixed: {"I":1,"E":4}
[INFO]: Present: ["E","C","I"]
[INFO]: Absent: ["T","A","R","S","B","O","P","U","M","D","L","H","F","V"]
[ENV]: Starting new environment
[INFO]: Trying word: NIECE
[ENV]: Typing word: NIECE
[ENV]: Getting current game row
[INFO]: Guessing with: (of 3) candidates
[INFO]: Fixed: {"I":1,"C":3,"E":4}
[INFO]: Present: ["E","C","I","N"]
[INFO]: Absent: ["T","A","R","S","B","O","P","U","M","D","L","H","F","V"]
[ENV]: Starting new environment
[INFO]: Trying word: WINCE
[ENV]: Typing word: WINCE
[ENV]: Getting current game row
[INFO]: WINCE found after 9 iterations
```