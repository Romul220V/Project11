class CardList {
    constructor(container, cardDeck) {
        this.container = container;
        this.cardDeck = cardDeck;
    };

    addCard(card) {
        this.cardDeck.push(card);
        this.renderCard(card);
    };

    /*
        Надо исправить: класс CardList  жестко связан с классом Card т.к. самостоятельно создает его экземпляры
        Нужно передавать в конструктор класса CardList уже созданные карточки 
        const cards = initialCards.map(cardData => {
                const newCard = new Card(document, element.name, element.link)
                return newCard.create();
        })

        или передавать функцию, которая умеет создавать экземпляры необходимых
        классов, или передавать в карточку уже созданные

        Например использование функции которая создает экземпляры CardList:
        const createCard = (...args) => new Card(...args);  //функция которая создает карточку, объявляется в scripts.js
        
        class CardList {
            constructor(container, createCard) {   //передаем её в конструктор
                this.createCard = createCard;
                ............
            }

            addCard(name, link) {
                const cardElement = this.createCard(name, link); // для создания карточки вызываем эту функцию
                ............
        }  

        Теперь класс CardList не связан с классом Card и мы можем вставлять в него любые объекты
        просто изменим функцию передаваемую в его конструктор
    */
    renderCard(card) {
        this.container.appendChild(card.createCard());
    }

    render() {
        /*
            Можно лучше: перебор можно сделать через forEach
        */
       this.cardDeck.forEach(element => this.renderCard(element));
    }
}