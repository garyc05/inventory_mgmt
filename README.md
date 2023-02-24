# Inventory Management 

## Tech Stack
- NodeJS
- ExpressJS
- Sequelize ORM
- Postgres 
- Docker


### Tech decision justifications

**NodeJS**
To achieve as much functionality as possible I used NodeJS (JavaScript) as it is the language I'm currently using most regularly.
For this relatively simple CRUD app, any modern server-side language could be used without issue.


**ExpressJS
Anyone familiar with the Nod ecosystem will be familiar with Express. While there are multiple web app frameworks available with 
various pros and cons, Express remains the most used and most mature framework.


**Sequelize**
I used what appears to be the most popular ORM for Node. I have some familiarity with this tool but not extensive.
On reflection, it may have been faster to just write SQL and used a lower level package and embed the SQL directly as most of my time was spent wrestling the ORM. 
I do find codebases which use ORM's to be easier to manage as they become larger but clearly that was not going ot be the case here. 


**Postgres**
The data appeared inherently relational so a relational database was an obvious choice. 
Coupled with the fact the app requires reporting functions and reporting functions are generally more suited to rrelations databases
I'm most familiar with Postgres, but any relational database would suffice


**Docker**
The requirements called for portability, using docker and docker compose was the quickest and simplest way to provide for this.
Using docker compose I could containerize the application and a postgres instance and run them in tandem. The only requirement on a client machine 
being that docker must be installed. App developed on MacOS and not run on any other OS, 



## Priorities
To achieve maximum output in the limited timeframe some functionalities were prioritized over others. Most notably the application lacks a user interface. 
Clearly this does not meet the requirement of "Ready to use by the staff", however I don't currently spend much time on front-end development and I felt 
it would take all the majority my time to put a usable interface in place


### Prioritized
- Data Modelling, while certainly not perfect it would be sufficient for such an application based on the seed data provided
- Data Loading, load the seed data from a Google sheet on startup to populate the database
- A working containerized app, even with docker experience this always takes some time to get right (for me at least)
- API endpoints to cater for desired functionality, I believe most of the requirements are met here in terms of the various data manipulations required


### De-Prioritized
- UI, as stated no user interface was built. This may be a massive oversight on my part as the app clearly is not "Ready to Use" without it
- Fault-tolerance and general resilience, there are bound to be many ways the provided API can be broken. Rapid development usually comes with that price 
- Automated testing, always a prefferable best practise. Similar to having no UI, this may be a large oversight and tests should have been added with a more limited funcionality set
- General production level configuration, ie. no production built source code, no real key management(all keys in source code are internal though still)



## Running the Application

To run the application in an environment with access to a bash terminal run the below command and follow the prompts
```./start```

The first prompt asks for a Location ID, once chosen the API requests are limited to that data for that location only as per requirements
```Enter Location ID where app is to run: ```

The second prompt asks if the Data Importer should be run. This should be run the first time the containers are spun up to seed the database with the external data
Any subsequent runs of the app the data import can be skipped as the postgres volume is generated locally 

When Running the Data Import, there are two prompts for key values to allow access to the external Google sheet
```Enter Google Sheet ID: ```
```Enter Google API Key: ```

The values for these will provided separate to this repository


To run the application in an environment without bash, run the following command directly replacing the relevant values
```LOCATION_ID=[VALUE] GOOGLE_SHEET_ID=[VALUE] GOOGLE_API_KEY=[VALUE] docker compose up --build```



## Basic verification
A Postman collection has been added to the repo containing the various endpoints and pre-built request bodies.  
The data used in the collection presumes the app has been run using **Location ID: 13** for the requests not to respond with errors. 

An overview of the available endpoints
 
**POST /delivery**
Updates the stock and inventory audit trail for the current location. 
Only staff with the Chef or Back-of-house roles can make delivery requests. 
The data property takes an arbitrary length array of ingredients and there quantities. 
Example Request Body:  
```
{
  "staff_id": 1,
  "data": [{
    "ingredient_id": 1,
    "units": 1
  }]
}
```


**POST /sell**
Selling an item reduces the current location stock, updates the inventory audit trail and creates a sale item. 
Only staff with the Front-of-house role can make sell requests. 
It is not possible to sell an item that the current location does not sell. 
It is not possible to sell an item that the current location does not possess enough stock to fulfill. 
If the combination of recipe and location allow for ingredient modification and a value is provided the sale price is adjusted accordingly. 
Limitation of only handling a single menu item (identified by recipe_id) per each sell request. 
Example Request Body:  (modified_ingredient is optional)  
```
{
  "staff_id": 1,
  "data": {
    "recipe_id": 1,
    "modified_ingredient": "turmeric"
  }
}
```


**POST /stock/check**
Updates the stock levels for the current location
No staff role requirements are applied to the stock/check route
The units value passed in is assumed to be the current stock level after a manual count
If the passed in units value is less than the current system stock level, the stock is adjusted accordingly and an inventory audit item created
The case where stock check units may be hiher than system values is not handled
The data property takes an arbitrary length array of ingredients and there quantities
Example Request Body:   
```
{
  "staff_id": 1,
  "data": [{
    "ingredient_id": 1,
    "units": 1
  }]
}
```



**GET /reports/inventory/audit?staff_id={}&start_date={}&end_Date={}**
Returns a list of all changes made to the stock levels of the current location during the selected date range.  
Only staff with role Manager can make reports requests.  
Takes the staff_id as a query param to enable a GET request. Would expect this value in the form of a session token or cookie etc in a fully implemented system.  
Requires the start_date and end_date parameters. No attempts are made to parse and/or format these date strings, presumed to be in YYYY-MM-DD format  


**GET /reports/financials?staff_id={}&start_date={}&end_Date={}**
Returns a summary of costs and sales revenue for select date range  


**GET /reports/inventory/value?staff_id={}**
Returns the value of the currently held stock for current location  



A PgAdmin container, providing an SQL interface to the data, is added to the application also to assist with verifications.  
The PgAdmin interface is available @ http://localhost:5050/ when the application is running  
Login details are   
Username: user@nory.com
Password: admin
