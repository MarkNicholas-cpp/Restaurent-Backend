const Work = require("../Models/Work.model");
exports.giveWork = (req, res) => {
  req.body.OrderedBy = req.jwt.id;
  Work.insertWork(req.body)
    .then(() => res.send({ Msg: "We have got your req" }))
    .catch((err) => res.send(err));
};
