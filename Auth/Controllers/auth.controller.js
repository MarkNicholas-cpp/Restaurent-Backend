const jwt = require("jsonwebtoken");
const JWTSECRET = require("../config/jwt.config");
const crypto = require("crypto");
const { saveSalt } = require("../../Models/Refresh.model");
exports.jwtTokenGen = (req, res) => {
  try {
    let token = jwt.sign(req.body, JWTSECRET, { expiresIn: "30m" });
    let refreshId = req.body.id + JWTSECRET;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    console.log(req.body);
    let b = Buffer.from(hash);
    let refresh_token = b.toString("base64");
    saveSalt(req.body.id, salt); //Salt is saved at database with keys collection as the collection name
    res.status(201).send({ accessToken: token, refreshToken: refresh_token }); //refershToken saved at client side
  } catch (err) {
    res.status(500).send({ Msg: err });
    console.log(err);
  }
};
exports.jwtTokenVerify = (req, res, next) => {
  if (req.headers["authorization"]) {
    try { 
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send({
          Msg: "Not a valid authentication Method our server uses JWT authentication Say Bearer token",
        });
      } else {
        req.jwt = jwt.verify(authorization[1], JWTSECRET);
        return next();
      }
    } catch (err) {
      console.log(err);
      return res.status(403).send({ Msg: err.name });
    }
  } else {
    return res.status(401).send({ Msg: "No headers Found" });
  }
};

exports.validRefreshNeeded = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    let b = Buffer.from(req.body.refresh_token, "base64");
    let refresh_token = b.toString();
    let hash = crypto
      .createHmac("sha512", req.jwt.refreshKey)
      .update(req.jwt.userId + JWTSECRET)
      .digest("base64");
    console.log(hash);
    if (hash === refresh_token) {
      req.body = req.jwt;
      return next();
    } else {
      return res.status(400).send({ error: "Invalid refresh token" });
    }
  }
};
