const express = require("express");
const app = express();
const userRoutes = require("./Routes/User.config");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
userRoutes.routesConfig(app);


app.listen(3000, () => console.log("Server Running....."));
