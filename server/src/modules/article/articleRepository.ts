import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Article = {
  id: number;
  title: string;
  content: string;
};

class ArticleRepository {
  // The C of CRUD - Create operation

  async create(article: Omit<Article, "id">) {
    // Execute the SQL INSERT query to add a new item to the "article" table
    const [result] = await databaseClient.query<Result>(
      "insert into article (title, content) values (?, ?)",
      [article.title, article.content],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from article where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Article;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from article");

    // Return the array of items
    return rows as Article[];
  }

  // The U of CRUD - Update operation
  async update(id: number, article: Omit<Article, "id">) {
    // Execute the SQL UPDATE query to modify an existing item by its ID
    const [result] = await databaseClient.query<Result>(
      "update article set title = ?, content = ? where id = ?",
      [article.title, article.content, id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove an item by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from article where id = ?",
      [id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
}

export default new ArticleRepository();
