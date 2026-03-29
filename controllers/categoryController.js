import { dbPool } from "../db/dbPool.js";

//database queries for all the functions
//getcategoryById -
//createCategory
//updateCategory
//deleteCategory
/**
 * Controller functions for Category resource
 *
 * Exports:
 *  - getAllCategories(req, res)
 *  - getCategoryById(req, res)
 *  - createCategory(req, res)
 *  - updateCategory(req, res)
 *  - deleteCategory(req, res)
 *  - getItemsByCategoryId(req, res)

 */
//lets first take all the response from functions as json
// will update the project to add ejs support
async function getAllCategories(request, response) {
  const { rows } = await dbPool.query("SELECT * FROM category");
  const category = rows;
  // console.log(category);
  // response.render("category", { title: "Category List", category: category });
  response.json(rows)
}

//select * from category where id = 1
async function getCategoryById(request, response) {
 const { id } = request.params;

 // Fetch category and items in parallel and return a combined response
 const categoryQuery = dbPool.query("SELECT * FROM category WHERE id = $1", [
   id,
 ]);
 const itemsQuery = dbPool.query(
   "SELECT * FROM item WHERE category_id = $1",
   [id],
 );

 const [{ rows: categoryRows }, { rows: itemRows }] = await Promise.all([
   categoryQuery,
   itemsQuery,
 ]);

 const category = categoryRows[0] || null;
 response.json({ category, items: itemRows });
}

// Reuse the same implementation for the items endpoint so both routes are backed by one function
const getItemsByCategoryId = getCategoryById;

//insert into category (name, description) values('electronics', 'electronics items')
async function createCategory(request, response) {
  const { name, description } = request.body;
  const { rows } = await dbPool.query(
    "INSERT INTO category (name, description) VALUES ( $1, $2)",
    [name, description],
  );
  response.json(rows);
}

//update category
// set name = 'updated name' , description = 'updated' where id = 1;
async function updateCategory(request, response) {
  const { name, description, id } = request.body;
  const { rows } = await dbPool.query(
    "UPDATE category SET name = $1 , description = $2 where id = $3 ",
    [name, description, id],
  );
  response.json(rows);
}

//delete from category where id = 1;
async function deleteCategory(request, response) {
  const { id } = request.params;
  const { rows } = await dbPool.query("DELETE FROM category WHERE id = $1", [
    id,
  ]);
  response.json(rows);
}

export {
  getAllCategories,
  getCategoryById,
  getItemsByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
};
