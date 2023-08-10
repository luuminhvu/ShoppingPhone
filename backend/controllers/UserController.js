import moment from "moment";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
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
//findbyId
export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.email !== req.body.email) {
      const emailInUse = await Users.findOne({ email: req.body.email });
      if (emailInUse) {
        return res.status(400).json("Email already in use");
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
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
