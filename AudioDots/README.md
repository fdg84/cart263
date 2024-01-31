# Francis Ouellette - AUDIO DOTS - Final p5js Project

https://github.com/fdg84/cart253-2023/tree/main/FINAL/AudioDots
https://fdg84.github.io/cart253-2023/FINAL/AudioDots/


For my final project, I created an interactive music player contained within a reactive pixel grid, using a series of ellipses and audio clips. By clicking around the screen, the dots activate the soundbank, processed with reverb, while zooming in and out of range. I am using my previous ‘I Like To Move It’ class exercise as a basis for my project, including parts of Pippin’s online sound module. I was inspired to explore this concept after discovering Sikai Li’s online AV experiments.

The main technical challenge I encountered was connecting each ellipse to a self defined sound, maintaining the project’s free flowing approach to live audio manipulation. In the end, the sound selection was generated in a random manner, using a bank of 22 sounds within the web page. Initially I was using 30-40 different sounds for a higher chance of audio combinations, but loading the page was very slow and would glitch out quickly. 

Also, instead of using a webcam to control the dots, I decided to incorporate p5's Wavemaker as a mouse controlled grid behind the sound ellipses, adding depth within the image and more playful interactivity for the user. There are two js files, the main script for the page & the one which controls the dot's attributes. After multiple iterations, I feel like this final version works smoothly, as well as having a clean look & design, inspired by a 1970's Op-Art aesthetic.

SOURCES & INSPIRATION

Sikai Li - p
https://skyl.fr/play/p

Audio Reactive Pixel Grid
https://editor.p5js.org/themis/sketches/OI5yCkWQM

Flower Grid
https://happycoding.io/tutorials/p5js/for-loops/flower-grid

Wavemaker
https://p5js.org/examples/interaction-wavemaker.html

I Like To Move It - Class Exercise
https://pippinbarr.com/cart253/exercises/i-like-to-move-it/

Pippin Barr - Sound
https://pippinbarr.com/cart253/course-information/schedule#-p5sound

p5 Reverb
https://p5js.org/reference/#/p5.Reverb


