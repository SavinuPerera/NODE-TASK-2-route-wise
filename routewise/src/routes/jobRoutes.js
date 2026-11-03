let express = require("express");
let router = express.Router();

let job = require("../services/jobService");

router.get("/", job.all);
router.get("/:id", job.one);
router.post("/", job.add);
router.patch("/:id/status", job.update);

module.exports = router;
