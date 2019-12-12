const express = require('express');
const app = express();

const hostname = '0.0.0.0';
const port = 3000;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongooseParams = {
  useUnifiedTopology : true,
  useNewUrlParser: true,
  useCreateIndex: true
}
mongoose.connect('mongodb://mongo/apinodeipssi', mongooseParams); // docker (mongo = nom du container)
// mongoose.connect('mongodb://localhost:27017/apinodeipssi', mongooseParams); // windows sans docker

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json())

const userRoute = require('./api/routes/userRoute');
userRoute(app);

const groupRoute = require('./api/routes/groupRoute');
groupRoute(app);

const giftRoute = require('./api/routes/giftRoute');
giftRoute(app);

app.listen(port, hostname);
