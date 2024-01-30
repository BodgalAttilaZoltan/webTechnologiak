let characters = []; //this will store the characters that has been created
let currentCharacter = null; //would have been used for changing a character but wasn't implemented therefore wasn't used
let readInCharacterIndex = 0; //would have been used to index where the character is for changing, wasn't implemented therefore wasn't used
let characterSelector = true; //stores which block we are currently watching, "creation" or "load in"

function getRndInteger(min, max) { //for generating random numbers for hp calculations
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function ChangingValueTo(id, value) { //value changing of an element if needed
    document.getElementById(id).innerHTML = value;
}

function GetValueOf(id) { //shortcut for simpler value reading
        return document.getElementById(id).value;
}

function GetHitDie(cl){ //based on the class returns the corresponding dice used for health points
    switch (cl) {
        case "wizard":
        case "sorcerer":
            return 6;
        case "artificer":
        case "bard":
        case "cleric":
        case "druid":
        case "monk":
        case "rogue":
        case "warlock":
            return 8;
        case "fighter":
        case "paladin":
        case "ranger" :
            return 10;
        case "barbarian":
            return 12;
        default:
            break;
    }
}

function readInStats(){ //reads the stats into an array to prepares them for character creation, returns the complete stat array
    let stats = [];
    stats[0] = GetValueOf("Strenght");
    stats[1] = GetValueOf("Dexterity");
    stats[2] = GetValueOf("Constitution");
    stats[3] = GetValueOf("Intelligence");
    stats[4] = GetValueOf("Wisdom");
    stats[5] = GetValueOf("Charisma");
    return stats;
}

function CalculateMaxHP(dice, lvl, avarage, cons){ //returns the maxHP by calculating it, should only be used once when creating a character
    let x = 0;
    x+=dice;
    x += cons*lvl;
    if (avarage) {
        for (let index = 0; index < lvl-1; index++) {
            x += dice /2 + 1
        }
    }
    else{
        for (let index = 0; index < lvl-1; index++) {
            x += getRndInteger(1, dice)
        }
    }
    return x;
}

class Character{
    hitdie;
    stats = [0,0,0,0,0,0];
    chClass;
    name;
    level;
    race;
    maxhp;
    currenthp;
    constructor(cl, chName, race, lvl, stats,avg) { //constructor for the data class we using
        this.chClass = cl;
        this.hitdie = GetHitDie(cl);
        this.name = chName;
        this.race = race;
        this.level = lvl;
        for (let index = 0; index < stats.length; index++) {
            this.stats[index] = stats[index];
        }
        this.maxhp = CalculateMaxHP(this.hitdie,lvl,avg,Math.round((stats[2]-11)/2));
        this.currenthp = this.maxhp;
    }
    //get's and set's for the class, but not necessary 
    getLvl(){
        return this.level;
    }
    getHitDie(){
        return this.hitdie;
    }
    getName() {
        return this.name;
    }
    getClass() {
        return this.chClass;
    }
    getRace() {
        return this.race;
    }
    getMaxHp(){
        return this.maxhp;
    }
    getCurrentHp(){
        return this.currenthp;
    }
    changeCurrentHpBy(value){
        this.currenthp += value;
    }
    GetStat(which){
        return this.stats[which];
    }
    getDiscription() { //a general description of the character in text format
        return this.getName() + ", " + this.getRace() + ", " + this.getClass() + ", " + this.getLvl() +"-th lvl, " +this.getCurrentHp() + "/" + this.getMaxHp() +
        " hp, STR: " +  this.GetStat(0) + " DEX: "+  this.GetStat(1) + " CON: "+  this.GetStat(2) + " INT: "+  this.GetStat(3) + " WIS: "+  this.GetStat(4) + " CHA: " + this.GetStat(5);
    }
}

function readInCharacter(){ //get's the general description of the currently selected character for display and displays it
     ChangingValueTo("characterDescP",characters[GetValueOf("CharacterSelection")].getDiscription());
}

function addCharacter(){ //add a character to the stored character list
    characters.push(new Character(GetValueOf("classes"),GetValueOf("Icname"),GetValueOf("races"),
    GetValueOf("level"),readInStats(),GetValueOf("average")))
}

function updateChSelector(){ //updates the character selector element to the currently stored characters
    var selector = document.getElementById("CharacterSelection");
    while (selector.length > 0) {
        selector.remove(selector.length-1);
    }
    for (let index = 0; index < characters.length; index++) {
        var newOption = document.createElement("option");
        newOption.value = index;
        newOption.text = characters[index].getName();
        selector.add(newOption);
    }
}

function SwitchSelecToCreateOrViseversa(){ //switches between 2 dirs by changing their display
    if (characterSelector) {
        updateChSelector();
        document.getElementById("CharacterCreator").style.display = "none";
        document.getElementById("CharacterSelector").style.display = "block";
        characterSelector = false;
    }
    else{
        document.getElementById("CharacterSelector").style.display = "none";
        document.getElementById("CharacterCreator").style.display = "block";
        characterSelector = true;
    }
}