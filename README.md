# Light 'm Up!
**Light 'm Up!** is a browser game version of the boardgame [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)).  
The player is required to guess a four colour code (using six different colours) within a set amount of attempts.  
Rather than simply showing the correct code when the player wins, the lightbulbs at the top turn on in the code's respective colours.  
The game is intended for ages 8 and up.  
<br>
![website on different devices](assets/images/responsive.jpg)

## Features
<hr>

### Existing features

<br>

* Heading and game title
    * The head of the page contains the game name and the four lightbulbs the player is meant to turn on by playing.  
      
![Image of the head of the page](assets/images/head.jpg)

* Game board
    * The game board area is where the player can insert their own colour choices and check if they are correct.
    * They can test their code by plugging in the plug (a.k.a. clicking the plug button) to see if the lights turn on.
  
![Image of the game board](assets/images/board.jpg)
  
* Score area
    * The score area keeps count of the player's wins, losses and their high score.
    * The player wins by guessing the colour code correctly (all four colours must be accurate and in the right position).
    * The player loses if the correct code hasn't been guessed within the available attempts on the board.
    * The high score is the shortest amount of attempts (board rows) it has taken the player (so far) to guess the code correctly.

![Image of the score area](assets/images/score.jpg)  
  
* Footer
    * The footer contains a basic explanation of what is required from the player and how to understand the computer's feedback.

![Image of the footer area](assets/images/footer.jpg)  
  
<br>

* Colour Scheme  
![Image of the used colour scheme](assets/images/colors.jpg)
<br>  

### Potential future features  

* A possible future feature could be a multiplayer version where two players can play the game together, rather than play against the computer.  
<br>

## Testing
<hr>  

* I tested that the game works in different browsers: Chrome, Microsoft Edge, Safari  
* I confirmed that this project is responsive, looks good and functions on all standard screen sizes using the devtools device toolbar and double-checking on my own iphone SE, ipad, laptop and the office computer.  
<br>  

### Validator testing  
<br>  

* HTML  
    * No errors were returned when passing through the official [W3C validator](https://validator.w3.org/)  
<br>  

* CSS
    * No errors were returned when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/)  
<br>

* Javascript
    * No errors were returned when passing through the official [Jshint validator](https://jshint.com/)  
        * The following metrics were returned:  
        There are 39 functions in this file.  
        Function with the largest signature take 3 arguments, while the median is 0.  
        Largest function has 48 statements in it, while the median is 1.  
        The most complex function has a cyclomatic complexity value of 38 while the median is 1.  
<br>  

* Accessibility
    * I confirmed that the colors and fonts chosen are easy to read and accessible by running it through Lighthouse in devtools.  
    ![Image of Lighthouse result](assets/images/lighthouse.jpg)  
<br>  

## Bugs
<hr>




