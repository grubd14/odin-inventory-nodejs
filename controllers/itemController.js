import { dbPool } from "../db/dbPool.js";

//TO-DO
// pass all the data through body not in URL parameters

//controller functions for item resources
// getAllTheItems
// addItem
// updateItemsDetails
// updatedItemQuantity
// deleteItem
// 


//postgres returns the rows from the queries in rows object
// cannot use any other name
async function getAllTheItems(request, response) {
  const { rows } = await dbPool.query("SELECT * FROM item");
  const items = rows;
  console.log(items);
  response.render("item", {title: "Items List", items: items})
}

async function addItem(request, response) {
  const {name, descp, quantity, category_id} = request.params
  const {rows} =  await dbPool.query("INSERT INTO item (name, description, quantity, category_id VLAUES ('$1', '$2', $3, $4) ", [name, descp, quantity, category_id])
  response.json(rows)
}


async function updateItem(request, response) {
  const {name, description, quantity, category_id, id} = request.params
  const {rows} = await dbPool.query("SET name = '$1', description = '$2' , quantity = '$3', category_id = '$4' WHERE id = '$5'", [name,description, quantity, category_id, id])
  response.json(rows)
  
}

async function updateItemQuantity(request, response) {
  const {updatedQuantity, id} = request.params
  const {rows} = await dbPool.query("SET quantity = quantity + $1 WHERE id = $2", [updatedQuantity, id])
  response.json(rows)
}

async function deleteItem(request, response) {
  const id = request.params
  const {rows} = await dbPool.query("DELETE FROM item WHERE id = $1", [id])
  response.json(rows)
}

export {getAllTheItems, addItem, updateItem, updateItemQuantity, deleteItem};
