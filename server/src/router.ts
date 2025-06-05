import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import articleActions from "./modules/article/articleActions";

// Create
router.post("/api/articles", articleActions.add);
// Read All
router.get("/api/articles", articleActions.browse);
// Read One
router.get("/api/articles/:id", articleActions.read);
// Update
router.put("/api/articles/:id", articleActions.edit);
// Delete
router.delete("/api/articles/:id", articleActions.destroy);

/* ************************************************************************* */

export default router;
