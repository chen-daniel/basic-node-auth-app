class Accounts {  
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        fullName TEXT,
        email TEXT)`
    return this.dao.run(sql)
  }

  create(username, password, fullName, email) {
    return this.dao.run(
      `INSERT INTO accounts (username, password, fullName, email)
        VALUES (?, ?, ?, ?)`,
      [username, password, fullName, email])
  }

  update(account) {
    const { id, username, password, fullName, email } = account
    return this.dao.run(
      `UPDATE accounts
      SET username = ?,
        password = ?,
        fullName = ?,
        email = ?
      WHERE id = ?`,
      [username, password, fullName, email, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM accounts WHERE id = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM accounts WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM accounts`)
  }
}