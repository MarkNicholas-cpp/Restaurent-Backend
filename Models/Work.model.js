var mongoose = require("../mongoose.service").mongoose;
var Schema = mongoose.Schema;

const Work = new Schema({
  Type: String,
  MoreInfo: {
    ModelNumber: { type: Number, default: 0 },
    Quantity: Number,
    PaperQuality: Number,
    Leafs: { type: Number, default: null },
    Status: {
      type: [String],
      default: ["Waiting for the Admin to Accept the Work"],
    },
  },
  OrderedBy: { type: Schema.Types.ObjectId, ref: "user" },
});

const work = mongoose.model("work", Work); 

exports.insertWork = async (workDetails) => {
  console.log(workDetails);
  const userWork = new work({
    Type: workDetails.Type,
    MoreInfo: {
      ModelNumber: workDetails.MoreInfo.ModelNumber,
      Quantity: workDetails.MoreInfo.Quantity,
      PaperQuality: workDetails.MoreInfo.PaperQuality,
      Leafs: workDetails.MoreInfo.Leafs,
      Status: workDetails.MoreInfo.Status,
    },
    OrderedBy: workDetails.OrderedBy,
  });
  return await userWork.save();
};
 
exports.updateStatus = (Status, id) => {
  return work.findOneAndUpdate(
    { _id: id },
    { $push: { Status: Status } },
    { new: true }
  );
};
