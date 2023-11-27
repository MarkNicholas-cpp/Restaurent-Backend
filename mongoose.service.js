const mongoose = require("mongoose");

const Connection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/Work-Manager", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb Server Running");
  } catch (err) {
    console.log(err);
  }
};

Connection();
exports.mongoose = mongoose;
