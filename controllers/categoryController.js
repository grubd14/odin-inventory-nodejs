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

 */
//lets first take all the response from functions as json
// will update the project to add ejs support
async function getAllCategories(request, response) {
  const { rows } = await dbPool.query("SELECT * FROM category");
  const category = rows;
  console.log(category);
  response.render("category", { title: "Category List", category: category });
}

//select * from category where id = 1
async function getCategoryById(request, response) {
  const { id } = request.params;
  const { rows } = await dbPool.query("SELECT * FROM category WHERE ID = $1", [
    id,
  ]);
  response.json(rows);
}

//insert into category (name, description) values('electronics', 'electronics items')
async function createCategory(request, response) {
  const { name, description } = request.body;
  const { rows } = await dbPool.query(
    "INSERT INTO category (name, description) VALUES ( $1, $2)",
    [name, description],
  );
  console.log(rows);
  response.json(rows);
}

//update category
// set name = 'updated name' , description = 'updated' where id = 1;
async function updateCategory(request, response) {
  const { updatedName, updatedDescription, id } = request.body;
  const { rows } = await dbPool.query(
    "SET name = '$1' , description = '$2' where id = $3 ",
    [updatedName, updatedDescription, id],
  );
  response.json(rows);
}

//delete from category where id = 1;
async function deleteCategory(request, response) {
  const id = request.params;
  const { rows } = await dbPool.query("DELETE FROM category WHERE id = $1", [
    id,
  ]);
  response.json(rows);
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
