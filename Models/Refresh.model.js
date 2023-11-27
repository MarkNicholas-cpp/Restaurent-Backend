const mongoose = require("../mongoose.service").mongoose;
const Schema = mongoose.Schema;

const refreshsalt = new Schema({
  refreshFor: { type: Schema.Types.ObjectId, ref: "user" },
  refreshSalt: String,
});

const salt = mongoose.model("keys", refreshsalt);
exports.saveSalt = async (id, resfreshSalt) => {
    const userSalt = new salt({
        refreshFor: id,
        refreshSalt: resfreshSalt,
    });
    return await userSalt.save();
};

exports.getUserSalt = async (id) => {
  return await salt.findOne({ refreshFor: id });
};
