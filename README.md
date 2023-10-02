# Excursions App

The application is divided into two parts:
 - Client: 

 <video src="./src//assets/client.mp4" controls title="Title"></video>

 - Admin: 

<video src="./src/assets/admin.mp4" controls title="Title"></video>

### Client
This is the part related to what the user can do:

* Select a tour by entering the quantity of tickets in the appropriate form fields and clicking 'Dodaj do zamówienia'. This involves:
    * Data validation
    * Adding the order to the panel on the right, i.e., the cart
    * Updating the total price
* Confirm the order by entering the first name, last name, and email address in the order field and clicking 'Zamawiam'. This involves:
    * Data validation
    * Sending the order to the database (API powered by JSON Server)
    * Clearing the cart.

### Admin    
The management panel for tours stored in the database. Its functionalities include:

* Adding tours
* Deleting tours
* Modifying tours.

## The technologies used

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![JSON Server](https://img.shields.io/badge/JSON%20Server-6f736d?style=for-the-badge&logo=JSON&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-4f736d?style=for-the-badge&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![BEM Methodology](https://img.shields.io/badge/BEM%20Methodology-29BDfD?style=for-the-badge&logo=BEM&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Installation and configuration

In the project, [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) have been used. If you have them installed, enter the following in the terminal:

````
npm i
````

To open the application in developer mode, use the following command:

````
npm start
````

If you don't have the JSON server installed, enter the following command in the terminal:

```
npm install -g json-server@0.17
```

In another terminal, start the API:

```
json-server --watch ./data/excursions.json --port 3000
```

From now on, the API (depending on the resources) is available at the following address:

````
* http://localhost:3000/excursions – managing tours
* http://localhost:3000/orders – managing orders.
````

The application is available at the following address: 

````
* http://localhost:8080/index.html – client panel  
* http://localhost:8080/admin.html – admin panel
`````