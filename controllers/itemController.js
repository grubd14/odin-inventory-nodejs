import { dbPool } from "../db/dbPool.js";

//TO-DO
// pass all the data through body not in URL parameters
// test all the APIs

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
  response.json(rows)

}

async function getItemById(request, response) {
  const { id } = request.params;
  const { rows } = await dbPool.query("SELECT * FROM item WHERE id = $1", [id]);
  response.json(rows);
}

async function addItem(request, response) {
  const { name, description, quantity, category_id } = request.body;
  const { rows } = await dbPool.query(
    "INSERT INTO item (name, description, quantity, category_id) VALUES ($1, $2, $3, $4) ",
    [name, description, quantity, category_id],
  );
  response.json(rows);
}

async function updateItem(request, response) {
  const { name, description, quantity, category_id, id } = request.body;
  const { rows } = await dbPool.query(
    "UPDATE item SET name = $1, description = $2 , quantity = $3, category_id = $4 WHERE id = $5",
    [name, description, quantity, category_id, id],
  );
  response.json(rows);
}

async function updateItemQuantity(request, response) {
  const { quantity, id } = request.body;
  const { rows } = await dbPool.query(
    "UPDATE item SET quantity = quantity + $1 WHERE id = $2",
    [quantity, id],
  );
  response.json(rows);
}

async function deleteItem(request, response) {
  const { id } = request.params;
  const { rows } = await dbPool.query("DELETE FROM item WHERE id = $1", [id]);
  response.json(rows);
}

export {
  getAllTheItems,
  addItem,
  updateItem,
  updateItemQuantity,
  deleteItem,
  getItemById,
};
