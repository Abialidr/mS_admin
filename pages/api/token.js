// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import { privateKey } from "utils/constants";

export default function handler(req, res) {
  var token = jwt.sign({}, privateKey, {
    expiresIn: "6h",
  });
  res.status(200).json({ token });
}
