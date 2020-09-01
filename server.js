const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

//DATABASE STUFF
const mongoose = require('mongoose');
const DBKEY = process.env.DBKEY;
mongoose.connect(DBKEY, { useNewUrlParser: true, useUnifiedTopology: true });

//Routes
const default_route = require('./routes/unprotected/default.route');
const register_route = require('./routes/unprotected/register.route');
const login_route = require('./routes/unprotected/login.route');

app.use('/', default_route);
app.use('/register', register_route);
app.use('/login', login_route);

app.listen(port, () => console.log(`Server is running on port ${port}`));
