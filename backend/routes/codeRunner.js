const passport = require('passport');
const { executeCode, AddedProblem, fetchAllProblem,fetchProblem, checkJobStatus } = require('../controllers/codeRunnerController');
const router = require('express').Router();

router.post("/executeCode",  executeCode);
router.get("/allProblem",  fetchAllProblem);
router.post("/addProblem",  AddedProblem);
router.get("/status",  checkJobStatus);
router.get("/problem/:ProblemId",  fetchProblem);

module.exports = router;