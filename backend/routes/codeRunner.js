const passport = require('passport');
const { executeCode, AddedProblem } = require('../controllers/codeRunnerController');
const router = require('express').Router();


router.post("/executeCode",  executeCode);
router.post("/addProblem",  AddedProblem);

module.exports = router;