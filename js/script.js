"use strict"


// DOM Variables, create testBox
const appBody = document.querySelector(".app-body")
const testBox = document.createElement("div")
const circleCounter = document.getElementById("circle-counter")

appBody.append(testBox)
testBox.className = "test-box"

// Spawn first circle
let circleCount = 1
circleCounter.innerHTML = circleCount
createCircle(circleCount)
animateCircle()

// Decrease circle count on click, minimum 1 circle
document.getElementById("circle-decrease").addEventListener("click", function () {

    if (circleCount > 1) {
        testBox.innerHTML = ""
        circleCount--
        circleCounter.innerHTML = circleCount
        createCircle(circleCount)
        animateCircle()
    }
})

// Increase circle count on click, minimum 1 circle
document.getElementById("circle-increase").addEventListener("click", function () {

    testBox.innerHTML = ""
    circleCount++
    circleCounter.innerHTML = circleCount
    createCircle(circleCount)
    animateCircle()

})

// Initialize Circle DOM element
function createCircle(circleCount) {

    for (let i = 0; i < circleCount; i++) {

        const circle = document.createElement("div")
        testBox.append(circle)
        circle.className = "test-circle color-01"
        circle.innerHTML = i + 1

    }
}

// Position, shape and animate circles
function animateCircle() {
    const circles = document.querySelectorAll(".test-circle")
    circles.forEach(testCircle => {

        // Randomize circle size
        const circleSize = rand(60, 120)
        testCircle.style.width = circleSize + "px"

        // Border size based on circleSize
        testCircle.style.borderWidth = circleSize / 4 + "px"

        // Get circle radius
        const circleR = testCircle.offsetWidth / 2

        // Initialize boundaries
        let leftBound = circleR
        let topBound = circleR
        let rightBound = testBox.offsetWidth - circleR
        let bottomBound = testBox.offsetHeight - circleR

        // // Update boundaries on window resize
        window.addEventListener("resize", function () {
            leftBound = circleR
            topBound = circleR
            rightBound = testBox.offsetWidth - circleR
            bottomBound = testBox.offsetHeight - circleR
        })

        // Randomize circle spawn location within boundaries
        let circleX = rand(rightBound, leftBound)
        let circleY = rand(topBound, bottomBound)
        testCircle.style.left = circleX + "px"
        testCircle.style.top = circleY + "px"

        // Randomize circle direction and speed
        let circleLtoR = rand(0, 1)
        let circleTtoB = rand(0, 1)
        const speedY = rand(5, 15)
        const speedX = rand(5, 15)

        // Timing variables
        const fps = 60
        const frameInterval = 1000 / fps
        let previousTime = performance.now()
        let deltaTimeMultiplier = 1
        let deltaTime = 0

        // Hit check
        let hit = rand(1, 5)
        colorSwitch(hit)

        // Animation Function
        function moveCircle(currentTime) {

            // Calculate DeltaTime and DeltaTimeMultiplier
            deltaTime = currentTime - previousTime
            deltaTimeMultiplier = deltaTime / frameInterval

            // Give circle horizontal direction and speed
            circleX < rightBound && circleLtoR ? circleX += speedX * deltaTimeMultiplier : circleLtoR = false
            circleX > leftBound && !circleLtoR ? circleX -= speedX * deltaTimeMultiplier : circleLtoR = true

            // Give circle vertical direction and speed
            circleY < bottomBound && circleTtoB ? circleY += speedY * deltaTimeMultiplier : circleTtoB = false
            circleY > topBound && !circleTtoB ? circleY -= speedY * deltaTimeMultiplier : circleTtoB = true

            // Move circle
            testCircle.style.left = circleX + "px"
            testCircle.style.top = circleY + "px"

            // Change color on boundary hit
            if ((circleX > rightBound && circleLtoR)
                || (circleX < leftBound && !circleLtoR)
                || (circleY > bottomBound && circleTtoB)
                || (circleY < leftBound && !circleTtoB)) {

                hit < 5 ? hit++ : hit = 1
                colorSwitch(hit)
            }

            // Update animation time
            previousTime = currentTime

            // Request next frame
            window.requestAnimationFrame(moveCircle)
        }

        // Run animation
        window.requestAnimationFrame(moveCircle)

        // color change Function
        function colorSwitch(colorNum) {
            testCircle.className = "test-circle color-0" + colorNum
        }

    })

}

// Math Random Function
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}