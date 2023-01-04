const usersService = require("../services/usersService");

/**
 * register new user account
 * @param {*} req
 * @param {*} res
 */
exports.register = async (req, res) => {
  try {
    if (!req.body.password || !req.body.username) {
      res.status(400).json({ error: "Password or username is empty" });
    }
    const password = await usersService.hashPassword(req.body.password);
    const user = {
      username: req.body.username,
      password,
    };
    const createdUser = await usersService.register(user);
    if (!createdUser) {
      res.status(500).json({ error: "error while saving user profile" });
    }
    const token = usersService.signToken(createdUser);

    res.status(201).json({
      data: {
        id: createdUser._id,
        username: createdUser.username,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * remove user using his id
 * @param {*} req 
 * @param {*} res 
 */
exports.remove = async (req, res) => {
  if (!utilsService.checkObjectId(req.body.userId)){
    res.status(400).json({error: 'ObjectId is not valid'});
  }
  const userToDelete = await usersService.get(req.body.userId);
  if(!userToDelete){
      res.status(404).json({error: 'No user matching id'});
  }
  usersService.remove(userToDelete);
}

/**
 * Login if data are filled and if user exist
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({ error: "Password or username is empty" });
  }
  const existingUser = await usersService.getUserByUsername(req.body.username);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }
  const checkPassword = await usersService.comparePasswords(
    req.body.password,
    existingUser.password
  );
  if (!checkPassword) {
    res.status(400).json({ error: "Wrong password" });
  } else {
    const token = usersService.signToken(existingUser);

    res.status(200).json({
      data: {
        id: existingUser._id,
        username: existingUser.username,
        token,
      },
    });
  }
};

/**
 * Retrieve all users
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.retrieveAll = async (req, res) => {
  const existingUsers = await usersService.getAllUser();
  return res.status(200).json({ data: existingUsers });
};

/**
 * Retrieve user data from user username
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.retrieveByUsername = async (req, res) => {
  const existingUser = await usersService.getUserByUsername(req.body.username);
  return res.status(200).json({ data: existingUser });
};