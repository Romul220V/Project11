class Popup {
    constructor(containerPopup) {
        this.containerPopup = containerPopup;
        const closeButton = this.containerPopup.querySelector('img');
        closeButton.addEventListener('click', () => {
            this.openClose();
        });
    };

    openClose() {
        this.containerPopup.classList.toggle('popup_is-opened');
    };

}