import User from "../../models/user";

export default function handler(req, res) {
  const test = new User({
    email: "String",
    fullName: "String",
    phone: "String",
    isPaid: true,
    wallet: "String",
    createdAt: new Date(),
  });
  res.status(200).json(test);
}
