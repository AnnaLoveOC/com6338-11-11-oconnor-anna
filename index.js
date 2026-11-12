// ========================================
// GAME VARIABLES
// ========================================

// Track player stress, current scene, and special choices
let stress = 20
let currentScene = "scene1"
let comicSans = false
let chaoticLogo = false


// ========================================
// HTML ELEMENTS
// ========================================

// Intro Elements
const introSection = document.querySelector("#intro")
const startButton = document.querySelector("#start")

// Scene Elements
const stressDisplay = document.querySelector("#stress")
const sceneTitle = document.querySelector("#scene-title")
const sceneTime = document.querySelector("#scene-time")
const sceneEmail = document.querySelector("#email")
const sceneQuestion = document.querySelector("#question")
const choicesContainer = document.querySelector("#choices")
const gameSection = document.querySelector("#game")

// Ending Elements
const endingSection = document.querySelector("#ending")
const endingTitle = document.querySelector("#ending-title")
const endingText = document.querySelector("#ending-text")

// Restart Button
const restartButton = document.querySelector("#restart")


// ========================================
// SCENE DATA
// ========================================
const scenesArr = [

    // SCENE 1: The First Revision
    {
        id: "scene1",

        title: "The First Revision",
        time: "9:05 AM",
        email: "Hi! I love the logo, but can you make it pop more? Maybe add some colors and a few more versions?",

        question: "How do you respond to Madison?",

        choices: [

            // Choice A
            {
                text: "Sure! I'll create five more logo versions.",
                stressChange: 20,
                nextScene: "scene2",
            },

            // Choice B
            {
                text: "Politely remind Madison of the revision limits in her contract.",
                stressChange: 5,
                nextScene: "scene2",
            },

            // Choice C
            {
                text: "Ask Madison what she actually means by 'make it pop.'",
                stressChange: -10,
                nextScene: "scene2",
            },

        ]

    },

    // SCENE 2: The Font Incident
    {

        id: "scene2",

        title: "The Font Incident",
        time: "10:45 AM",
        email: "Hi again! So I showed the logo to my cousin, and she thinks we should change the font. She wants something elegant but fun, modern but vintage, and bold but delicate. Can you try a few different options? Thanks!!",

        question: "How do you handle Madison's contradictory font requests?",

        choices: [

            // Choice A
            {
                text: "Spend hours testing 12 different fonts to satisfy everyone.",
                stressChange: 25,
                nextScene: "scene3",
            },

            // Choice B
            {
                text: "Present two carefully selected fonts and explain why they work best.",
                stressChange: -5,
                nextScene: "scene3",
            },

            // Choice C
            {
                text: "Use Comic Sans out of spite. Maybe she'll finally get the message.",
                stressChange: -5,
                nextScene: "comicSansBonus",
            },

        ]
    },

    // ***BONUS SCENE: The Comic Sans Catastrophe
    {

        id: "comicSansBonus",

        title: "The Comic Sans Catastrophe",
        email: "OMG!!! I LOVE THIS FONT!!! It's PERFECT! Can we also add rainbows, sparkles, and maybe a little butterfly?!",

        question: "Do you embrace the chaos or try to save the design?",

        choices: [

            // Choice A
            {
                text: "Embrace the chaos. Rainbows and sparkles it is!",
                stressChange: 20,
                nextScene: "scene3",
            },

            // Choice B
            {
                text: "Gently convince Madison to reconsider Comic Sans.",
                stressChange: 5,
                nextScene: "scene3",
            },

        ]
    },

    // SCENE 3: Too Many Opinions
    {

        id: "scene3",

        title: "Too Many Opinions",
        time: "12:30 PM",
        email: "Hi again! I showed the logo to everyone, and they all have some suggestions! My husband wants blue, my business partner wants gold, my cousin thinks we need a script font, and my daughter really wants a butterfly. Can we somehow combine all their ideas? Thanks!!",

        question: "How do you handle everyone's conflicting opinions?",

        choices: [

            // Choice A
            {
                text: "Try to incorporate everyone's suggestions into one logo.",
                stressChange: 30,
                nextScene: "scene4",
            },

            // Choice B
            {
                text: "Politely request one designated decision-maker for future revisions.",
                stressChange: -10,
                nextScene: "scene4",
            },

            // Choice C
            {
                text: "Let everyone vote on their favorite design and hope for the best.",
                stressChange: 15,
                nextScene: "scene4",
            },

        ]
    },

    // SCENE 4: The Deadline Crisis
    {

        id: "scene4",

        title: "The Deadline Crisis",
        time: "4:15 PM",
        email: "Hi!! So I've been thinking... what if we completely redesigned the logo? I'm imagining something super minimalist now. I know the final files are due at 5 PM, but we still have 45 minutes! That should be enough time, right? Thanks!!",

        question: "How do you handle Madison's last-minute redesign request?",

        choices: [

            // Choice A
            {
                text: "Agree to redesign the entire logo with only 45 minutes left.",
                stressChange: 35,
                nextScene: "scene5",
            },

            // Choice B
            {
                text: "Explain that a complete redesign requires a new deadline.",
                stressChange: -10,
                nextScene: "scene5",
            },

            // Choice C
            {
                text: "Resend the original logo and hope Madison finally approves it.",
                stressChange: 10,
                nextScene: "scene5",
            },

        ]
    },

    // SCENE 5: Final Approval
    {

        id: "scene5",

        title: "Final Approval",
        time: "4:59 PM",
        email: "Hi!! I think we're finally ready! Can you send over the final logo files? Also, one tiny thing... we're thinking about changing our business name next week. That's included in the original price, right? Thanks so much!! 💕",

        question: "How do you respond to Madison's final request?",

        choices: [

            // Choice A: Revision Purgatory
            {
                text: "Of course! I'll keep making revisions for as long as you need.",
                nextScene: "revisionPurgatory",
            },

            // Choice B: Professional Victory
            {
                text: "Deliver the final files and politely explain that additional revisions require a new contract.",
                nextScene: "professionalVictory",
            },

            // ***Choice C: Viral Disaster
            {
                text: "Send the ridiculous logo and let the world witness your masterpiece.",
                nextScene: "viralDisaster",
            },

            // Choice D: The Great Escape
            {
                text: "Tell Madison you're ending the working relationship and finally reclaim your sanity.",
                nextScene: "greatEscape",
            },

        ]
    },

]


// ========================================
// GAME ENDINGS
// ========================================

const endings = {

    // ENDING A: Revision Purgatory
    revisionPurgatory: {

        title: "Revision Purgatory",
        text: "You agree to one more revision. Then another. And another. Three weeks later, Madison is still emailing you about fonts, colors, and whether the logo should be bigger. You've officially entered Revision Purgatory. There is no escape.",

    },

    // ENDING B: Professional Victory
    professionalVictory: {

        title: "Professional Victory",
        text: "You send Madison the final logo files and politely explain that any future changes will require a new contract. She agrees! You close your laptop, take a deep breath, and celebrate surviving the most exhausting design project of your career. Your professionalism has saved the day!",

    },

    // ENDING C: Viral Disaster
    viralDisaster: {

        title: "Viral Disaster",
        text: "You send Madison the final logo, complete with questionable fonts, clashing colors, and enough chaos to make any graphic designer cry. Somehow, the design goes viral overnight. Millions of people are sharing it, and Aura & Co. becomes an internet sensation. Madison thinks you're a genius. You consider changing careers.",

    },

    // ENDING D: The Great Escape
    greatEscape: {

        title: "The Great Escape",
        text: "You've officially had enough. You politely inform Madison that you will no longer be working together. She immediately replies asking if you can make one tiny change before you go. You close your laptop, silence your notifications, and walk away. For the first time all day, you're finally free.",

    },

    // BURNOUT ENDING: Burnout
    burnout: {

        title: "Burnout",
        text: "Your stress meter hits 100. You stare at Madison's latest email, then slowly close your laptop. The fonts, the colors, the endless revisions... you can't take it anymore. You've officially burned out. The logo remains unfinished, but at least you never have to hear the words 'make it pop' again.",

    },

}


// ========================================
// GAME FUNCTIONS
// ========================================

// FUNCTION: Start the game
function startGame() {

    introSection.hidden = true
    gameSection.hidden = false 

    displayScene()

}

// FUNCTION: Update the stress meter displayed on the webpage
function updateStress() {
    stressDisplay.textContent = `Stress: ${stress}/100`
}

// FUNCTION: Display the current scene and its available choices
function displayScene() {

    // Find the current scene
    const scene = scenesArr.find(item => item.id === currentScene)

    // Display scene information
    sceneTitle.textContent = scene.title
    sceneTime.textContent = scene.time || ""
    sceneEmail.textContent = scene.email
    sceneQuestion.textContent = scene.question

    // Remove buttons from the previous scene
    choicesContainer.innerHTML = ""

    // Create a button for each choice
    for (let i = 0; i < scene.choices.length; i++) {

        // Hide Viral Disaster unless a special choice was unlocked
        if (currentScene === "scene5" && i === 2) {
            if (!comicSans && !chaoticLogo) {
                continue
            }
        }

        // Create and display the choice button
        const choiceButton = document.createElement("button")
        choiceButton.classList.add("game-button")
        choiceButton.innerText = scene.choices[i].text
        choicesContainer.appendChild(choiceButton)

        // Handle the player's selection
        choiceButton.addEventListener("click", () => {
            handleChoice(i)
        })

    }

}

// FUNCTION: Process the player's choice and determine what happens next
function handleChoice(choiceIndex) {

    // Find the current scene and selected choice
    const scene = scenesArr.find(item => item.id === currentScene)
    const choice = scene.choices[choiceIndex]

    // Update stress based on the selected choice
    stress += choice.stressChange || 0

    // Prevent stress from dropping below zero
    if (stress < 0) {
        stress = 0
    }

    updateStress()

    // Trigger burnout if stress reaches 100
    if (stress >= 100) {
        showEnding("burnout")
        return
    }

    // Track whether the player chooses Comic Sans
    if (choice.nextScene === "comicSansBonus") {
        comicSans = true
    }

    // Remove Comic Sans if the player reconsiders
    if (currentScene === "comicSansBonus" && choiceIndex === 1) {
        comicSans = false
    }

    // Track whether the player creates a chaotic logo
    if (currentScene === "scene3" && choiceIndex === 0) {
        chaoticLogo = true
    }

    // Show the selected ending after Scene 5
    if (currentScene === "scene5") {
        showEnding(choice.nextScene)
        return
    }

    // Move to the next scene
    currentScene = choice.nextScene
    displayScene()

}

// FUNCTION: Display the ending selected by the player
function showEnding(endingId) {

    // Find the current ending
    const ending = endings[endingId]

    // Display ending information
    endingTitle.textContent = ending.title
    endingText.textContent = ending.text

    endingSection.hidden = false
    gameSection.hidden = true
    restartButton.hidden = false

}

// FUNCTION: Reset the game and return to Scene 1
function restartGame() {
    stress = 20
    currentScene = "scene1"
    comicSans = false
    chaoticLogo = false

    introSection.hidden = true
    endingSection.hidden = true
    gameSection.hidden = false

    restartButton.hidden = true

    updateStress()
    displayScene()
    

}


// ========================================
// INITIALIZE GAME
// ========================================

// Start Button starts game
startButton.addEventListener("click", () => {
    startGame()
})

// Restart Button restarts game
restartButton.addEventListener("click", () => {
    restartGame()
})
    










