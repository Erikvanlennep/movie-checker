# movie-checker
This app is an assignment from the Hogeschool Rotterdam. 

## What it does

The movie checker shows you a list of popular movies. You can search through specific movies by typing in the name. When clicked on a movie a description follows with the genres and the cast and crew. You can click on a genre or a person. When clicked on a genre it leads to a list of movies found by the genre you clicked. When clicked on a person a biography follows with a list of movies the person is known from. 

# Setup

## Prerequisites

* [Phpstorm](https://www.jetbrains.com/phpstorm/download/)

* [Node JS](https://nodejs.org/en/download/)

Clone the repo:
    
    $ git clone https://github.com/Erikvanlennep/movie-checker.git
    $ cd movie-checker/

## Npm install and update

1) run to update NPM: 

    $ npm install npm@latest -g

2) Install all node_modules by running:

    $ npm install
    
3) run the webapplication:

    $ npm start
    
4) the application should start automatically in the browser at:

    http://localhost:3000/



## Folder structure

    my-app
    ├── README.md
    ├── node_modules
    ├── package.json
    ├── .gitignore
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    └── src
        ├──components
        │   ├──app
        │   │   └── App.css
        │   │   └── App.js
        │   │   └── App.test.js
        │   │   └── global.css
        │   ├──home
        │   │   └── home.js
        │   ├──list
        │   │   └── movieList.js
        │   │   └── movieList.css
        │   ├──movie
        │   │   └── genre.js
        │   │   └── movieDetail.js
        │   │   └── movieDetail.css
        │   ├──person
        │   │   └── personDetail.css
        │   └──search
        │       └── search.css
        ├──images
        ├──models
        │   ├── genre.js
        │   ├── movie.js
        │   └── person.js
        ├── index.css
        ├── index.js
        └── registerServiceWorker.js
        
# App

You can find the app live here [Movie checker](http://eriklennep.nl/movie-checker/#/)

The app is tested at 3 platforms. 

![browser-test](/docs/browsertest.png "Browser-test in table")

# credentials

© 2017 Erik van Lennep