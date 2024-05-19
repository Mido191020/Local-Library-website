const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");

// Author routes
router
    .route("/")
    .get(authorController.author_list)
    .post(authorController.author_create_post);

router
    .route("/:id")
    .get(authorController.author_detail)
    .put(authorController.author_update_post)
    .delete(authorController.author_delete_post);

router.get("/create", authorController.author_create_get);
router.get("/:id/update", authorController.author_update_get);
router.get("/:id/delete", authorController.author_delete_get);

module.exports = router;