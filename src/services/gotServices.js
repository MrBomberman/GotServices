// get запрос - берем данные
// fetch('https://jsonplaceholder.typicode.com/posts/1') // глобальный метод - вызывается просто так, во внутрь помещаем путь, к чему мы обращаемся, делаем запрос к серверу в ответ получая промис
//     .then((response) => {
//         return response.json(); // вернет промис
//     }) // вернет ответ от сервера преобразованный командой json - в нужном нам формате
//     .then((myJson) => console.log(myJson)); // выводим в консоль ответ на json уже обработанный

// отправляем данные
// let url = 'https://jsonplaceholder.typicode.com/posts/'
// let data = {username: 'example'};
// fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data), // помещаем объект, который будем отправлять в формате json
//     headers: { // прописываем необходимые заголовки при запрсое

//         'Content-type': 'application/json'
//     }
// }) // второй аргумент - настройки нашего fetch
// .then((response) => response.json())
// .then((myJson) => console.log('Success', myJson))
// .catch(error => console.error('Error', error)); //  будем выводить ошибку в случае проблемы


// проект

export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'; // указываем статичные данные через переменную
    }

    getResource =  async (url) => { // делаем классический метод
        const res = await fetch(`${this._apiBase}${url}`); // создаем fetch с нашим адресом/ также ждем, когда придет результат
        // первая часть у нас всегда сформирована, вторую часть передает пользователь
        if (!res.ok) { // првоеряем ответ от сервера
            throw new Error(`Could not fetch ${url}, status : ${res.status}`) // если нет ответа от сервера, создае свою ошибку со статусом
        }


        return await res.json();
    }

    getAllCharacters =  async () => { // метод вернет промис, который мы сможем обработать
        const res = await this.getResource("/characters?page=5&pageSize=10"); // обязательно обращаемся к контексту - каждый раз новый экземпляр - передаем url
        return res.map(this._transformCharacter); // перебираем полученный массив объектов, трансформируя каждого персонажа в объект
    }

    getChatacter = async (id) => {
        const character =  await this.getResource(`/characters/${id}`); // поиск персонажа по id
        return this._transformCharacter(character); // трансформируем полученный объект
    }

    getAllHouses = async () => {
        const houses = await this.getResource('/houses');
        return houses.map(this._transformHouse); // перебираем полученный массив объектов, трансформируя каждую книгу в нужный объект
    }

    getHouse = async (id) =>  {
        const house = await this.getResource(`/houses/${id}`); // получим один дом
        return this._transformHouse(house);
    }

    getAllBooks = async () => {
        const books = await this.getResource('/books');
        return books.map(this._transformBook); 
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _extractId = (item) => { // определяет id элемента
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }  


    isSet(data) { // функция проверяет свойство объекта, если его нет, возвращает строку
        if (data) {
            return data
        } else {
            return 'no data'
        }
    }    

    _transformCharacter = (character) => {
        return {
            id: this._extractId(character),
            name: this.isSet(character.name),
            gender: this.isSet(character.gender),
            born: this.isSet(character.born),
            died: this.isSet(character.died), 
            culture: this.isSet(character.culture)
        };
    }


    // чтобы трансформировать данные, которые нам приходят
    // _transformCharacter = (character) => { 
    //     return {
    //         id: this._extractId(character) === '' ? 'no data' : character.id,
    //         name: character.name === '' ? 'no data' : character.name, // пришел персонаж - вытащили определенное свойство
    //         gender: character.gender === '' ? 'no data' : character.gender,
    //         born: character.born === '' ? 'no data' : character.born,
    //         died: character.died === '' ? 'no data' : character.died,
    //         culture: character.culture === '' ? 'no data' : character.culture
    //     }
    // }




    _transformHouse = (house) => {
        return{
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles:this.isSet( house.titles),
            overlord:this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }

    // нам необходимы функции трансформаторы, так как не все апи поддерживают нужные нам case

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}

// const got = new GotService(); // создаем новый экземпляр нашего сервиса
// got.getAllCharacters()
//     .then(res => {
//         res.forEach(item => console.log(item.name)); // выводим в консоль имя каждого элемента
//     });

// got.getChatacter(130)
//     .then(res => console.log(res));

// got.getAllHouses()
//     .then(res => {
//         res.forEach(item => {
//             console.log(item.name); // вывести каждый дом
//         })
//     })

// got.getHouse(5)
//     .then(res => console.log(res));

// got.getAllBooks()
//     .then(res => {
//         res.forEach(item => console.log(item.name));
//     })


// got.getBook(4)
//     .then(res => console.log(res));