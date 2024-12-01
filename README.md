# fligth-app-serve

step 1:
 install dependencies to you local environment
 1. bcrypt
 2. body-parser
 3. cookie-parser
 4. cors
 5. dotenv
 6. express
 7. jsonwebtoken
 8. mongoose
 9. nodemailer
 10. nodemon

#you package.json file should look like this: 

{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.3",
    "nodemailer": "^6.9.16",
    "nodemon": "^3.1.7"
  }
}

step 2: 
 change cors configuration for localhost

step 3: 
run npm  start to your conso

Features:
 1. Create a flight
 2. Update a flight
 3. delete a flight
 4. update a booking (date,time)
 5. delete a booking
 6. update booking according to flight update
 7. delete a booking according to flight deletion
 8. log in, log out, admin authentication
 9. version controlled
 10. responsive (without navigation menu)

#Default Admin Credentials
email: muntasirniloy2002@gmail.com
password:1234
