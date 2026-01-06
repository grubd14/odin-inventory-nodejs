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

/**
 * GET /category
 * Return a list of all categories
 */
export async function getAllCategories(req, res) {
  try {
    const result = await dbPool.query(
      `SELECT id, name, description FROM category ORDER BY id`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("getAllCategories error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * GET /category/:id
 * Return a single category by id
 */
export async function getCategoryById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid category id" });
  }

  try {
    const result = await dbPool.query(
      `SELECT id, name, description FROM category WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("getCategoryById error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * POST /category
 * Create a new category
 * Body: { name: string, description?: string }
 */
export async function createCategory(req, res) {
  const { name, description = null } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const result = await dbPool.query(
      `INSERT INTO category (name, description) VALUES ($1, $2) RETURNING id, name, description`,
      [name.trim(), description]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("createCategory error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * PUT /category/:id
 * Update an existing category
 * Body: { name?: string, description?: string }
 */
export async function updateCategory(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid category id" });
  }

  const { name, description } = req.body ?? {};

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    return res.status(400).json({ error: "If provided, name must be a non-empty string" });
  }

  // Build a dynamic update based on provided fields
  const fields = [];
  const values = [];
  let idx = 1;

  if (name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(name.trim());
  }
  if (description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(description);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "At least one field (name or description) must be provided" });
  }

  values.push(id); // final param is the id

  const sql = `UPDATE category SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, name, description`;

  try {
    const result = await dbPool.query(sql, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("updateCategory error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * DELETE /category/:id
 * Delete a category by id
 */
export async function deleteCategory(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid category id" });
  }

  try {
    const result = await dbPool.query(
      `DELETE FROM category WHERE id = $1 RETURNING id`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Successfully deleted
    return res.status(204).send(); // no content
  } catch (err) {
    console.error("deleteCategory error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
