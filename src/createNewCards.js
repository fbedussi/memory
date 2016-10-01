function shuffle(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

function createNewCards(animalsNumber) {
    var animals = ['cat', 'donkey', 'teal', 'duck', 'monkey', 'dog', 'cow', 'chick', 'elephant', 'beaver', 'penguin', 'zebra', 'pig', 'lion', 'hen', 'bear' ];
    animals = animals.slice(0, animalsNumber);
    
    return shuffle(animals.concat(animals)).map((animal, i) => {
        return {
            id: i,
            changed: false,
            name: animal
        };
    });
}

export default createNewCards;