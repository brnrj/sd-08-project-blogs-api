const serviceUser = require('../service/user');
const serviceLogin = require('../service/login');
const serviceCategory = require('../service/category');
const servicePost = require('../service/post');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await serviceUser.newUser(displayName, email, password, image);
    return res.status(201).json({ token });
  } catch (err) {
    if (err.message === 'User already registered') {
      return res.status(409).json({
        message: err.message,
      });
    }
    return res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await serviceLogin.login(email, password);

    return res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
    const allUsers = await serviceUser.getAllUsers();
    return res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await serviceUser.getById(id);

    return res.status(200).json(foundUser);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await serviceCategory.checkName(name);
    const newCategory = await serviceCategory.createCategory(name);

    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await serviceCategory.getAllCategories();
    return res.status(200).json(categories);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const newPost = async (req, res) => {
  try {      
    const { title, content, categoryIds } = req.body;
    const { authorization: token } = req.headers;
    const id = await servicePost.findId(token);
    const newBp = await servicePost.createPost(title, content, categoryIds, id);
    return res.status(201).json(newBp);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const getAllPosts = async (_req, res) => {
    const allPosts = await servicePost.getPosts();
    return res.status(200).json(allPosts);
};

module.exports = {
  newUser, login, getAllUsers, getUserById, createCategory, getAllCategories, newPost, getAllPosts,
};
