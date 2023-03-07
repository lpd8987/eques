/*The map is made up 10 small areas which have specific connections to get to other places and 
may contain an item and/or and enemy*/

let left;
let right;
let bottom;
let above;

//Connections are constant because they will not change
//build an array of connections for area building
let connections = [];
//connection = [left above right down], if null, no neighbor there

const CONNECTED0 = [null, null, 1, null];
connections.push(CONNECTED0);

const CONNECTED1 = [0, 5, 2, null];
connections.push(CONNECTED1);

const CONNECTED2 = [1, null, 3, null];
connections.push(CONNECTED2);

const CONNECTED3 = [2, null, null, null];
connections.push(CONNECTED3);

const CONNECTED4 = [null, 7, 5, null];
connections.push(CONNECTED4);

const CONNECTED5 = [4, null, 6, 1];
connections.push(CONNECTED5);

const CONNECTED6 = [5, null, null, null];
connections.push(CONNECTED6);

const CONNECTED7 = [null, null, 8, 4];
connections.push(CONNECTED7);

const CONNECTED8 = [7, 9, null, null];
connections.push(CONNECTED8);

const CONNECTED9 = [null, null, null, 8];
connections.push(CONNECTED9);

//Area nameList are also constant 
//build an array of nameList for area building
let nameList = [];

const NAME0 = "Forest Nook";
nameList.push(NAME0);

const NAME1 = "Forest Entrance";
nameList.push(NAME1);

const NAME2 = "Deep Forest";
nameList.push(NAME2);

const NAME3 = "Cave";
nameList.push(NAME3);

const NAME4 = "Forest Exit";
nameList.push(NAME4);

const NAME5 = "Forest Edge";
nameList.push(NAME5);

const NAME6 = "Hidden Lake";
nameList.push(NAME6);

const NAME7 = "Castle Entrance";
nameList.push(NAME7);

const NAME8 = "Great Hall";
nameList.push(NAME8);

const NAME9 = "Throne Room";
nameList.push(NAME9);

//Area descriptions
let descriptions = [];

const DESCRIP0 = "You find yourself in a small nook of the forest,\nseemingly a bit brighter than the other parts of the forest.\nIt feels almost cheerful here.\nThere is a potion on the ground.\nThere is no other way to go but BACK into the forest.";
descriptions.push(DESCRIP0);

const DESCRIP1 = "You stand at the entrance of the dark forest.\nThough maintaining its mostly green color, it is\nclear that this forest is not as lively as it\nonce was, perhaps you can change that.\nThere is light shining out from a nook to your LEFT.\nThere is a clearing in the brush AHEAD.\nThere is a cave in the distance to your RIGHT.";
descriptions.push(DESCRIP1);

const DESCRIP2 = "As you move toward the cave, you reach\nanother clearing where you spot a Skeleton.\nA moving skeleton.\nIt might attack if you continue toward the cave.\nThe cave is to your RIGHT.\nThe Forest Entrance is to your LEFT.";
descriptions.push(DESCRIP2);

const DESCRIP3 = "Finally at the cave, you peer inside.\nThere is another Skeleton appearing to guard\nsome sort of glass bottle.\nThe Forest Entrance is in the distance to your LEFT.";
descriptions.push(DESCRIP3);

const DESCRIP4 = "Following the Sign's direction, you come to the Forest's\nexit and see the Castle looming just AHEAD of you.\nThe clearing with the sign is to your RIGHT.";
descriptions.push(DESCRIP4);

const DESCRIP5 = "Pushing deeper into the forest, you find a clearing with\na sign 'CASTELLUM INGENTEM' pointing to the LEFT.\nYou also spot a lake in a clearing to your RIGHT.\nThe Forest Entrance is BEHIND you.";
descriptions.push(DESCRIP5);

const DESCRIP6 = "Venturing toward the lake, you feel a serene\ncalm in the midst of the dark woods. A skeleton, seemingly\nentranced its reflection in the lake, stands on the other side.\nThe clearing with the sign is to your LEFT.";
descriptions.push(DESCRIP6);

const DESCRIP7 = "You enter the gate of the Castle.\nYou arent sure why, but you feel the great evil must be residing beyond its walls.\nYou spot something moving in the Great Hall to your RIGHT,\nA skeleton blocking the entrance to the Hall blocks your view.\nIt will definitely attack if\nyou attempt to venture further into the castle.\nThe Forest Exit is BEHIND you.";
descriptions.push(DESCRIP7);

const DESCRIP8 = "Reaching the Great Hall, you see the remains of\nwhat was once a bright and extravagant room- now dull,\nwith its roof and walls noticeably cracking.\nA skeleton guards a set of doors AHEAD of you, presumably to what was\nonce the Throne Room.\nThe Castle Entrance is to your LEFT.";
descriptions.push(DESCRIP8);

const DESCRIP9 = "You push open the mighty doors to the Throne room.\nThough the rest of the room is in obvious disarray,\nthe throne seems rather well preserved. Sitting upon\nthis throne is a Skeleton with a Crown upon its head and\na glowing scepter in its hand. This must be the root of\nthe evil plaguing this land.\nThe Great Hall is BEHIND you.";
descriptions.push(DESCRIP9);

//alternate area descriptions (post defeat enemy or on return)
let altDescrip = [];

const ALTDESCRIP0 = "You again find yourself in a small nook of the forest.\nIt is the most calming place in the forest after all.\nThere is no other way to go but BACK into the forest.";
altDescrip.push(ALTDESCRIP0);

const ALTDESCRIP1 = "You return to the entrance of the dark forest.\nPerhaps you missed something?\nThere is light shining out from a nook to your LEFT.\nThere is a clearing in the brush AHEAD.\nThere is a cave in the distance to your RIGHT.";
altDescrip.push(ALTDESCRIP1);

const ALTDESCRIP2 = "The clearing is now skeleton free.\nThe cave is to your RIGHT.\nThe Forest Entrance is to your LEFT.";
altDescrip.push(ALTDESCRIP2);

const ALTDESCRIP3 = "With the skeleton gone, you look around, you notice paintings upon\nThe walls are painted with strange pictures. One appears to be\nA picture of a Skeleton with a Crown and Staff. How Peculiar.\nThe Forest Entrance is in the distance to your LEFT.";
altDescrip.push(ALTDESCRIP3);

const ALTDESCRIP4 = "Following the Sign's direction, you again come to the Forest's\nexit and see the Castle looming just AHEAD of you.\nThe clearing with the sign is to your RIGHT.";
altDescrip.push(ALTDESCRIP4);

const ALTDESCRIP5 = "You return to clearing with\nthe sign now noticeably shattered upon the ground\n however, it is still pointing to the LEFT.\nThe lake clearing is to your RIGHT.\nThe Forest Entrance is BEHIND you.";
altDescrip.push(ALTDESCRIP5);

const ALTDESCRIP6 = "This Lake feels somehow more calming without angry skeletons around.\nThe clearing with the sign is to your LEFT.";
altDescrip.push(ALTDESCRIP6);

const ALTDESCRIP7 = "One more room skeleton free.\nThe Great Hall is to your RIGHT.\nThe Forest Exit is BEHIND you.";
altDescrip.push(ALTDESCRIP7);

const ALTDESCRIP8 = "The cracks in the roof and walls have grown bigger? Slightly alarming.\nThe Throne Room lies AHEAD of you.\nThe Castle Entrance is to your LEFT.";
altDescrip.push(ALTDESCRIP8);

const ALTDESCRIP9 = "You return to the Throne Room.\nThe Crowned Skeleton is now standing, closer to the door than when last you\nwere here. Best defeat him now before he begins wandering the Castle.\nThe Great Hall is BEHIND you.";
altDescrip.push(ALTDESCRIP9);


//Area Class Declaration
class Area extends PIXI.Sprite{
    constructor(name, connected, containsEnemy, containsItem, description, alternateDescription, inventory, visited){
        super();
        this.name = name;
        this.connected = connected;
        this.containsEnemy = containsEnemy;
        this.containsItem = containsItem;
        this.description = description;
        this.alternateDescription = alternateDescription;
        this.inventory = inventory;
        this.visited = visited;
    }
}

//Potions are the availible pickups in the game
class Potion extends PIXI.Sprite{
    constructor(name, size){
        super();
        this.name = name;
        this.size = size;
    }
}

//builds a map of connected area objects
function SetupAreas(){
    //local variables
    let areas = [];
    let inventory = [];
    let visited = false;
    let areaContainsEnemy;
    let areaContainsItem;
    //create new areas
    for (let i = 0; i < 10; i++){
        if(i == 2 || i == 3 || i >= 6){
            areaContainsEnemy = true;
        }
        else{
            areaContainsEnemy = false;
        }
        if(i == 0 || i == 3 || i == 4){
            areaContainsItem = true;
        }
        else{
            areaContainsItem = false;
        }
        let newArea = new Area(nameList[i], connections[i], areaContainsEnemy, areaContainsItem, descriptions[i], altDescrip[i],inventory, visited);
        if(newArea.containsItem){
            newArea.inventory.push(createPotion("Small"));
        }
        areas.push(newArea);
    }
    //setup neighbor connections for traversal
    for(let i = 0; i < areas.length; i++){
        for(let j = 0; j < areas[i].connected.length; j++){
            switch (j){
                case 0:
                    if(areas[i].connected[0] != null){
                        areas[i].left = areas[areas[i].connected[0]];
                    }
                    else{
                        areas[i].left = null;
                    }
                    break;
                case 1:
                    if(areas[i].connected[1] != null){
                        areas[i].above = areas[areas[i].connected[1]];
                    }
                    else{
                        areas[i].above = null;
                    }
                    break;
                case 2:
                    if(areas[i].connected[2] != null){
                        areas[i].right = areas[areas[i].connected[2]];
                    }
                    else{
                        areas[i].right = null;
                    }
                    break;
                case 3:
                    if(areas[i].connected[3] != null){
                        areas[i].bottom = areas[areas[i].connected[3]];
                    }
                    else{
                        areas[i].bottom = null;
                    }
                    break;
            }
        }
    }
    return areas;
}

//Exploration Methods
function GoLeft(currentArea){
    if (currentArea.left != null){
        if(!currentArea.visited){
            currentArea.visited = true;
        }
        currentArea = currentArea.left;
        return currentArea;
    }
    else{
        return currentArea;
    }
}

function GoRight(currentArea){
    if (currentArea.right != null){
        if(!currentArea.visited){
            currentArea.visited = true;
        }
        currentArea = currentArea.right;
        return currentArea;
    }
    else{
        return currentArea;
    }
}

function GoUp(currentArea){
    if (currentArea.above != null){
        if(!currentArea.visited){
            currentArea.visited = true;
        }
        currentArea = currentArea.above;
        return currentArea;
    }
    else{
        return currentArea;
    }
}

function GoBack(currentArea){
    if (currentArea.bottom != null){
        if(!currentArea.visited){
            currentArea.visited = true;
        }
        currentArea = currentArea.bottom;
        return currentArea;
    }
    else{
        return currentArea;
    }
}

//size is a string (small, medium, large)
function createPotion(size){
    return newPotion = new Potion(size + " Potion", size);
}