const express = require('express');
const app = express();
const connectDb = require('./models/connection');
const User = require('./models/user.model');
const cors = require('cors');

const PORT = 8080;
app.use(cors());

app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.get('/user-create', async (req, res) => {
  const user = new User({ username: 'userTest' });

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

app.get('/clear_all', async (req, res) => {
  User.deleteMany({}, (err) => {
      if(err){
        return res.status(500).send()
      }
      return res.status(200).send()
  })
})

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
