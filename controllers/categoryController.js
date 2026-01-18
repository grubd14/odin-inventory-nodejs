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
 const{rows} = await dbPool.query("SELECT * FROM category") 
 const category = rows
 console.log(category)
 response.render('category', {title: "Category List", category: category})
}

//select * from category where id = 1
async function getCategoryById(request, response) {
  const { id } = request.params
  const {rows} = await dbPool.query("SELECT * FROM category WHERE ID = $1", [id])
  response.json(rows)
}

//insert into category (name, description) values('electronics', 'electronics items')
async function createCategory(request, response) {

}

//update category 
// set name = 'updated name' , description = 'updated' where id = 1;
async function updateCategory(request, response) {
  
}

//delete from category where id = 1;
async function deleteCategory(request, response) {
  
}

export {getAllCategories, getCategoryById}