const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
router.use(logRequest);
router.get("/create", authorController.author_create_get);
router.post("/create", authorController.author_create_post);
// Author routes

// Specific author routes
router.get("/:id", authorController.author_detail); // This should handle detailed author information

router.get("/:id/update", authorController.author_update_get);
router.post("/:id/update", authorController.author_update_post);

router.get("/:id/delete", authorController.author_delete_get);
router.post("/:id/delete", authorController.author_delete_post);
router
  .route("/")
  .get(authorController.author_list)
  .post(authorController.author_create_post);

module.exports = router;
