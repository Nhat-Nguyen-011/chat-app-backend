require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

//DATABASE STUFF
const mongoose = require('mongoose');
const DBKEY = process.env.DBKEY;
mongoose.connect(DBKEY, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 3000;

const authRoutes = require('./Routes/authRoutes');

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`rest service is running on port ${PORT}`));
