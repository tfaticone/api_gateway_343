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

## Forwarding

URLS will follow the same url as documented in each silos respective
documentation. The only change that will follow is the base URL will be replaced
with the production link and a prefix will be added for each silo. As in the url will
follow the syntax:

`https://api-gateway-343.herokuapp.com/{prefix}/{querystring}`

### Example

Original URL:
`http://kennuware-1772705765.us-east-1.elb.amazonaws.com/api/employee?id=4`

New URL
`https://api-gateway-343.herokuapp.com/hr-api/employee?id=4`

** Note if you have designated /api/ in your base URL you will NOT need to retype is as shown in the example.

#### Prefixes

The Prefixes with pertaining base urls are as follows:

Silo | Prefix | Base URL
--- | --- | ---
HR | `hr-api` | `http://kennuware-1772705765.us-east-1.elb.amazonaws.com/api`
Sales | `sales-api` | `http://54.242.81.38:8080`
Accounting | `accounting-api` | `N/A`
Customer support | `cs-api` | `https://api-customerservice.azurewebsites.net/api`
Manufacturing | `manufacturing-api` | `https://343-2175-manufacturing.azurewebsites.net`
Inventory | `inventory-api` | `https://inventory343.azurewebsites.net/api`

** If this information is incorrect or missing, please fix it, make a pull request, and alert HR.
