class API {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    };
    getUser() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                authorization: this.headers.authorization,
            },
        })
        /*
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
        */

            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);//////////////////////////
            })
            /*
                Можно лучше: блоки .then((result) => { return result; })
                ничего не делают, можно убрать
            
            */
            .then((result) => {
                return result;
            })
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                authorization: this.headers.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);//////////////////////////
            })
            // .then((result) => { })
            .then((result) => {
                return result;
            })

    }

    patchUser(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about 
              })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((result) => {
            return result;
          })

    }
}