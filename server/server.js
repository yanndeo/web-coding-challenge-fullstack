
const  express = require("express"),
       connectDatabase = require('./config/db'),
       fakerShopData = require('./seeds/fakerData'),
       path = require('path'),
       app = express();


// Connect Database
connectDatabase();

// Bodyparser Middleware
app.use(express.json());


// Test: app.get('/', (req, res) => { res.send('API Running') });


// Define Routes 
 app.use('/api', require('./routes/api/users'));
 app.use('/api/shops', require('./routes/api/shops'));
 app.use('/api/auth', require('./routes/api/auth'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../client/build'));

    app.get('*', (req, res)=>{

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Generate data shops IF database is empty
fakerShopData();

// Define port listen & start server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))