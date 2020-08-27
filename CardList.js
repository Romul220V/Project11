class CardList {
    constructor(container, cardDeck) {
        this.container = container;
        this.cardDeck = cardDeck;
    };

    addCard(card) {
        this.cardDeck.push(card);
        this.renderCard(card);
    };

    renderCard(card) {
        this.container.appendChild(card.createCard());
    }

    render() {
       this.cardDeck.forEach(element => this.renderCard(element));
    }
}