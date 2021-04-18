// Create Dino Mixin
let DinoMixin = {
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    compareHeight: function(humanHeight) {
        let heightRatio = (this.height / humanHeight).toFixed(2);
        if (this.height > humanHeight) {
            return `The ${this.species} is ${heightRatio} times taller than you!`;
        }
        else if (this.height < humanHeight) {
            return `The ${this.species} is ${heightRatio} times shorter than you!`;
        }
        else {
            return `The ${this.species} is as tall as you!`;
        }
    }, 
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    compareWeight: function(humanWeight) {
        let weightRatio = (this.weight / humanWeight).toFixed(2);
        if (this.weight > humanWeight) {
            return `The ${this.species} is ${weightRatio} times heavier than you!`;
        }
        else if (this.weight < humanWeight) {
            return `The ${this.species} is ${weightRatio} times lighter than you!`;
        }
        else {
            return `The ${this.species} is the same weight as you!`;
        }
    },
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    compareDiet: function(humanDiet) {
        if (this.diet === humanDiet) {
            return `The ${this.species} has your same diet!`;
        }
        else {
            return `The ${this.species} has a different diet than you!`;
        }
    },
    getImage: function () {
        return `./images/${this.species.toLowerCase()}.png`
    }
};


// Create Dino Objects
dinos.forEach(function(item){
    Object.assign(item, DinoMixin)
});

// Create Human Object
let human = {};
// Use IIFE to get human data from form
let getHuman = function() {
    const human = (function () {
    let getName = () => document.getElementById("name").value;
    let feet = document.getElementById("feet").value;
    let inches = document.getElementById("inches").value;
    let getHeight = () => Number(feet) * 12 + Number(inches);
    let getWeight = () => Number(document.getElementById("weight").value);
    let getDiet = () => document.getElementById("diet").value;
    let getImage = () => `./images/human.png`;
    return {
        name: getName(),
        height: getHeight(),
        weight: getWeight(),
        diet: getDiet(),
        image: getImage()
    };
})();
return human;
};

// Choose a random fact
let getRandomFact = function(dino, human){
    if (dino.species === 'Pigeon') {
        return dino.facts;
    };
    
    dino.facts.push(
        dino.compareHeight(human.height),
        dino.compareWeight(human.weight),
        dino.compareDiet(human.diet)
    )
    
    const r = Math.floor(Math.random() * Math.floor(dino.facts.length));
    return dino.facts[r];
};

// Tile constructor
function Tile(species, image, fact) {
    this.species = species;
    this.image = image;
    this.fact = fact;
  }


// Generate Tiles for each Dino in Array
// Add tiles to DOM
const makeTiles = function() {
    let tiles = [];
    for(let i = 0; i<=7; i++){
        tile = new Tile(dinos[i].species, dinos[i].getImage(), getRandomFact(dinos[i], human));
        tiles.push(tile);
    }

    humanTile = new Tile(human.name, human.image, "");
    tiles.splice(4, 0, humanTile);
        
    const grid = document.getElementById("grid");
    tiles.forEach(function(tile){
        let gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        grid.appendChild(gridItem);

        let name = document.createElement("h3");
        name.innerHTML = tile.species;
        gridItem.appendChild(name);

        let image = document.createElement("img");
        image.src = tile.image;
        image.alt = tile.species;
        gridItem.appendChild(image);

        let fact = document.createElement("p");
        fact.innerHTML = tile.fact;
        gridItem.appendChild(fact);
    })

    // Remove form from screen
    let myForm = document.getElementById("dino-compare");
    myForm.style.display = "none";
};


// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", (event) => {
    event.preventDefault;
    human = getHuman();
    makeTiles(); 
});

