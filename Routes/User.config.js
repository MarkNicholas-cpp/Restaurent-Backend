const { verify } = require("jsonwebtoken");
const { jwtTokenGen, jwtTokenVerify, validRefreshNeeded } = require("../Auth/Controllers/auth.controller");
const { registerUser, loginUser } = require("../Controllers/User.controller");
const Work = require("../Controllers/Work.controller")

exports.routesConfig = function (app) {
  app.post("/Register", registerUser);
  app.post("/Login", [loginUser, jwtTokenGen]);
  app.post("/Work",[jwtTokenVerify,Work.giveWork]);
  app.post("/refersh",[validRefreshNeeded])
};
