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
createObstacle()
animateCircle()

// Decrease circle count on click, minimum 1 circle
document.getElementById("circle-decrease").addEventListener("click", function () {

    if (circleCount > 1) {

        document.querySelectorAll(".test-circle")
            .forEach(function (circle) { circle.remove(circle) })

        circleCount--
        circleCounter.innerHTML = circleCount
        createCircle(circleCount)
        animateCircle()
    }
})

// Increase circle count on click
document.getElementById("circle-increase").addEventListener("click", function () {

    document.querySelectorAll(".test-circle")
        .forEach(function (circle) { circle.remove(circle) })

    circleCount++
    circleCounter.innerHTML = circleCount
    createCircle(circleCount)
    animateCircle()

})

// Reload circles with current circle count
document.getElementById("circle-reload").addEventListener("click", function () {

    testBox.innerHTML = ""
    createCircle(circleCount)
    createObstacle()
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

// Create Obstacle, add controls
function createObstacle() {

    const obstacle = document.createElement("div")
    testBox.append(obstacle)
    obstacle.className = "obstacle"
    obstacle.id = "obstacle"
    obstacle.style.left = rand(0, 100) + "%"
    obstacle.style.top = rand(0, 100) + "%"
    obstacle.style.width = rand(10, 60) + "%"
    obstacle.style.height = rand(10, 60) + "%"

    const obstacleDebug = document.createElement("div")
    obstacle.append(obstacleDebug)
    obstacleDebug.className = "obstacle-debug"

    // Obstacle controls
    let animReq
    let direction = null

    // Move left
    document.getElementById("arrow-left").addEventListener("mousedown", function () {
        direction = "left"
    })
    document.getElementById("arrow-left").addEventListener("mouseup", function () {
        direction = null
    })

    // Move up
    document.getElementById("arrow-up").addEventListener("mousedown", function () {
        direction = "up"
    })
    document.getElementById("arrow-up").addEventListener("mouseup", function () {
        direction = null
    })

    // Move right
    document.getElementById("arrow-right").addEventListener("mousedown", function () {
        direction = "right"
    })
    document.getElementById("arrow-right").addEventListener("mouseup", function () {
        direction = null
    })

    // Move down
    document.getElementById("arrow-down").addEventListener("mousedown", function () {
        direction = "down"
    })
    document.getElementById("arrow-down").addEventListener("mouseup", function () {
        direction = null
    })

    document.addEventListener('keydown', function (event) {

        if (event.key === "ArrowLeft") {
            direction = "left"
        }

        if (event.key === "ArrowUp") {
            direction = "up"
        }

        if (event.key === "ArrowRight") {
            direction = "right"
        }

        if (event.key === "ArrowDown") {
            direction = "down"
        }

    });

    document.addEventListener('keyup', function (event) {

        if (event.key === "ArrowLeft"
            || event.key === "ArrowUp"
            || event.key === "ArrowRight"
            || event.key === "ArrowDown") {

            direction = null

        }
    })

    // move along X axis
    function moveObstacleX(distance) {        
        obstacle.style.left = obstacle.offsetLeft + distance + "px"      
    }

    // move along Y axis
    function moveObstacleY(distance) {
        obstacle.style.top = obstacle.offsetTop + distance + "px"
    }    

    function animateObstacle() {    

        if (direction === "left") {
            moveObstacleX((-2))
        }

        if (direction === "right") {
            moveObstacleX(2)
        }

        if (direction === "up") {
            moveObstacleY(-2)
        }

        if (direction === "down") {
            moveObstacleY(2)
        }

        requestAnimationFrame(animateObstacle)
    }

    requestAnimationFrame(animateObstacle)

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

        // Get obstacle radius
        const obstacle = document.getElementById("obstacle")
        let obstacleRX = obstacle.offsetWidth / 2
        let obstacleRY = obstacle.offsetHeight / 2

        // Initialize boundaries
        let leftBound = circleR
        let topBound = circleR
        let rightBound = testBox.offsetWidth - circleR
        let bottomBound = testBox.offsetHeight - circleR

        // Obstacle boundaries
        let obstacleLeftBound = (obstacle.offsetLeft - obstacleRX) - circleR
        let obstacleTopBound = (obstacle.offsetTop - obstacleRY) - circleR
        let obstacleRightBound = (obstacle.offsetLeft + obstacleRX) + circleR
        let obstacleBottomBound = (obstacle.offsetTop + obstacleRY) + circleR

        // Update obstacle boundaries on arrow press
        const arrows = document.querySelectorAll(".arrow")
        arrows.forEach(function (arrow) {
            arrow.addEventListener("mousedown", function () {
                let interval = setInterval(() => { updateObstacleBoundaries() }, 10);
                this.addEventListener("mouseup", function () { clearInterval(interval) })
            })
        })

        document.addEventListener('keydown', function (event) {
            if (event.key === "ArrowLeft"
                || event.key === "ArrowUp"
                || event.key === "ArrowRight"
                || event.key === "ArrowDown") {

                let interval = setInterval(() => { updateObstacleBoundaries() }, 10);
                this.addEventListener("keyup", function () { clearInterval(interval) })
            }
        });


        // Update boundaries on window resize
        window.addEventListener("resize", function () {

            updateTestBoxBoudaries()
            updateObstacleBoundaries()

        })

        // Randomize circle spawn location within boundaries
        let circleX = rand(rightBound, leftBound)
        let circleY = rand(topBound, bottomBound)
        testCircle.style.left = circleX + "px"
        testCircle.style.top = circleY + "px"

        // Randomize circle direction and speed
        let circleLtoR = rand(0, 1)
        let circleTtoB = rand(0, 1)
        const speedY = rand(5, 25)
        const speedX = rand(5, 25)


        // Timing variables
        const fps = 30
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

            // Give circle horizontal direction and speed, reverse on boundary collision
            circleX < rightBound && circleLtoR ? circleX += speedX * deltaTimeMultiplier : circleLtoR = false
            circleX > leftBound && !circleLtoR ? circleX -= speedX * deltaTimeMultiplier : circleLtoR = true

            // Give circle vertical direction and speed, reverse on boundary collision
            circleY < bottomBound && circleTtoB ? circleY += speedY * deltaTimeMultiplier : circleTtoB = false
            circleY > topBound && !circleTtoB ? circleY -= speedY * deltaTimeMultiplier : circleTtoB = true

            // Obstacle collision top
            if (circleTtoB
                && circleY > obstacleTopBound
                && circleY < obstacleTopBound + 10
                && circleX >= obstacleLeftBound
                && circleX <= obstacleRightBound) {

                circleTtoB = !circleTtoB
                hit < 5 ? hit++ : hit = 1
                colorSwitch(hit)
            }

            // Obstacle collision bottom
            if (!circleTtoB
                && circleY < obstacleBottomBound
                && circleY > obstacleBottomBound - 10
                && circleX >= obstacleLeftBound
                && circleX <= obstacleRightBound) {

                circleTtoB = !circleTtoB
                hit < 5 ? hit++ : hit = 1
                colorSwitch(hit)
            }

            // Obstacle collision left
            if (circleLtoR
                && circleX > obstacleLeftBound
                && circleX < obstacleLeftBound + 10
                && circleY >= obstacleTopBound
                && circleY <= obstacleBottomBound) {

                circleLtoR = !circleLtoR
                hit < 5 ? hit++ : hit = 1
                colorSwitch(hit)
            }

            // Obstacle collision right
            if (!circleLtoR
                && circleX < obstacleRightBound
                && circleX > obstacleRightBound - 10
                && circleY >= obstacleTopBound
                && circleY <= obstacleBottomBound) {

                circleLtoR = !circleLtoR
                hit < 5 ? hit++ : hit = 1
                colorSwitch(hit)
            }

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

        // Color change function
        function colorSwitch(colorNum) {
            testCircle.className = "test-circle color-0" + colorNum
        }

        // Obstacle boundary update function
        function updateObstacleBoundaries() {
            obstacleRX = obstacle.offsetWidth / 2
            obstacleRY = obstacle.offsetHeight / 2
            obstacleLeftBound = (obstacle.offsetLeft - obstacleRX) - circleR
            obstacleTopBound = (obstacle.offsetTop - obstacleRY) - circleR
            obstacleRightBound = (obstacle.offsetLeft + obstacleRX) + circleR
            obstacleBottomBound = (obstacle.offsetTop + obstacleRY) + circleR
        }

        // TestBox boundary update funtion
        function updateTestBoxBoudaries() {
            leftBound = circleR
            topBound = circleR
            rightBound = testBox.offsetWidth - circleR
            bottomBound = testBox.offsetHeight - circleR
        }

    })

}

// Math Random function
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}