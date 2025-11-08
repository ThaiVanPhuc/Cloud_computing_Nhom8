const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async signin(req, res) {
    try {
      const { username, email, password, isAdmin } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Missing required fields: username, email, and password",
        });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const trimmedPassword = password.trim();
      const role = isAdmin ? "admin" : "user";

      const newUser = new User({
        username,
        email,
        password: trimmedPassword,
        role,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ message: "Server error while registering user" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const trimmedPassword = password.trim();

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(trimmedPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password or password" });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, "secretKey", {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error while logging in" });
    }
  }

  async getUsers(req, res) {
    const pageParam = req.query.page;
    const limit = parseInt(req.query.limit) || 10;

    try {
      if (pageParam === "all") {
        const users = await User.find();
        return res.json({
          currentPage: "all",
          totalUsers: users.length,
          users: users,
        });
      }
      const page = parseInt(pageParam) || 1;
      const skip = (page - 1) * limit;

      const total = await User.countDocuments();
      const users = await User.find().skip(skip).limit(limit);

      res.json({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        users: users,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      console.error("Get User By ID Error:", error);
      res
        .status(500)
        .json({ message: "Server error while getting user by ID" });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (error) {
      console.error("Update User Error:", error);
      res.status(500).json({ message: "Server error while updating user" });
    }
  }

  async edituser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role, password } = req.body;
      const updateFields = {};

      if (username) updateFields.username = username;
      if (email) updateFields.email = email;
      if (role) updateFields.role = role;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      res.json({ message: "Cập nhật thành công", user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng" });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete User Error:", error);
      res.status(500).json({ message: "Server error while deleting user" });
    }
  }
}

module.exports = new UserController();