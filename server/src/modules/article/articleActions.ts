import type { RequestHandler } from "express";

// Import access to data
import articleRepository from "./articleRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all articles
    const articles = await articleRepository.readAll();

    // Respond with the articles in JSON format
    res.json(articles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a single article by ID from the request parameters
    const article = await articleRepository.read(+req.params.id);

    // If the article is not found, respond with a 404 status
    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    // Respond with the article in JSON format
    res.json(article);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update an article by ID with the data from the request body
    const affectedRows = await articleRepository.update(
      +req.params.id,
      req.body,
    );

    // If no rows were affected, respond with a 404 status
    if (affectedRows === 0) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    // Respond with a success message
    res.json({ message: "Article updated successfully" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete an article by ID
    const affectedRows = await articleRepository.delete(+req.params.id);

    // If no rows were affected, respond with a 404 status
    if (affectedRows === 0) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    // Respond with a success message
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Create a new article with the data from the request body
    const newArticleId = await articleRepository.create(req.body);

    // Respond with the ID of the newly created article
    res.status(201).json({ id: newArticleId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
