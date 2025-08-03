const User = require('./../models/User');
const { generateToken } = require('./../middlewares/jwtGenerate');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ ok: false, msg: `${email} already exists` });

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ ok: true, msg: `${email} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Please contact support' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbUser = await User.findOne({ email });
    if (!dbUser) return res.status(400).json({ ok: false, msg: 'User does not exist!' });

    if (password !== dbUser.password)
      return res.status(400).json({ ok: false, msg: 'Incorrect password!' });

    const token = await generateToken({ _id: dbUser._id, email: dbUser.email });

    res.status(200).json({ ok: true, msg: `Welcome ${dbUser.email}`, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Please contact development team' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ ok: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ ok: false, msg: 'User not found' });

    res.status(200).json({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ ok: false, msg: 'User not found' });

    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    res.status(200).json({ ok: true, msg: `User with ID ${id} updated`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error' });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ ok: false, msg: `User with ID ${id} not found` });

    res.status(200).json({ ok: true, msg: `User with ID ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Please contact support' });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
