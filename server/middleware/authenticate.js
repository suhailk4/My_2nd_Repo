var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  console.log(token);

    User.findByToken(token).then((user) => {

    
    req.user = user;
    req.token = token;
    console.log(req.user.email);
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
