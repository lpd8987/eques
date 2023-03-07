
//Variables
let game;
let startScreen;
let instructionScreen;
let fightControlScreen;
let inGameScreen;
let gameOverScreen;

let gameActive = false;
let player;
let inventory = []

let currentAreaName;
let gameContent;
let actionStatus;

let titleStyle;
let subHeadingStyle;
let bodyTextStyle;

let areas = SetupAreas();
let currentArea = areas[1];

let backMusic;
let fightMusic;
let menuMusic;

//Initial load function
window.onload = function()
{
    //create a new PIXI App
    game = new PIXI.Application(
        {
            width: 800,
            height: 700,
            backgroundColor: 0x1a3320,
        }
    )

    game.loader.baseUrl = "music";
    game.loader.add("backMusic", "Back_Music_David_Fesliyan.mp3");
    game.loader.add("fightMusic", "Fight_Music_David_Renda.mp3");
    game.loader.add("menuMusic", "Menu_Music_David_Fesliyan.mp3");   
    game.loader.onComplete.add(doneLoading);
    game.loader.load();

    document.body.appendChild(game.view)

    //Event Listeners
    window.addEventListener("keydown", switchContainer)
    window.addEventListener("keydown", getExploreChoice);
    window.addEventListener("keydown", getInput);

    //Containers for different segments of the game
    startScreen = new PIXI.Container();
    instructionScreen = new PIXI.Container();
    fightControlScreen = new PIXI.Container();
    inGameScreen = new PIXI.Container();
    gameOverScreen = new PIXI.Container();

    //set initial states for each screen
    instructionScreen.visible = false;
    fightControlScreen.visible = false;
    inGameScreen.visible = false;
    gameOverScreen.visible = false;

    //add each new screen to the game
    game.stage.addChild(startScreen);
    game.stage.addChild(inGameScreen);
    game.stage.addChild(instructionScreen);
    game.stage.addChild(fightControlScreen);
    game.stage.addChild(gameOverScreen);

    setupInterface();
}

//set up music after it is finished loading
function doneLoading(e){
    backMusic = game.loader.resources.backMusic.data;
    backMusic.volume = .25;
    backMusic.loop = true;
    fightMusic = game.loader.resources.fightMusic.data; 
    fightMusic.volume = .25;
    fightMusic.loop = true;
    menuMusic = game.loader.resources.menuMusic.data; 
    menuMusic.volume = .25;
    menuMusic.loop = true;
    menuMusic.play();
}

//creates the text that appears on the screen
function setupInterface(){
    //styles
    titleStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 60,
        fontFamily: "Retro Gaming",
        fill: 0xFFFFFF 
    })

    subHeadingStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 20,
        fontFamily: "Retro Gaming"
    })

    bodyTextStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 15,
        fontFamily: "Retro Gaming"
    })

    //TITLE SCREEN
    titleLabel = new PIXI.Text("EQUES");
    titleLabel.anchor.set(.5);
    titleLabel.x = game.view.width/2;
    titleLabel.y = game.view.height/2;
    titleLabel.style = titleStyle;
    startScreen.addChild(titleLabel);

    subTitle = new PIXI.Text("A text-based Adventure")
    subTitle.anchor.set(.5);
    subTitle.x = game.view.width/2;
    subTitle.y = titleLabel.y + 35;
    subTitle.style = subHeadingStyle;
    startScreen.addChild(subTitle);

    titleInstruction = new PIXI.Text("Hit the 'Shift' Key to begin")
    titleInstruction.anchor.set(.5);
    titleInstruction.x = game.view.width/2;
    titleInstruction.y = titleLabel.y + 200;
    titleInstruction.style = subHeadingStyle;
    startScreen.addChild(titleInstruction);

    //INSTRUCTIONS
    instructionTitle = new PIXI.Text("Introduction");
    instructionTitle.anchor.set(.5);
    instructionTitle.x = game.view.width/2;
    instructionTitle.y = 10;
    instructionTitle.style = subHeadingStyle;
    instructionScreen.addChild(instructionTitle);

    introText = new PIXI.Text("In this game, you play as Titus- a knight eager to make a\nname for himself by defeating an ancient evil lurking in\nthe ruins of an old castle on the outskirts of the ruined \nKingdom of Titanica.");
    introText.anchor.set(.5);
    introText.x = game.view.width/2;
    introText.y = 60;
    introText.margin = 20;
    introText.style = bodyTextStyle;
    instructionScreen.addChild(introText);

    howToTitle = new PIXI.Text("How to Play:")
    howToTitle.anchor.set(.5);
    howToTitle.x = game.view.width/2;
    howToTitle.y = introText.y + 60;
    howToTitle.style = subHeadingStyle;
    instructionScreen.addChild(howToTitle);

    howToText = new PIXI.Text("Read the description of your surroundings.\nUse the arrow keys to move between areas.\nUse the 'g' key to pick up an item.\nUse the 'u' key to use an item.\nIf you encounter an enemy, press the 'f' key to fight them.\nPress the 'm' key to mute the game music at any time.\nSome fights are avoidable, but some will not let you\npass without a fight.")
    howToText.anchor.set(.5);
    howToText.x = game.view.width/2;
    howToText.y = howToTitle.y + 90;
    howToText.style = bodyTextStyle;
    instructionScreen.addChild(howToText);

    controlsTitle = new PIXI.Text("Fight Controls")
    controlsTitle.anchor.set(.5);
    controlsTitle.x = game.view.width/2;
    controlsTitle.y = howToText.y + 100;
    controlsTitle.style = subHeadingStyle;
    instructionScreen.addChild(controlsTitle);

    controlsText = new PIXI.Text("'A' - Attack\n'B' - Block\n'P' - Parry\n'C' - View Controls\n'U' - Use Item")
    controlsText.anchor.set(.5);
    controlsText.x = game.view.width/2;
    controlsText.y = controlsTitle.y + 90;
    controlsText.style = bodyTextStyle;
    instructionScreen.addChild(controlsText);

    beginText = new PIXI.Text("Press 'Space' to begin the game");
    beginText.anchor.set(.5);
    beginText.x = game.view.width/2;
    beginText.y = controlsText.y + 200;
    beginText.style = subHeadingStyle;
    instructionScreen.addChild(beginText);

    //MID FIGHT CONTROLS REMINDER
    mControlsTitle = new PIXI.Text("Fight Controls")
    mControlsTitle.anchor.set(.5);
    mControlsTitle.x = game.view.width/2;
    mControlsTitle.y = howToText.y + 90;
    mControlsTitle.style = subHeadingStyle;
    fightControlScreen.addChild(mControlsTitle);

    mControlsText = new PIXI.Text("'A' - Attack\n'B' - Block\n'P' - Parry\n'C' - View Controls\n'U' - Use Item\n\nHit the 'C' Key to return to fight")
    mControlsText.anchor.set(.5);
    mControlsText.x = game.view.width/2;
    mControlsText.y = controlsTitle.y + 90;
    mControlsText.style = bodyTextStyle;
    fightControlScreen.addChild(mControlsText);

    //IN GAME
    currentAreaName = new PIXI.Text(currentArea.name);
    currentAreaName.style = subHeadingStyle;
    inGameScreen.addChild(currentAreaName);

    gameContent = new PIXI.Text();
    if(currentArea.containsEnemy || !currentArea.visited){
        gameContent.text = currentArea.description;
    }
    else{
        gameContent.text = currentArea.alternateDescription;
    }
    gameContent.style = bodyTextStyle;
    gameContent.anchor.set(.5);
    gameContent.x = game.view.width/2;
    gameContent.y = game.view.height/2;
    inGameScreen.addChild(gameContent);

    actionStatus = new PIXI.Text();
    actionStatus.style = bodyTextStyle;
    actionStatus.anchor.set(.5);
    actionStatus.x = game.view.width/2;
    actionStatus.y = gameContent.y + 200;
    inGameScreen.addChild(actionStatus);

    //END SCREEN
    endGameLabel = new PIXI.Text("Ti Mortis");
    endGameLabel.anchor.set(.5);
    endGameLabel.x = game.view.width/2;
    endGameLabel.y = game.view.height/2;
    endGameLabel.style = titleStyle;
    gameOverScreen.addChild(endGameLabel);

    endGameInstruction = new PIXI.Text("Press 'Escape' to start over.");
    endGameInstruction.anchor.set(.5);
    endGameInstruction.x = game.view.width/2;
    endGameInstruction.y = endGameLabel.y + 200;
    endGameInstruction.style = subHeadingStyle;
    gameOverScreen.addChild(endGameInstruction);
}

//Move the player from room to room if game is active
function getExploreChoice(e){
    if(gameActive && !fightActive){
        //explore inputs
        switch (e.key){
            case "ArrowLeft":
                inGameScreen.removeChild(gameContent);
                inGameScreen.removeChild(currentAreaName);
                currentArea = GoLeft(currentArea);
                gameContent.anchor.set(.5);
                if(currentArea.containsEnemy || !currentArea.visited){
                    gameContent.text = currentArea.description;
                }
                else{
                    gameContent.text = currentArea.alternateDescription;
                }
                gameContent.x = game.view.width/2;
                gameContent.y = game.view.height/2;
                inGameScreen.addChild(gameContent);
                currentAreaName.text = currentArea.name;
                inGameScreen.addChild(currentAreaName);
                inGameScreen.removeChild(actionStatus);
                actionStatus.text = "";
                inGameScreen.addChild(actionStatus);
                break;
            case "ArrowRight":
                if ((currentArea.name == "Deep Forest" || currentArea.name == "Castle Entrance") && currentArea.containsEnemy){
                    BeginFight(player, currentArea);
                }
                else{
                    inGameScreen.removeChild(gameContent);
                    inGameScreen.removeChild(currentAreaName);
                    currentArea = GoRight(currentArea);
                    gameContent.anchor.set(.5);
                    if(currentArea.containsEnemy || !currentArea.visited){
                        gameContent.text = currentArea.description;
                    }
                    else{
                        gameContent.text = currentArea.alternateDescription;
                    }
                    gameContent.x = game.view.width/2;
                    gameContent.y = game.view.height/2;
                    inGameScreen.addChild(gameContent);
                    currentAreaName.text = currentArea.name;
                    inGameScreen.addChild(currentAreaName);
                    inGameScreen.removeChild(actionStatus);
                    actionStatus.text = "";
                    inGameScreen.addChild(actionStatus);
                }
                break;
            case "ArrowDown":
                inGameScreen.removeChild(gameContent);
                inGameScreen.removeChild(currentAreaName);
                currentArea = GoBack(currentArea);
                gameContent.anchor.set(.5);
                if(currentArea.containsEnemy || !currentArea.visited){
                    gameContent.text = currentArea.description;
                }
                else{
                    gameContent.text = currentArea.alternateDescription;
                }
                gameContent.x = game.view.width/2;
                gameContent.y = game.view.height/2;
                inGameScreen.addChild(gameContent);
                currentAreaName.text = currentArea.name;
                inGameScreen.addChild(currentAreaName);
                inGameScreen.removeChild(actionStatus);
                actionStatus.text = "";
                inGameScreen.addChild(actionStatus);
                break;
            case "ArrowUp":
                if ((currentArea.name == "Great Hall") && currentArea.containsEnemy){
                    BeginFight(player, currentArea);
                }
                else{
                    inGameScreen.removeChild(gameContent);
                    inGameScreen.removeChild(currentAreaName);
                    currentArea = GoUp(currentArea);
                    gameContent.anchor.set(.5);
                    if(currentArea.containsEnemy || !currentArea.visited){
                        gameContent.text = currentArea.description;
                    }
                    else{
                        gameContent.text = currentArea.alternateDescription;
                    }
                    gameContent.x = game.view.width/2;
                    gameContent.y = game.view.height/2;
                    inGameScreen.addChild(gameContent);
                    currentAreaName.text = currentArea.name;
                    inGameScreen.addChild(currentAreaName);
                    inGameScreen.removeChild(actionStatus);
                    actionStatus.text = "";
                    inGameScreen.addChild(actionStatus);
                }
                break;  
            case "f":
                if(currentArea.containsEnemy){
                    inGameScreen.removeChild(actionStatus);
                    actionStatus.text = "";
                    inGameScreen.addChild(actionStatus);
                    BeginFight(player, currentArea);
                }
                else{
                    return;
                }
                break;
            //use an item  
            case "u":
                inGameScreen.removeChild(actionStatus);
                actionStatus.text = player.UsePotion();
                inGameScreen.addChild(actionStatus);
                break;
            //get an item
            case "g":
                inGameScreen.removeChild(actionStatus);
                actionStatus.text = player.GetItem(currentArea);
                inGameScreen.addChild(actionStatus);
                break;
        }
    }
}

//changes the currently active container
function switchContainer(e){
    switch (e.key){
        case "Escape":
            startScreen.visible = true;
            instructionScreen.visible = false;
            inGameScreen.visible = false;
            gameOverScreen.visible = false;
            ResetGame();
            //document.querySelector("#playerInput").style.display = "none";
            break;
        case "Shift":
            startScreen.visible = false;
            instructionScreen.visible = true;                
            inGameScreen.visible = false;
            gameOverScreen.visible = false; 
            break;
        case " ":
            startScreen.visible = false;
            instructionScreen.visible = false;
            inGameScreen.visible = true;
            gameOverScreen.visible = false;
            StartGame();
            //document.querySelector("#playerInput").style.display = "block";
            break;
        //Mutes currently active music
        case "m":
            if(fightActive){
                if(!fightMusic.paused){
                    fightMusic.pause()
                    fightMusic.currentTime = 0;
                }
                else{
                    fightMusic.play()
                }
            }
            else if(gameActive){
                if(!backMusic.paused){
                    backMusic.pause()
                    backMusic.currentTime = 0;
                }
                else{
                    backMusic.play()
                }
            }
            else{
                if(!menuMusic.paused){
                    menuMusic.pause()
                    menuMusic.currentTime = 0;
                }
                else{
                    menuMusic.play()
                }
            }
    }
}

//starts the game loop and creates a new player
function StartGame(){
    gameActive = true;
    menuMusic.pause();
    menuMusic.currentTime = 0;
    backMusic.play();
    player = new Player(null, null, "Titus", 50, 15, true, inventory);
}

//Resets the game at the users' command (most likely after a game over)
function ResetGame(){
    gameActive = false;
    fightActive = false;
    fightMusic.pause();
    fightMusic.currentTime = 0;
    backMusic.pause();
    backMusic.currentTime = 0;
    menuMusic.currentTime = 0;
    menuMusic.play();
    areas = SetupAreas();
    currentArea = areas[1];
    inGameScreen.removeChild(gameContent);
    inGameScreen.removeChild(currentAreaName);
    gameContent.anchor.set(.5);
    if(currentArea.containsEnemy || !currentArea.visited){
        gameContent.text = currentArea.description;
    }
    else{
        gameContent.text = currentArea.alternateDescription;
    }
    gameContent.x = game.view.width/2;
    gameContent.y = game.view.height/2;
    inGameScreen.addChild(gameContent);
    currentAreaName.text = currentArea.name;
    inGameScreen.addChild(currentAreaName);    
}