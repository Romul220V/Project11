(function () {
    /*
        Можно лучше: initialCards теперь не нужен т.к. данные загружаются с сервера, можно удалить
    
    */
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        },
        {
            name: 'Нургуш',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
        },
        {
            name: 'Тулиновка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
        },
        {
            name: 'Остров Желтухина',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
        },
        {
            name: 'Владивосток',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
        }
    ];

    const api = new API({
        baseUrl: 'https://praktikum.tk/cohort12',
        headers: {
            authorization: 'cacecd25-6927-4bc6-841e-a9732a22d8d7',
            'Content-Type': 'application/json'
        }
    });

    const placesList = document.querySelector('.places-list');

    const popupImage = document.querySelector('.popup-image');////////////////////

    const popupImageClass = new Popup(popupImage);

    const dialog = document.querySelector('.popup_form_edit');

    const popupDialog = new Popup(dialog);

    const form = dialog.querySelector("form");
    const openFormButton = document.querySelector('.user-info__button');
    const closeFormButton = document.querySelector('.popup__close_form');

    const userInfoData = document.querySelector('.user-info__data');
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');

    const userInfo = new UserInfo(userInfoName, userInfoJob, "", "")

    const dialogUser = document.querySelector('.popup_user_edit');

    const popupUser = new Popup(dialogUser);

    const formUser = dialogUser.querySelector("form");
    const editProfileButton = document.querySelector('.user-info__edit');
    const closeUserButton = document.querySelector('.popup__close_user');

    const popupUserEdit = document.querySelector('.popup_user_edit');

    const popupFormEdit = document.querySelector('.popup_form_edit');

    const userForm = popupUserEdit.querySelector('.popup__form');

    const userValidator = new FormValidator(userForm);
    userValidator.setEventListeners();

    const placeForm = popupFormEdit.querySelector('.popup__form');

    const placeValidator = new FormValidator(placeForm);

    placeValidator.setEventListeners();

    function openImageCallback(url) {
        popupImage.classList.toggle('popup_is-opened');
        document.querySelector('.big_image').src = url;
    };

    const cardList = new CardList(placesList, []);

    api.getCards()
        .then((res) => {
            const newInitialCards = res.map((element) => new Card(element, openImageCallback));
            newInitialCards.forEach(element => cardList.addCard(element));
            cardList.render();
        })
        .catch((err) => {
            console.log(err);
        })
    /*
        Надо исправить: обработка ошибок должна быть здесь, в самом конце цепочки обработки промиса    ++++
    */

    cardList.render();

    openFormButton.onclick = () => {
        popupDialog.openClose();
        placeValidator.setDefaultValue();
        placeValidator.setSubmitButtonState();
    };

    closeFormButton.onclick = () => popupDialog.openClose;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = form.querySelector("input[name='name']").value;
        const link = form.querySelector("input[name='link']").value
        cardList.addCard(new Card({ name, link }, openImageCallback));
        popupDialog.openClose();
    });

    editProfileButton.onclick = () => {
        const inputName = formUser.querySelector("input[name='name']");
        const inputJob = formUser.querySelector("input[name='job']");
        popupUser.openClose();
        inputName.value = userInfoName.textContent;
        inputJob.value = userInfoJob.textContent;
        userValidator.checkInputValidity();
        userValidator.setSubmitButtonState();
    };

    closeUserButton.onclick = () => popupUser.openClose;

    formUser.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = formUser.querySelector("input[name='name']").value;
        const about = formUser.querySelector("input[name='job']").value;
        api.patchUser(name, about).then((res) => {
            userInfo.setUserInfo(name, about);
            userInfo.updateUserInfo();
            popupUser.openClose();
        })
            /*
                Надо исправить: обработка ошибок должна быть здесь, в самом конце цепочки обработки промиса   ++++
            */
            .catch((err) => {
                console.log(err);
            })
        /*
            Надо исправить: все изменения на странице должны происходить, только после того, как
            сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
            данные на странице сохраняться, то это может ввести пользователя в заблуждение

            Попап так же нужно закрывать только если сервер ответил подтверждением, иначе
            если запрос завершиться ошибкой, а попап закроется пользователь может подумать
            что данные сохранились, т.е. перенести закрытие попапа и очистку формы в блок then       ++++
        */
    });

    api.getUser()
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            userInfo.updateUserInfo();
        })
        .catch((err) => {
            console.log(err);
        })
    /*
        Надо исправить: обработка ошибок должна быть здесь, в самом конце цепочки обработки промиса    ++++
    */


})();

/*
    Хорошая работа, класс Api создан и запросы на сервер выполняются,
    но нужно исправить несколько замечаний:

    Надо исправить:
    - обработчик catch должен быть в самом конце цепочки, а не в классе Api
    - попап так же нужно закрывать только если сервер ответил подтверждением

    Можно лучше:
    - проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод
    -  initialCards теперь не нужен т.к. данные загружаются с сервера, можно удалить

*/
