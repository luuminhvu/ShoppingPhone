import bcrypt from "bcrypt";
import Joi from "joi";
import Users from "../models/Users.js";
import genAuthToken from "../utils/genAuthToken.js";
export const registerUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().min(3).max(200).email().optional(),
    password: Joi.string().min(3).max(200).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }
  user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = genAuthToken(user);
  res.send(token);
};
