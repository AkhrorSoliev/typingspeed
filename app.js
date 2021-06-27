// selectors
const menuButton = document.getElementById('menu-bar')
const closeButton = document.getElementById('close-button')
const navs = document.querySelectorAll('.nav')
const wordEl = document.getElementById('word')
const wordInput = document.getElementById('word-input')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const select = document.getElementById('select')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const lastScore = document.getElementById('lastScore')

//api
const api = 'https://random-words-api.vercel.app/word'

// Random Word
let randomWord

// Score
let score = 0

// time
let time = 10

// difficulty
let difficulty

// set difficulty

select.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

// event listeners
menuButton.addEventListener('click', openMenu)
closeButton.addEventListener('click', closeMenu)
wordInput.addEventListener('input', checkWord)
select.addEventListener('change', changeOption)

// functions
function openMenu() {
  navs.forEach(function (nav) {
    nav.classList.add('active')
  })
}

function closeMenu() {
  navs.forEach(function (nav) {
    nav.classList.remove('active')
  })
}

// get random word from API
function get() {
  fetch(api)
    .then((word) => {
      return word.json()
    })
    .then(getWord)
}

function getWord(e) {
  randomWord = e[0].word
  wordEl.innerHTML = e[0].word.toLowerCase()
}

get()

// score update
function scoreUpdate() {
  score++
  scoreEl.textContent = score
}

//time update
const timeInterval = setInterval(updateTime, 1000)

function updateTime() {
  time--
  timeEl.textContent = `${time}s`
  if (time === 0) {
    clearInterval(timeInterval)
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
    lastScore.textContent = score
  }
  if (time <= 7) {
    const item = timeEl.parentElement
    item.style.color = 'yellow'
  }
}

// typing check
function checkWord(e) {
  const typingWord = e.target.value

  if (typingWord == randomWord.toLowerCase()) {
    get()
    scoreUpdate()
    e.target.value = ''

    if (difficulty === 'hard') {
      time += 2
    } else if (difficulty === 'medium') {
      time += 3
    } else {
      time += 5
    }
  }
}

function changeOption(e) {
  difficulty = e.target.value
  localStorage.setItem('difficulty', difficulty)
}
