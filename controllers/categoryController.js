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
async function getAllCategories(reques, response) {
 const{rows} = await dbPool.query("SELECT * FROM category") 
 const category = rows
 console.log(category)
 response.render('category', {title: "Category List", category: category})
}

export {getAllCategories}