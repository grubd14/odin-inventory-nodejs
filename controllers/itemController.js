import { dbPool } from "../db/dbPool.js";

//postgres returns the rows from the queries in rows object
// cannot use any other name
async function getAllTheItems(request, response) {
  const { rows } = await dbPool.query("SELECT * FROM item");
  const items = rows;
  console.log(items);
  response.render("item", {title: "Items List", items: items})
}

export default getAllTheItems;
