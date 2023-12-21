const passport = require('passport');
const { executeCode, AddedProblem, checkJobStatus } = require('../controllers/codeRunnerController');
const router = require('express').Router();

router.post("/executeCode",  executeCode);
router.post("/addProblem",  AddedProblem);
router.get("/status",  checkJobStatus);

module.exports = router;