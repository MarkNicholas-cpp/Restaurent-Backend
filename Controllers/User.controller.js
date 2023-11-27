const { SaveUser, findByEmail } = require("../Models/User.model");

exports.registerUser = (req, res) => {
  userDetails = req.body;
  findByEmail(userDetails.Email).then((user) => {
    if (user) {
      res.status(401).send({ Msg: "Email alredy exist" });
      return;
    }
    SaveUser(userDetails)
      .then((result) => {
        res.status(200).send({ id: result.id });
      })
      .catch((err) => {
        console.log(err);
        res.send("Err");
      });
  });
};

exports.loginUser = (req, res, next) => {
  findByEmail(req.body.Email)
    .then((user) => {
      if (user) {
        req.body = {
          id: user.id,
          Role: user.Role,
          Name:user.Name
        };
        return next();
      } else {
        res.status(404).send({ Msg: "Email Not Found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ Msg: err });
    });
};
