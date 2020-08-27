class FormValidator {
    constructor(formContainer) {
        this.formContainer = formContainer;
        this.submitButton = formContainer.querySelector('.popup__button');
        this.submitButton.classList.add('popup__button_on');
        /*
            Можно лучше: сделать класс FormValidator более универсальным и обрабатывать все
            поля ввода на форме, а не только два
        */
        this.input1 = formContainer.querySelectorAll('input')[0];
        this.input2 = formContainer.querySelectorAll('input')[1];
        this.error1 = formContainer.querySelectorAll('span')[0];
        this.error2 = formContainer.querySelectorAll('span')[1];
    };

    setDefaultValue() {
        this.input1.value = "";
        this.input2.value = "";
        this.error1.style.display = "none";
        this.error2.style.display = "none";
    }

    validateInputLength(inputValue) {
        if (inputValue.length > 1 && inputValue.length < 29) {
            return true;
        }
        return false;
    }

    showError(input, errorElement) {
        const inputValue = input.value;
        if (inputValue.length === 0) {
            errorElement.style.display = "inline";
              /*
                Можно лучше: сообщения об ошибках вынести в отдельный объект, а не хардкодить их в функции
                Если понадобится перевести приложение на другой язык можно будет передавать функции другой объект
                errorMessages = {
                    empty: 'Это обязательное поле',
                    wrongLength: 'Должно быть от 2 до 30 символов'
                    ......
                }
                И передавать этот объект в конструктор класса, это может быть полезным,
                если придется перевести приложение на другой язык
            */
            errorElement.textContent = "Это обязательное поле";
        }
        if (inputValue.length === 1 || inputValue.length > 29) {
            errorElement.style.display = "inline";
            errorElement.textContent = "должно быть от 2 до 30 символов";
        }
        if (this.validateInputLength(inputValue)) {
            errorElement.style.display = "none";
        }
    };

    validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    };

    showLinkError(input, errorElement) {
        const link = input.value;
        if (this.validateUrl(link)) {
            errorElement.style.display = "none";
        }
        else {
            errorElement.style.display = "inline";
            errorElement.textContent = "Здесь должна быть ссылка";
        };

    };

    setSubmitButtonState() {
        const input1Valid = this.validateInputLength(this.input1.value);
        let input2Valid = false;
        if (this.input2.type === "text") {
            input2Valid = this.validateInputLength(this.input2.value)
        } else if (this.input2.type === "url") {
            input2Valid = this.validateUrl(this.input2.value)
        };

        if (input1Valid && input2Valid) {
            this.submitButton.disabled = false;
            this.submitButton.classList.add('popup__button_on')
            console.log("test1");
        }
        else {
            this.submitButton.disabled = true;
            this.submitButton.classList.remove('popup__button_on')
            console.log("test2");
        };
    };

    checkInputValidity() {
        this.showError(this.input1, this.error1);
        if (this.input2.type === "text") {
            this.showError(this.input2, this.error2);
        } else if (this.input2.type === "url") {
            this.showLinkError(this.input2, this.error2);
        };
    };

    setEventListeners() {
        this.input1.oninput = () => this.showError(this.input1, this.error1);
        if (this.input2.type === "text") {
            this.input2.oninput = () => this.showError(this.input2, this.error2);
        } else if (this.input2.type === "url") {
            this.input2.oninput = () => this.showLinkError(this.input2, this.error2);
        };

        this.formContainer.oninput = () => this.setSubmitButtonState();
    };

}

