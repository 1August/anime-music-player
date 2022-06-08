const video = document.querySelector('.videoBg video')
const myControls = document.querySelector('.myControls')
const playLayout = document.querySelector('.playBtnWrapper')
const playBtn = document.querySelector('.playBtn')
const playText = document.querySelector('.playBtnWrapper h1')
const progressbar = document.querySelector('.progressbar')
const keyboard = document.querySelector('.keyboard')
const mute = document.querySelector('.mute')
const reset = document.querySelector('.reset')

let currentTime = 0

const dattebayo = new Audio('../media/audio/dattebayo.mp3')
const tuturu = new Audio('../media/audio/tuturu.mp3')
const araara = new Audio('../media/audio/ara-ara.mp3')
const meow = new Audio('../media/audio/meow.mp3')
const wow = new Audio('../media/audio/wow_meme.mp3')
const gun = new Audio('../media/audio/gun.mp3')

const audioData = [
    {
        audio: dattebayo,
        keyCode: 68
    },
    {
        audio: araara,
        keyCode: 65
    },
    {
        audio: tuturu,
        keyCode: 84
    },
    {
        audio: wow,
        keyCode: 87
    },
    {
        audio: gun,
        keyCode: 71
    },
    {
        audio: meow,
        keyCode: 77
    }
]

// When key is pressed audio will play
const getSoundEvent = ({e, audio, keyCode, timeOut}) => {
    if (e.keyCode === keyCode){
        video.volume = 0.2
        const key = document.querySelector(`.${e.key}`)
        key.classList.add('clickKey')
        audio.play()
        setTimeout(() => {
            video.volume = 1
            key.classList.remove('clickKey')
        }, timeOut * 100 + 1000)
    }
}

// Sets event listener for window for given key
const setEventForKey = (audio, keyCode) => {
    window.addEventListener('keydown', e => getSoundEvent({e, audio, keyCode, timeOut: audio.duration}))
}

// Show options
playLayout.addEventListener('mouseover', () => {
    myControls.style.backdropFilter = 'blur(1px) brightness(.5)'
    keyboard.querySelectorAll('*').forEach(el => el.classList.add('showKey'))
    mute.classList.add('showKey')
    reset.classList.add('showKey')
})
playLayout.addEventListener('mouseout', () => {
    myControls.style.backdropFilter = ''
    keyboard.querySelectorAll('*').forEach(el => el.classList.remove('showKey'))
    mute.classList.remove('showKey')
    reset.classList.remove('showKey')
})

// Pause or play video
const controlVideo = () => {
    if (video.paused) {
        video.play()
        playBtn.src = './media/img/stop-light.png'
        playText.innerHTML = 'Pause'
        watchProgress()
    } else {
        video.pause()
        currentTime = 0
        playBtn.src = './media/img/play-light.png'
        playText.innerHTML = 'Play'
    }
}

// Event listener for click by play btn
playLayout.addEventListener('click', controlVideo)

// Check progressbar every 3 secs
const watchProgress = () => {
    setTimeout(() => {
        if (video.paused) return
        if (Math.abs(Math.round(video.currentTime) - currentTime) > 3) {
            currentTime = Math.round(+video.currentTime)
            progressbar.style.width = Math.round(currentTime * 100 / video.duration) + 'vw'
        }
        watchProgress()
    }, 1000)
}

// Watch space key
window.addEventListener('keydown', e => {
    if (e.keyCode !== 32) return
    controlVideo()

    const key = keyboard.querySelector('.space')
    key.classList.add('clickKey')
    setTimeout(() => {
        key.classList.remove('clickKey')
    }, 1000)
})

// Mute video
window.addEventListener('keydown', e => {
    if(e.keyCode !== 88) return
    if (video.muted) {
        video.volume = 1
        mute.querySelector('img').src = './media/img/volume.png'
    } else {
        video.volume = 0
        mute.querySelector('img').src = './media/img/mute.png'
    }
    video.muted = !video.muted
})

// Reset video
window.addEventListener('keydown', e => {
    if(e.keyCode !== 82) return
    video.currentTime = 0
})

// Sets events for window for every key in object
Object.values(audioData).forEach(v => {
    setEventForKey(v.audio, v.keyCode)
})