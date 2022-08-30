
// <form method="POST" action="/contact/by-mail">
// <h4>Formularz</h4>
// <h4>Skontaktuj się z nami</h4>
// <input type="email" name="yourEmail" placeholder="Wpisz swój email">
// <input type="email" name="email" placeholder="Wpisz email">
// <textarea name="content" placeholder="Wpisz treść wiadomości"></textarea>
// <button>
//     Wyślij wiadomość
// </button>
// </form> 

// Stwórz funkcję generateFormOnPattern która za argument przyjmuje zestaw danych zawierających ustawienia, która będzie generowała schemat formularza wg. poniższego przykładu:
// Dane wejściowe:

const testSettings = {
    action:'/contact/by-mail',
    method:'POST',
    inputs:[
        {type:'header'},
        {type:'header', label:'Skontaktuj się z nami'},
        {name:'yourEmail', type:'email', placeholder:'Wpisz swój email'},
        {type:'email'},
        {name:'content', type:'textarea', placeholder:'Wpisz treść wiadomości'},
        {type:'submit', label:'Wyślij wiadomość'}
    ]
}

class CustomForm {}







function generateFormOnPattern(settings: object){
    // return ...
}