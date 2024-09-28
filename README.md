# KEA Webshop

## Purpose
Simple webshop and end-to-end tests example. It uses:
- `json-server` and `sessionStorage` for user signup and login
- Fake Store API (https://fakestoreapi.com/) for product listing
- `localStorage` for the product cart
- Cypress for the end-to-end tests

## Instructions
1. Install JSON Server and Cypress: `npm i`
2. Run JSON Server: 
    - Windows: `json-server --watch data\users.json --host 127.0.0.1`
    - Linux or Mac: `json-server --watch data/users.json --host 127.0.0.1`
3. Update the `baseUrl` constant in `info.js` with JSON Server's URL (by default, http://localhost:3000)
4. Open the application in a browser

Note: The `--host` parameter when running JSON Server is very important, as otherwise Cypress has trouble running two services on different ports of the same service.

To run the end-to-end tests: `npx cypress run`
To open the visual run of the end-to-end tests: `npx cypress open`

## Tools
Cypress / JSON Server / JavaScript / Water.css / CSS3 / HTML5

## Author:
Arturo Mora-Rioja