import User from "../models/userModele.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: " Email and password are required " });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    generateToken(res, user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: " server Error", error: error.message });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }); 
  res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    data: { _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
};