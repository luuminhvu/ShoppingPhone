import moment from "moment";
import Users from "../models/Users.js";
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find().sort({ _id: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
//delete
export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const previousMonth = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const users = await Users.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
