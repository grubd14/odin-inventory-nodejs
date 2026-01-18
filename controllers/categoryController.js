import { dbPool } from "../db/dbPool.js";

/**
 * Controller functions for Category resource
 *
 * Exports:
 *  - getAllCategories(req, res)
 *  - getCategoryById(req, res)
 *  - createCategory(req, res)
 *  - updateCategory(req, res)
 *  - deleteCategory(req, res)
 *
 * These handlers use the shared `dbPool` to run parameterized queries
 * against the `category` table and return JSON responses with appropriate
 * status codes and error handling.
 */
