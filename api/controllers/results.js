const resultsService = require("../services/resultsService");
const usersService = require("../services/usersService");
const utilsService = require("../services/utilsService");

/**
 * get all results
 * @param {*} req
 * @param {*} res
 */
exports.getLeaderboard = async (req, res) => {
  const results = await resultsService.getLeaderboard();
  res.status(200).json({ data: results });
};

/**
 * create Result
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
  if (
    !req.body.username ||
    req.body.score === undefined ||
    !req.body.difficulty
  ) {
    res.status(400).json({ error: "At least one field is empty" });
    return;
  }
  const loggedUser = await usersService.getUserByUsername(req.body.username);

  if (!loggedUser) {
    res.status(404).json({ error: "No user matching username" });
    return;
  }
  const resultToSave = {
    user: loggedUser._id,
    score: req.body.score,
    difficulty: req.body.difficulty,
  };

  const createdResult = await resultsService.create(resultToSave);
  if (!createdResult) {
    res.status(500).json({ error: "error while creating result" });
    return;
  }
  res.status(201).json({ data: createdResult });
};

/**
 * remove result using his id
 * @param {*} req
 * @param {*} res
 */
exports.remove = async (req, res) => {
  if (!utilsService.checkObjectId(req.body.resultId)) {
    res.status(400).json({ error: "ObjectId is not valid" });
  }
  const resultToDelete = await resultsService.get(req.body.resultId);
  if (!resultToDelete) {
    res.status(404).json({ error: "No result matching id" });
  }
  resultsService.remove(resultToDelete);
};
