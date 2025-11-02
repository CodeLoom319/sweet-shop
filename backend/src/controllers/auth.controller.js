import { createUser, verifyUser } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { token, role, email } = await verifyUser(req.body);

    res.status(200).json({
      message: "Login successful",
      token,
      role,
      email
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

