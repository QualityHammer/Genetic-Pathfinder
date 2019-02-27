# Genetic Pathfinder
A genetic algorithm pathfinder in Javascript. Inspired by similar projects by CodingTrain and CodeBullet.  
  
# Overview
I used a genetic algorithm to have a population figure out the best pathway to get from one place to another. They are able to "learn" to move around obstacles such as walls or moving balls.  
> All that really happens is that an initial population is created with a list of random movements and the members of the population that get closer to the target are cloned to create the next generation. Along with other factors such as muatation, this enables each new generation to get farther than the last until eventually, someone in the population has a perfect list of movements that can get it to the target.  
  
Another important feature is that the list of directions that the population is given starts at only 50 movements, but every 3 generations the list gets longer.
> This allows the dots to master many short movements slowly instead of one long movement quickly. It allows them to be able to beat almost any obstacle in their way.  
  
## Usage
This is the github page for my project.  
[Genetic Pathfinder](https://qualityhammer.github.io/Simple-Pathfinder/)
  
  
## Controls
> The start button creates the initial population
  
Before you start the population, you can use the editor to create objects by simply clicking on the canvas.
> The button next to start switches between obstacles in the editor
  
  
### Walls
With walls selected, you just need to click twice, once for both corner ends.
  
  
### Swings
With swings selected, your first click is the position of the swing.  
The second click describes the radius, and the third describes the direction and velocity.
  
  
### Start/ Target
With either the start or target selected, you just need to click once to set the new position.
  
  
#### Other Controls
Before you initialize the population, you can control the population size.  
  
Also, at any point during the population's movements, you can change the mutation rate.  
> The mutation rate needs to be a decimal number less than 0. (representing the percent chance)  
  
> The current generation and the frame lifespan of the population are shown below everything else.
