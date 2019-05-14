const  express = require("express"),
       connectDatabase = require('./config/db'),
       fakerShopData = require('./seeds/fakerData'),
       app = express();

// Connect Database
connectDatabase();

// Bodyparser Middleware
app.use(express.json());


// Test 
app.get('/', (req, res) => { res.send('API Running') });


// Define Routes 
 app.use('/api', require('./routes/api/users'));
 app.use('/api/shops', require('./routes/api/shops'));
 app.use('/api/auth', require('./routes/api/auth'));


//Generate data shops if database is empty
fakerShopData();

// Define port listen & start server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))