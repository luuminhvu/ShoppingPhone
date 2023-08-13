import moment from "moment";
import Order from "../models/Order.js";
export const getOrder = async (req, res) => {
  const query = req.query.new;
  try {
    const order = query
      ? await Order.find().sort({ _id: -1 }).limit(4)
      : await Order.find().sort({ _id: -1 });
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
//update Order // Import your Order model

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Ensure the updated data is returned and run model validations
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.user._id !== order.userId && req.user.isAdmin === false) {
      return res.status(403).json("You are not allowed to see this order");
    }
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const getOrderByIdCustomer = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Kiểm tra quyền truy cập: người dùng chỉ có thể truy cập các đơn hàng của chính họ
    if (req.user._id !== userId && req.user.isAdmin === false) {
      return res
        .status(403)
        .json("You are not allowed to access orders for this user");
    }

    const orders = await Order.find({ userId: userId });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const UserCreatedCount = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const orders = await Order.aggregate([
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
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const getRevenue = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const revenue = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(revenue);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const getRevenueWeek = async (req, res) => {
  const last7Days = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
  try {
    const revenueWeek = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(last7Days) } },
      },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(revenueWeek);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
