# web-coding-challenge-fullstack

A fullStack application user managment and shop list - developed using React/Redux, Node, Express and MongoDB, with ES6.

### [Live Demo](https://webcodingchallenge.herokuapp.com/ "MERN web coding ")


#### What you need to run this code
1. Node (10.15.3)
2. NPM (6.4.1)
3. MongoDB (v4.0.9)


## Technical spec Info
-Frontend : react: "16.8.6", (client folder)
-Backend : node/express, (server folder)

1. An extensive backend API with Node.js & Express
2. Protecting routes/endpoints with JWT (JSON Web Tokens)
3. Using Redux 

NB: I used functions components with state ,React Hooks(New), Async/Await

## Quick Start : (Dev deployment)

Add your MONGO_URI (mlab atlas) to the default.json file.Or rename the file "default.json.local" to "default.json" (delete old)  for database local.


```bash
# Install dependencies for server
cd server / npm install

# Install dependencies for client
cd client / npm run install

# Run the client & server with concurrently)
 cd server / and run : npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:8888 and client on http://localhost:3000
```

## App Info
- At startup, the server automatically installs a list of data shops " if your database is empty" .
And listen on the port 8888.
- Password example for user registration : Web@3w (Password must be at least 5 characters in length; contains number, uppercase and lowercase letters)


## Functional spec Info.
* all funcionnalities :

- I did not understand this requirement "As a User, I can display the list of shops sorted by distance" 
but i'm using location coordinates with a basic filtering.

- And about this requirement :" As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2hours"; is not finished yet. At the moment, the shop is displayed again, after 2 minutes, in the main list of the connected user.




