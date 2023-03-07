//variables
let isAttacking;
let isParrying;
let isBlocking;
let isUsingPotion;
let isVunerable;
let vunerableTime;
let fightActive = false;
let enemy;
let lastRand = 0;

//"abstract" character class
//Extends sprite for possible implementation of graphics and animations
class Character extends PIXI.Sprite{
    constructor(x, y, name, health, strength, alive, inventory){
        super();
        this.x = x;
        this.y = y;
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.alive = alive;
        this.inventory =  inventory;
        this.isAttacking = false;
        this.isBlocking = false;
        this.isParrying = false;
        this.isVunerable = false;
        this.vunerableTime = 0;
    }

    //returns the character's status (health)
    status(){
        if(this.health > 0){
            return this.name + ": " + parseInt(this.health) + " health remaining;"
        }
        else{
            return this.name + ": " + 0 + " health remaining;"
        }
    }

    /*all options have 2 versions, the start and the effect
    the start begins the active status
    the effect is everything else*/
    //Attack
    BeginAttack(){
        if(!isVunerable){
            this.isAttacking = true;
        }
        else{
            this.isAttacking = false;
        }
    }

    Attack(target){
        let returnString = "";
        if(target.isBlocking){
            target.health -= this.strength/2;
            returnString = this.name + " attacked " + target.name + "!";
        }
        else if(target.isParrying){
            //If parried, result is conveyed by Parry()
        }
        else{
            target.health -= this.strength;
            returnString = this.name + " attacked " + target.name + "!";
        }
        return returnString;
    }

    //Block
    BeginBlock(){
        if(!isVunerable){
            this.isBlocking = true;
        }
        else{
            this.isBlocking = false;
        }
    }

    Block(){
        return this.name + " blocked!";
    }

    //Parry
    BeginParry(){
        if(!this.isVunerable){
            this.isParrying = true;
        }
        else{
            this.isParrying = false;
        }
    }

    Parry(target){
        if(target.isAttacking){
            target.health -= this.strength;
            return this.name + " successfully parries and ripostes!";
        }
        else{
            this.isVunerable = true;
            return this.name + " missed a parry!"
        }
    }

    //resets statuses for next move
    ResetStatus(){
        this.isAttacking = false;
        this.isBlocking = false;
        this.isParrying = false;
        if(this.vunerableTime > 1){
            this.vunerableTime = 0;
            this.isVunerable = false;
        }
    }

    //updates whether a character is alive or dead
    UpdateStatus(){
        if (this.health <= 0){
            this.alive = false;
        }
    }
}

//Player and Enemy are subclasses of Character
/*When exploration is implemented, there will be an array of enemies and the game will 
end if the player successfully beats all enemies*/
class Player extends Character{
    constructor(x, y, name, health, strength, alive, inventory){
        super(x, y, name, health, strength, alive, inventory);
        this.isUsingPotion = isUsingPotion;
    }

    //same as the other begin->effect functions in Character class
    BeginUsingPotion(){
        this.isUsingPotion = true;
    }

    UsePotion(){
        //player will always use the first potion in the inventory
        if(this.inventory.length > 0){
            if(inventory[0].size == "Small"){
                this.health += 10;
                this.inventory.splice(0);
                //display different messages depending on if the player is in the middle of a fight
                if(fightActive){
                    return this.name + " used Small health potion!";
                }
                else{
                    return this.name + " used Small health potion! " + this.status();
                }
            }
            else if(inventory[0].size == "Medium"){
                this.health += 15;
                this.inventory.splice(0);
                if(fightActive){
                    return this.name + " used Medium health potion!";
                }
                else{
                    return this.name + " used Medium health potion! " + this.status();
                }
            }
        }
        else{
            return this.name + "'s inventory is currently empty!"
        }
    }

    //adds an item to player's inventory
    GetItem(currentArea){
        //if there is an item in the room, pick it up (does not change current message)
        if(currentArea.containsItem){
            this.inventory.push(currentArea.inventory[0])
            currentArea.containsItem = false;
            return "Got the " + currentArea.inventory[0].name + "!";
        }
        else{
            return "There is nothing here to pick up."
        }
    }

    //overload function for resetting all player attributes
    ResetStatus(){
        this.isAttacking = false;
        this.isBlocking = false;
        this.isParrying = false;
        if(this.vunerableTime > 1){
            this.vunerableTime = 0;
            this.isVunerable = false;
        }
        this.isUsingPotion = false;
    }
}

class Enemy extends Character{
    constructor(x, y, name, health, strength, alive, inventory){
        super(x, y, name, health, strength, alive, inventory);
    }
}

//Sets up Fight screen
function BeginFight(player, currentArea){
    backMusic.pause();
    backMusic.currentTime = 0;
    fightMusic.play();
    fightActive = true;
    inGameScreen.removeChild(gameContent);
    inGameScreen.removeChild(currentAreaName);
    gameContent.anchor.set(.5);
    gameContent.x = game.view.width/2;
    gameContent.y = game.view.height/2;
    enemy = GetEnemy(currentArea);
    currentAreaName.text = enemy.name;
    inGameScreen.addChild(currentAreaName);
    if(enemy != undefined){
        gameContent.text = "COMBAT START" + "\n\n" + enemy.status() + "\n" + player.status() +"\nPress one of the action keys!";
        inGameScreen.addChild(gameContent);
        NextTurn(player, enemy);
    }
}

//Starts next turn- sets what enemy will do with RNG before user enters a value
function NextTurn(player, enemy){
    //enemy will always attack if player is vunerable to avoid abuse of parry
    if(!player.isVunerable){
        //randomly select an action for the enemy to do
        //number between 1 and 3
        let randomAction = Math.floor(Math.random() * 3) + 1;
        //make sure the enemy does something different each time
        while(randomAction == lastRand){
        randomAction = Math.floor(Math.random() * 3) + 1;
        }
        lastRand = randomAction;
        switch(randomAction){
            case 1:
                enemy.BeginAttack();
                break;
            case 2: 
                enemy.BeginBlock();
                break;
            case 3:
                enemy.BeginParry();
                break;
        }
    }
    else{
        enemy.BeginAttack();
    }
    //let player do an action
}

//After User gives input, show results of each combatant's action
function TurnResult(){
    //Selection Results
    inGameScreen.removeChild(gameContent);
    gameContent.text = "";
    gameContent.anchor.set(.5);
    gameContent.x = game.view.width/2;
    gameContent.y = game.view.height/2;

    //check whether each combatant can act at all
    if(player.isVunerable && enemy.isVunerable){
        gameContent.text += "Both combatants were too dazed to act this turn!";
    }
    else{
        if(!enemy.isVunerable){
            if(enemy.isAttacking){
                gameContent.text += enemy.Attack(player);
            }
            else if(enemy.isParrying){
                gameContent.text += enemy.Parry(player);
            }
            else if(enemy.isBlocking){
                gameContent.text += enemy.Block();
            }
        }
        else{
            gameContent.text += enemy.name + "was too dazed to act!"
        }
    
        if(!player.isVunerable){
            if(player.isAttacking){;
                gameContent.text += "\n" + player.Attack(enemy);
            }
            else if(player.isParrying){
                gameContent.text += "\n" + player.Parry(enemy);
            }
            else if(player.isBlocking){
                gameContent.text += "\n" + player.Block();
            }
            else if(player.isUsingPotion){
                gameContent.text += "\n" + player.UsePotion();
            }
        }
        else{
            gameContent.text += "\n" + player.name + " was too dazed to act!"
        }
    }

    //if any combatants were vunerable this turn, increment time vunerable so that they are not vunerable next turn
    if(enemy.isVunerable){
        enemy.vunerableTime++;
    }
    if(player.isVunerable){
        player.vunerableTime++;
    }

    //Reset character statuses
    player.ResetStatus();
    enemy.ResetStatus();

    //Update alive statuses
    player.UpdateStatus();
    enemy.UpdateStatus();

    //give user an idication of current stats
    gameContent.text += "\n\n" + enemy.status();
    gameContent.text += "\n" + player.status();

    gameContent.text += "\n\n" + "Hit another action key to continue the fight!"

    inGameScreen.addChild(gameContent);

    //check if both fighters are still alive
    if(player.alive && enemy.alive){
        NextTurn(player, enemy);
    }
    else{
        EndFight();
    }
}

//creates an enemy to fight if the room "containsEnemy"
function GetEnemy(currentArea){
    if(!currentArea.containsEnemy){
        return;
    }
    else{
        let inventory = [];
        inventory.push(createPotion("Medium"));
        if(currentArea.name == "Throne Room"){
            return new Enemy(null, null, "Rex Ossium", 60, 15, true, inventory);
        }
        else{
            return new Enemy(null, null, "Skeleton", 30, 10, true, inventory);
        } 
    }
}

//Triggers when either the player or enemy have no health remaining
function EndFight(){
    //Player Dies
    if (!player.alive){
        fightMusic.pause();
        fightMusic.currentTime = 0;
        backMusic.play();
        gameActive = false;
        fightActive = false;
        startScreen.visible = false;
        instructionScreen.visible = false;
        inGameScreen.visible = false;
        gameOverScreen.visible = true;
    }
    //Game Win
    else if(enemy.name == "King Bonius"){
        fightMusic.pause();
        fightMusic.currentTime = 0;
        menuMusic.currentTime = 0;
        menuMusic.play();
        inGameScreen.removeChild(gameContent);
        gameContent.text = "Congratulations!\nYou successfully purged the evil from these\nlands and your deeds will be long remembered!";
        gameContent.anchor.set(.5);
        gameContent.x = game.view.width/2;
        gameContent.y = game.view.height/2;
        inGameScreen.addChild(gameContent)
        gameActive = false
        fightActive = false;
    }
    //Regular fight win
    else{
        currentArea.containsEnemy = false;
        currentArea.visited = true;
        inGameScreen.removeChild(gameContent);
        gameContent.text = "You Won!";
        if(enemy.inventory.length > 0){
            player.inventory.push(enemy.inventory[0])
            gameContent.text += "\nYou recieved '" + enemy.inventory[0].name + "'!"
        }
        gameContent.text += "\n\nHit 'R' to continue.";
        gameContent.anchor.set(.5);
        gameContent.x = game.view.width/2;
        gameContent.y = game.view.height/2;
        inGameScreen.addChild(gameContent)
        fightActive = false;
    }
}

//Gets user input during the fight sequences
function getInput(e){
    if(gameActive && fightActive){
        switch(e.key){
            case "a":
                player.BeginAttack();
                TurnResult();
                break;
            case "b":
                player.BeginBlock();
                TurnResult();
                break;
            case "p":
                player.BeginParry();
                TurnResult();
                break;
            case "u":
                player.BeginUsingPotion();
                TurnResult();
                break;
            case "c":
                if(!fightControlScreen.visible){
                    fightControlScreen.visible = true;
                    inGameScreen.visible = false;
                }
                else{
                    fightControlScreen.visible = false;
                    inGameScreen.visible = true;
                }
                break;
        }
    }
    else if(gameActive && !fightActive){
        switch(e.key){
            case "r":
            fightMusic.pause();
            fightMusic.currentTime = 0;
            backMusic.play();
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
            break;
        }
    }
    
}