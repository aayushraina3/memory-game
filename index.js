document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: 'ethereum',
            img: 'images/ethereum.png'
        },
        {
            name: 'ethereum',
            img: 'images/ethereum.png'
        },
        {
            name: 'doge',
            img: 'images/doge.png'
        },
        {
            name: 'doge',
            img: 'images/doge.png'
        },
        {
            name: 'ripple',
            img: 'images/ripple.png'
        },
        {
            name: 'ripple',
            img: 'images/ripple.png'
        },
        {
            name: 'litecoin',
            img: 'images/litecoin.png'
        },
        {
            name: 'litecoin',
            img: 'images/litecoin.png'
        },
        {
            name: 'tether',
            img: 'images/tether.png'
        },
        {
            name: 'tether',
            img: 'images/tether.png'
        },
        {
            name: 'bittorrent',
            img: 'images/bittorrent.png'
        },
        {
            name: 'bittorrent',
            img: 'images/bittorrent.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    var cardSelected = []
    var cardSelectedID = []
    var cardsWon = []

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++){
            let card = document.createElement('img')
            card.setAttribute('src', 'images/blank.jpeg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipcard)
            
            // APPEND TO GRID
            grid.appendChild(card)
        }
    }

    function flipcard() {
        let cardID = this.getAttribute('data-id')
        cardSelected.push(cardArray[cardID].name)
        cardSelectedID.push(cardID)
        
        // DISPLAY IMAGE AT THIS LOCATION
        this.setAttribute('src', cardArray[cardID].img)

        if(cardSelected.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }

    function checkForMatch(){
        let cards = document.querySelectorAll('img')
        if(cardSelected[0] === cardSelected[1]){
            alert('Correct')
            cards[cardSelectedID[0]].setAttribute('src', 'images/white.png')
            cards[cardSelectedID[1]].setAttribute('src', 'images/white.png')
            cardsWon.push(cardSelected)
        }else {
            alert('try again')
            cards[cardSelectedID[0]].setAttribute('src', 'images/blank.jpeg')
            cards[cardSelectedID[1]].setAttribute('src', 'images/blank.jpeg')
        }
        
        cardSelected = []
        cardSelectedID = []
        if(cardsWon.length == cardArray.length/2) alert ('Congrats. Game Won!')
    }

    createBoard()
})