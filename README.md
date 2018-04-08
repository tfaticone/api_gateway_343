# api_gateway_343

## Production Link
[https://api-gateway-343.herokuapp.com/](https://api-gateway-343.herokuapp.com/)

## Description
This repository is for the API gateway. This gateway will provide authentication and tokens 
that will be used for any authenticated API calls. Furthermore, this will act as an intermediary between
all the silos. Specifically, all silos that need to do an API call will contact the API gateway instead of
going directly to the API.

## Owners

### HR Silo
- Zachary DiPasquale <zrd5307@rit.edu>
- Thomas Faticone <tjf4881@rit.edu>
- Ephraim Gbadebo <exg1977@rit.edu>
- Jarrod Cummings <jmc9961@rit.edu>

## To run on local
1. cd into project directory
2. run `npm install` to get all node modules.
3. run `node index.js` to run a node server.
4. The server should return a success message and the server should be accessible via `localhost:3000`

## To run tests
1. cd into project directory
2. run `npm install` to get all node modules.
3. run `npm test` to run all unit tests

Tests Live in the /unit_test/
