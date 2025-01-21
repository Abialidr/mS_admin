import jwt from "jsonwebtoken";
import { privateKey } from "utils/constants";

export default function handler(req, res) {
  res.status(200).json({ token });
}
