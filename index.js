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
            
            let card = createFlipCard(i); // default and array[i] image added to card
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipcard);

            // APPEND TO GRID
            grid.appendChild(card);
        }
    }

    function flipcard() {
        // flip card
        this.childNodes[0].style.transform = "rotateY(180deg)";
        this.removeEventListener('click', flipcard);
        
        let cardID = this.getAttribute('data-id');
        cardSelected.push(cardArray[cardID].name);
        cardSelectedID.push(cardID);

        if(cardSelected.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }

    function checkForMatch(){
        let cards = document.querySelectorAll('.flipCard')
        if(cardSelected[0] === cardSelected[1]){
            // alert('Correct')
            notify("Correct choice! :)");
            let correctImg1 = document.createElement('img');
            correctImg1.setAttribute('src', 'images/check-mark.png');

            let correctImg2 = document.createElement('img');
            correctImg2.setAttribute('src', 'images/check-mark.png');
            
            let targetFront1 = cards[cardSelectedID[0]].childNodes[0].childNodes[0];
            targetFront1.replaceChild(correctImg1, targetFront1.childNodes[0]);

            let targetFront2 = cards[cardSelectedID[1]].childNodes[0].childNodes[0];
            targetFront2.replaceChild(correctImg2, targetFront2.childNodes[0]);

            cards[cardSelectedID[0]].childNodes[0].style.transform = "rotateY(0deg)";
            cards[cardSelectedID[1]].childNodes[0].style.transform = "rotateY(0deg)";

            cards[cardSelectedID[0]].removeEventListener("click", flipcard);
            cards[cardSelectedID[1]].removeEventListener("click", flipcard);

            cardsWon.push(cardSelected);
        }else {
            // alert('try again')
            notify("try again :(");
            cards[cardSelectedID[0]].childNodes[0].style.transform = "rotateY(0deg)";
            cards[cardSelectedID[1]].childNodes[0].style.transform = "rotateY(0deg)";
            
            cards[cardSelectedID[0]].addEventListener('click', flipcard);
            cards[cardSelectedID[1]].addEventListener('click', flipcard);
        }
        
        cardSelected = []
        cardSelectedID = []
        if(cardsWon.length == cardArray.length/2){
            notify(`Congrats ${player}. Game Won!`);
        }
    }

    function createFlipCard(idx){
        const flipCard = document.createElement('div');
        flipCard.setAttribute('class', 'flipCard');

        const flipCardInner = document.createElement('div');
        flipCardInner.setAttribute('class', 'flipCardInner');

        const flipCardFront = document.createElement('div');
        flipCardFront.setAttribute('class', 'flipCardFront');

        const flipCardBack = document.createElement('div');
        flipCardBack.setAttribute('class', 'flipCardBack');

        let defaultImg = document.createElement('img');
        defaultImg.setAttribute('src', 'images/circle.png');

        cardImg = document.createElement('img');
        cardImg.setAttribute('src', cardArray[idx].img);
        
        flipCardFront.appendChild(defaultImg);
        flipCardBack.appendChild(cardImg);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        
        flipCard.appendChild(flipCardInner);

        return flipCard;
    }

    createBoard()

    function notify(message){
        console.log(message);
        let notification = document.querySelector(".notification");
        notification.innerHTML = message;
        notification.classList.add("notification-pop");
        
        setTimeout(() => {
            notification.innerHTML="";
            notification.classList.remove("notification-pop");
        }, 600);
    }

})

var player = "";

function startGame(){
    player = document.getElementById("playerName").value;
    document.querySelector(".overlay-wrapper").style.display = "none";
}