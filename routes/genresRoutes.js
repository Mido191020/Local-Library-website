const express = require("express");
const router = express.Router();
const genreController = require("../Controllers/genreController");

// Genre routes
router
    .route("/")
    .get(genreController.genre_list)
    .post(genreController.genre_create_post);

router
    .route("/:id")
    .get(genreController.genre_detail)
    .put(genreController.genre_update_post)
    .delete(genreController.genre_delete_post);

router.get("/create", genreController.genre_create_get);
router.get("/:id/update", genreController.genre_update_get);
router.get("/:id/delete", genreController.genre_delete_get);

module.exports = router;