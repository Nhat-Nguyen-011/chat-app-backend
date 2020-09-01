require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const NodeMailer = require('./Controllers/ServerWorker/NodeMailer');

//DATABASE STUFF
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DBKEY = process.env.DBKEY;
mongoose.connect(DBKEY, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 3000;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('TestUser', userSchema);

const createNewUser = async () => {
  const newUser = new User();
  newUser.email = 'test';
  // newUser.password = 'test';
  try {
    let result = await newUser.save();
    return result;
  } catch (error) {
    return { error };
  }
};

app.post('/test', async (req, res) => {
  const result = await NodeMailer.sendConfirmRegister();
  res.json(result);
});

app.listen(PORT, () => console.log(`rest service is running on port ${PORT}`));
