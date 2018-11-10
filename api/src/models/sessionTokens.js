class SessionToken {  
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS session_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountId INTEGER,
      token TEXT,
      createDate DATETIME,
      expiryDate DATETIME,
      CONSTRAINT session_tokens_fk_accountId FOREIGN KEY (accountId)
        REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

  create(accountId, token) {
    return this.dao.run(
      'INSERT INTO session_tokens (accountId, token) VALUES (?, ?)',
      [accountId, token])
  }

  update(session_token) {
    const { id, accountId, token, expiryDate } = session_token
    return this.dao.run(
      `UPDATE session_tokens 
      SET accountId = ?, 
        token = ?, 
        expiryDate = ? 
      WHERE id = ?`,
      [accountId, token, expiryDate, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM session_tokens WHERE id = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM session_tokens WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM session_tokens`)
  }
}