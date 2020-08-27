class Card {
    /* 
        Можно лучше: лучше передавать не отдельные параметры, а сразу весь объект с данными карточки,
        т.к. представьте что у карточки появится ещё одно свойство (например author) которое нужно будет отобразить
        Если у нас создание карточки вызывается как new Card(name,link), придется во всех местах
        где вызывается создание карточки переписывать её вызов с new Card(name,link)  на new Card(name, link, author) 
        Если ли же мы передаем просто объект карточки в функцию ( new Card(cardData) ) нам придется гораздо меньше менять программу
    */
    constructor(cardData, openImageCallback) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.openImageCallback = openImageCallback;
        this.imageClick = this.imageClick.bind(this);
        this.remove = this.remove.bind(this);
        /*
            Можно лучше: лучше привязать контекст обработчиков событий к контексту
            класса. Для этого можно воспользоваться методом bind 
            https://learn.javascript.ru/bind#reshenie-2-privyazat-kontekst-s-pomoschyu-bind
            https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            т.е. в конструкторе до настройки обработчиков событий:
            this.like = this.like.bind(this);
            this.remove = this.remove.bind(this);
            После привязки контекста внутри, обработчиков событий this будет ссылаться на
            экземпляр класса Card и можно обращаться к его свойствами
        */

    };
    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        };
    }

    remove() {
        this.placeImage.removeEventListener('click', this.imageClick);
        this.placeButtonLike.removeEventListener('click', this.like);
        this.placeButtonDel.removeEventListener('click', this.remove);
        this.placeCard.remove();
    };

    createCard() {
        const placeCard = document.createElement('div');
        const placeImage = document.createElement('div');
        const placeButtonDel = document.createElement('button');
        const placeDescrip = document.createElement('div');
        const placeHead = document.createElement('h3');
        const placeButtonLike = document.createElement('button');

        placeCard.classList.add('place-card');

        placeImage.setAttribute('style', 'background-image: url(' + this.link + ')');
        placeImage.classList.add('place-card__image');
        placeButtonDel.classList.add('place-card__delete-icon');
        placeDescrip.classList.add('place-card__description');
        placeHead.classList.add('place-card__name');
        placeHead.textContent = this.name;
        placeButtonLike.classList.add('place-card__like-icon');

        placeCard.appendChild(placeImage);
        placeImage.appendChild(placeButtonDel);
        placeCard.appendChild(placeDescrip);
        placeDescrip.appendChild(placeHead);
        placeDescrip.appendChild(placeButtonLike);
        placeButtonDel.addEventListener('click', this.remove);
        this.placeButtonDel = placeButtonDel;
        this.placeCard = placeCard;
        placeButtonLike.addEventListener('click', this.like);
        this.placeButtonLike = placeButtonLike;
        placeImage.addEventListener('click', this.imageClick);
        this.placeImage = placeImage;
        return placeCard;
    };

    imageClick(event) {
        /*
            Надо исправить: карточка должна отвечать только за саму карточку, и не уметь
            открывать попап изображения
            Нужно передавать в конструктор класса Card колбэк который умеет открывать 
            изображение и вызывать его при клике по изображению передавая туда ссылку на изображение
            Примерно так:
                //функция которая принимает картинку и открывает попап
                function openImagePopup(image) {
                    ...... здесь описывается как открыть попап изображения
                }

                //в класс карточки передается колбэк, теперь карточка не знает как устроен попап изображения
                //она просто вызывает переданный ей колбэк передавая в него url картинки
                //тем самым мы сделали класс Card отвечающим принципу единственной ответственности
                class Card {
                    constructor(name, link, openImageCallback) {
                        ......
                        this.openImageCallback = openImageCallback;
                        this.imageClick = this.imageClick.bind(this);
                    }

                    imageClick() { 
                        this.openImageCallback(this.link);
                    }
                }
        */

     this.openImageCallback(this.link);
    }
}