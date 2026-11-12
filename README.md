# Just One More Revision!

**Project 2 (Assignment 11) – Interactive Text-Based Adventure Game**

## Game Concept and Structure

*Just One More Revision!* is a text-based adventure game about a freelance graphic designer dealing with a difficult client named Madison. The player is trying to finish a logo project, but Madison keeps sending emails with more revision requests.

The player chooses how to respond to each email, and those decisions affect their stress level. Some responses increase stress, while others lower it. If stress reaches or exceeds 100, the player burns out and the game ends.

There are five main scenes, one optional bonus scene, and five possible endings. Certain choices also unlock additional options later in the game, including a hidden ending. I designed the interface to look like an email window to fit the story.

## Pseudocode / Logic Overview

```text
START GAME

Set stress to 20
Set current scene to Scene 1
Set special choice variables to false

Display the current scene and choices

WHEN the player selects a response:

    Find the selected choice
    Add or subtract stress based on the response

    IF stress drops below 0:
        Set stress to 0

    IF stress goes above 100:
        Set stress to 100

    Update the stress meter

    IF stress reaches 100 or higher:
        Show the Burnout ending
        STOP

    Check if the choice affects any special options

    IF the player is in the final scene:
        Show the ending they selected
        STOP

    OTHERWISE:
        Move to the next scene
        Display the new choices

WHEN the player restarts:

    Reset stress to 20
    Return to Scene 1
    Reset special choices
    Remove Comic Sans styling
    Display the first scene
```

## Data Structure and Modularity

I used an array of objects called `scenesArr` to organize the different scenes. Each scene stores the email, question, available responses, and information about where the player goes next. This made it easier to manage the story without writing separate code for every scene.

I also used an object called `endings` to store the five possible endings, including their titles and descriptions.

To keep the JavaScript organized, I separated the game into functions:

- `startGame()` starts the game.
- `displayScene()` shows the current email and creates the response buttons.
- `updateStress()` updates the stress meter.
- `trackSpecialChoices()` keeps track of decisions that unlock special options.
- `handleChoice()` processes the player's response and determines what happens next.
- `showEnding()` displays the ending the player reaches.
- `restartGame()` resets everything so the player can play again.

I organized the code this way so I could reuse the same functions throughout the game instead of repeating similar code for each scene. It also made it easier to make changes and troubleshoot problems while building the game.