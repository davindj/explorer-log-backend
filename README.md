# Explorer LOG API
An API for [Explorer LOG application](https://gitlab.com/davindx88/explorer-log)

## Software requirement
These are requirement software to run this project.
- [node.js](https://nodejs.org/en/)
- [mongodb](https://www.mongodb.com/)

## Installation
1. clone / download this project  
2. open this project in terminal  
3. install node dependencies
    ```console
    $ npm install
    ```  
4. setup environment variable `.env`. _notes: you can see env example in_ `.env.example`  
    ```console
    $ cp .env.example .env
    $ vi .env
    ```  
5. initialize database using script
    ```console
    $ npm run init-db
    ```
    or alternatively run `./script/initDb.js` using `node`
    ```
    $ node ./script/initDb.js
    ```

## How to Run
1. open this project in terminal
2. run project using start script
    ```console
    $ npm start
    ```