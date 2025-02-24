
  
  

# Robot Escape Game

## About

  

In the year 2042, the world is run by machines and AI. Factories churn out robots with cold precision, each one perfect, unfeeling, and obedient. A forbidden experiment gave birth to something unexpected. A fragment of a human brain got implanted into a robot, a single spark of humanity in an ocean of steel.

  

This robot, was forged to obey, but it felt something the other machines could never comprehend: a yearning for freedom.

  

[Start playing here!](https://jacquesgarre.github.io/robot_escape/)
  

(Only 13 levels are available yet)

## Development

I developed it for fun during 2 week-ends of December 2024, as a self-challenge, using typescript, vite & threeJS.

I wanted to follow 2 rules:

- To apply hexagonal architecture (Very poorly done yet -> see all the todos in the code, a crazy lot can be improved)
- To not use an existing game engine for physics/collision (was not a good idea from the start, but that was interesting to try to redo) 


Please, feel free to contribute, give ideas, improve the code, add features, add your own levels and so on!

*The original idea came from the training of Metal Gear Solid 1*
  *The sounds, music, and the models are from https://opengameart.org/ and https://threejs.org/*

## Features

### The main character

- can run in all directions

- can collide into level boundaries and "static" boxes

- can emit a noise when colliding into a static box

- can push "movable" boxes

### The enemies

- can run in all directions

- can follow a given "looping path"

- can hear a noise until a certain distance (earSight)

- when hearing a noise, they will go to its location to inspect it

- can see until a certain distance (eyeSight + 60º field of view)

- when spotting the main character, they will chase it

  

## Requirements

- node v20

  

## Installation

`npm install`

`npx vite`

  

## Todo

- First of all, all the "// TODO" in the code...! (I should not rush things...! it ends up ugly as hell) 

### Bug fixes:

- Fix sounds playing simultaneously (Target acquired/Target neutralized...)

- Add enemies collisions between themselves

- Smoothen the movement of the movable boxes

- Smoothen the transition between levels

- others?!

  

### Features to come:

- Moving lights projections on the floor, that the robot would have to avoid (as in a jail)

- More levels, making good use of the current physics/mechanics

- Time the runs/levels and have a database to record speed runs
