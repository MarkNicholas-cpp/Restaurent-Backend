const mongoose = require("../mongoose.service").mongoose;
const Schema = mongoose.Schema;

const User = new Schema({
  Name: String,
  Email: String,
  Phone: String,
  Company: String,
  Address: String,
  Role: {
    type: String,
    default: "Client",
  }
});

const user = mongoose.model("user", User);

exports.SaveUser = async(userRecord) => {
  const userDetails = new user(userRecord);
  return await userDetails.save();
};

exports.findByEmail = async (Email) => {
  const result = await user.findOne({ Email: Email });
  return result;
};
