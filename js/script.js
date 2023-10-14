"use strict"

// DOM Variables, create testBox and testCircle
const appBody = document.querySelector(".app-body")
const testBox = document.createElement("div")
const testCircle = document.createElement("div")
appBody.append(testBox)
testBox.append(testCircle)
testBox.className = "test-box"
testCircle.className = "test-circle"

// Randomize circle size, border always 1/3 of size
const circleSize = rand(20, 120)
testCircle.style.width = circleSize + "px"
testCircle.style.borderWidth = circleSize / 3 + "px"

// Get circle radius
const circleR = testCircle.offsetWidth / 2

// Initialize boundaries
let leftBound = circleR
let topBound = circleR
let rightBound = testBox.offsetWidth - circleR
let bottomBound = testBox.offsetHeight - circleR

// Update boundaries on window resize
window.onresize = function () {
    rightBound = testBox.offsetWidth - circleR
    bottomBound = testBox.offsetHeight - circleR
}

// Randomize circle spawn location within boundaries
let circleX = rand(rightBound, leftBound)
let circleY = rand(topBound, bottomBound)
testCircle.style.left = circleX + "px"
testCircle.style.top = circleY + "px"

// Randomize circle direction and speed
let circleLtoR = rand(0, 1)
let circleTtoB = rand(0, 1)
const speedX = rand(5, 15)
const speedY = rand(5, 15)

// Timing variables
const fps = 60
const frameInterval = 1000 / fps
let previouTime = performance.now()
let delaTimeMultiplier = 1
let deltaTime = 0

// Animation Function
function moveCircle(currentTime) {

    // Calculate DeltaTime and DeltaTimeMultiplier
    deltaTime = currentTime - previouTime
    delaTimeMultiplier = deltaTime / frameInterval

    // Give circle horizontal direction and speed
    circleX < rightBound && circleLtoR ? circleX += speedX * delaTimeMultiplier : circleLtoR = false
    circleX > leftBound && !circleLtoR ? circleX -= speedX * delaTimeMultiplier : circleLtoR = true

    // Give circle vertical direction and speed
    circleY < bottomBound && circleTtoB ? circleY += speedY * delaTimeMultiplier : circleTtoB = false
    circleY > topBound && !circleTtoB ? circleY -= speedY * delaTimeMultiplier : circleTtoB = true

    // Update animation time
    previouTime = currentTime

    // Move circle
    testCircle.style.left = circleX + "px"
    testCircle.style.top = circleY + "px"

    // Request next frame
    requestAnimationFrame(moveCircle)
}

// Run animation
requestAnimationFrame(moveCircle)


// Math Random Function
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}