const express = require("express");
const router = express.Router();
const bookController = require("../Controllers/bookController");

// Book routes
router
  .route("/")
  .get(bookController.book_list)
  .post(bookController.book_create_post);

router
  .route("/:id")
  .get(bookController.book_detail)
  .put(bookController.book_update_post)
  .delete(bookController.book_delete_post);

router.get("/create", bookController.book_create_get);
router.get("/:id/update", bookController.book_update_get);
router.get("/:id/delete", bookController.book_delete_get);

module.exports = router;
