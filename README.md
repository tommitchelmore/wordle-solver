# Wordle Solver
A hilariously inefficient pseudo-brute-force solver for the viral web game 'Wordle.'  What started as a funny joke became a painful exploration into emulating browsers and web scraping - rather than just extracting the answer from the source code, this seemed a much more "fun" solution!

![](https://i.imgur.com/FzdpqtP.png)

## How it works
Essentially this solver uses Puppeteer to open the web page and repeatedly type guesses and eliminate potential solutions from a pool.  Imagine divide-and-conquer, just way more convuluted than necessary.

## Difficulties
Turns out nested Shadow DOMs make things hard - read the source code at your own peril, you were warned.

## Learnings
In all seriousness, building this solver has genuinely proven a valuable exercise - I've never touched web scraping/emulation before and, despite being thrown in the deep end, I'd say it's gone pretty well.