# Excursions App

Aplikacja dzieli się na dwie części: Client oraz Admin

### Client

To część związana z tym, co może zrobić użytkownik:
* wybrać wycieczkę przez wprowadzenie ilości zamawianych biletów w odpowiednie pola formularza i kliknięcie `dodaj do zamówienia`. Wiąże się to z:
    * walidacją danych
    * dodawaniem zamówienia do panelu z prawej strony, tj. do koszyka
    * aktualizowaniem ceny za całość
* potwierdzić zamówienie poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcie `zamawiam`. Wiąże się to z:
    * walidacją danych
    * wysłaniem zamówienia do bazy danych (API uruchomione dzięki JSON Server)
    * wyczyszczeniem koszyka.


### Admin    
Panel zarządzania wycieczkami zapisanymi w bazie danych. Jego funkcjonalności to: 
* dodawanie wycieczek
* usuwanie wycieczek
* modyfikowanie wycieczek.


## Użyte technologie

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![JSON Server](https://img.shields.io/badge/JSON%20Server-6f736d?style=for-the-badge&logo=JSON&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-4f736d?style=for-the-badge&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![BEM Methodology](https://img.shields.io/badge/BEM%20Methodology-29BDfD?style=for-the-badge&logo=BEM&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Instalacja i konfiguracja

W projekcie zostały użyte [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Jeśli masz je zainstalowane, wpisz w terminalu: 

````
npm i
````

Aby otworzyć aplikację w trybie deweloperskim użyj komendy: 

````
npm start
````

Jeśli nie masz zainstalowanego JSON serwera wpisz w terminalu komendę:

```
npm install -g json-server@0.17
```

W kolejnym terminalu uruchom API:

```
json-server --watch ./db/data.json --port 3000
```

Od teraz API (w zależności od zasobów) jest dostępne pod adresem:

````
* http://localhost:3000/excursions – zarządzanie wycieczkami
* http://localhost:3000/orders – zarządzanie zamówieniami.
````

Aplikacja jest dostępna pod adresem: 

````
* http://localhost:8080/index.html – client panel  
* http://localhost:8080/admin.html – admin panel
`````