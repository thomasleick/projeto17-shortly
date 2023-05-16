import { findUserByEmail, createUser } from '../services/authService.js';

export const postUser = async (req, res) => {
    try {
        const foundUser = await findUserByEmail(req.body.email);
        if (foundUser) {
          return res
            .status(409)
            .json({ message: "User already registered with this Email" });
        }
        const user = await createUser(req.body);
        res.status(201).json({ message: "User created!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
};
