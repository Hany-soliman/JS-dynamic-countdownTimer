//Globals
let countdownDate
let countdownTitle
let countdownValue = new Date()
let activeCountdown
const cachedCountdown = localStorage.getItem('countdown')
const cachedTitle = localStorage.getItem('title')
//selectors
const inputContainer = document.getElementById('input-container')
const countDownForm = document.getElementById('countdownForm')
const requiredHint = document.querySelectorAll('.required')
const datePicker = document.getElementById('date-picker')
const countdownContainer = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const timeElements = document.querySelectorAll('.time-element')
const resetBtn = document.getElementById('countdown-button')
const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')


//TODO: Code refactoring and modularization

//get remaining time
const getRemainingTime = () => {
    const today = new Date().getTime();
    const timeDiff = countdownValue - today
    if (timeDiff < 0) {
        countdownContainer.hidden = true
        clearInterval(activeCountdown);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
        completeEl.hidden = false
        localStorage.clear()
        return
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000
    let days = timeDiff / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((timeDiff % oneDay) / oneHour);
    let minutes = Math.floor((timeDiff % oneHour) / oneMinute);
    let seconds = Math.floor((timeDiff % oneMinute) / oneSecond);
// set values array
    const values = [
        days,
        hours,
        minutes,
        seconds
    ];
    timeElements.forEach((element, index) => {
        element.textContent = `${values[index]}`
    })
    return true
}

//update the DOM
const updateDom = () => {
    if (getRemainingTime()) {
        activeCountdown = setInterval(getRemainingTime, 1000);
        countdownElTitle.textContent = countdownTitle
        inputContainer.hidden = true
        countdownContainer.hidden = false
    }else{
        inputContainer.hidden = true
        countdownContainer.hidden = true
    }

}

const checkReqFields = () => {
    if (!countdownTitle && !countdownDate) {
        requiredHint[0].textContent = 'This is a required field.'
        requiredHint[1].textContent = 'This is a required field.'
        return false
    }
    if (!countdownTitle) {
        requiredHint[0].textContent = 'This is a required field.'
        return false
    }
    if (!countdownDate) {
        requiredHint[1].textContent = 'This is a required field.'
        return false
    }
    requiredHint[1].textContent = ''
    requiredHint[0].textContent = ''
    return true
}

//update countdown timer
const updateCountdownTimer = (e) => {
    e.preventDefault()
    countdownTitle = e.target[0].value
    countdownDate = e.target[1].value
    countdownValue = new Date(countdownDate).getTime()
    localStorage.setItem('countdown', countdownDate)
    localStorage.setItem('title', countdownTitle)
    if (checkReqFields()) {
        updateDom()
    }
}

//Reset all values
const reset = () => {
    countDownForm.reset()
    localStorage.clear()
    inputContainer.hidden = false
    countdownContainer.hidden = true
    completeEl.hidden = true
    completeElInfo.textContent = ''
    clearInterval(activeCountdown)
}

//Set Date Min to today's date && eventListeners
const today = new Date().toISOString().split('T')[0]
//TODO: add a time element to the DOM instead of Date only
window.addEventListener('DOMContentLoaded', () => {
    datePicker.setAttribute('min', today)
    if(cachedTitle && cachedCountdown){
        countdownTitle = cachedTitle
        countdownDate = cachedCountdown
        countdownValue = new Date(countdownDate).getTime()
        console.log(cachedCountdown, countdownDate)
        updateDom()
    }
})


countDownForm.addEventListener('submit', updateCountdownTimer)
resetBtn.addEventListener('click', reset)
completeBtn.addEventListener('click',reset)