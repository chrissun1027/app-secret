const express = require('express');
const cors = require('cors');
const passport = require('passport');
const config = require('config');
const logger = require('./utils/logger');

require('./passport');

const auth = require('./api/auth/authController');
const user = require('./api/user/userController');

const app = express();
const { port, root } = config.get('api');

function logErrors(err, req, res, next) {
  logger.error(err);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something went wrong.' });
  } else {
    next(err);
  }
}
const hostname = '0.0.0.0';

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

const userRoute = require('./api/routes/userRoute');
userRoute(app);

const groupRoute = require('./api/routes/groupRoute');
groupRoute(app);

// const giftRoute = require('./api/routes/giftRoute');
// giftRoute(app);


app.use(cors());
app.use(bodyParser.json());
app.use(`/users`, passport.authenticate('jwt', { session: false }), userRoute);
app.use(`${root}/auth`, auth);
app.use(logErrors);
app.use(clientErrorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);





