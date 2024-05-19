const express = require("express");
const router = express.Router();
const bookInstanceController = require("../Controllers/bookinstanceController");

// BookInstance routes
router
    .route("/")
    .get(bookInstanceController.bookinstance_list)
    .post(bookInstanceController.bookinstance_create_post);

router
    .route("/:id")
    .get(bookInstanceController.bookinstance_detail)
    .put(bookInstanceController.bookinstance_update_post)
    .delete(bookInstanceController.bookinstance_delete_post);

router.get("/create", bookInstanceController.bookinstance_create_get);
router.get("/:id/update", bookInstanceController.bookinstance_update_get);
router.get("/:id/delete", bookInstanceController.bookinstance_delete_get);

module.exports = router;