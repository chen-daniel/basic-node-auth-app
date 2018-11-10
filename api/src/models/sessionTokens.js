class SessionTokens {
  constructor(dao) {
    this.dao = dao;
  }

  async createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS session_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountId INTEGER,
      token TEXT,
      expiryDate DATETIME,
      CONSTRAINT session_tokens_fk_accountId FOREIGN KEY (accountId)
        REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return await Promise.resolve(this.dao.run(sql));
  }

  async create(accountId, token) {
    return await Promise.resolve(
      this.dao.run(
        'INSERT INTO session_tokens (accountId, token) VALUES (?, ?)',
        [accountId, token]
      )
    ).catch((err) => {
      console.log(err);
    });
  }

  async update(session_token) {
    const { id, accountId, token, expiryDate } = session_token;
    return await Promise.resolve(
      this.dao.run(
        `UPDATE session_tokens 
      SET accountId = ?, 
        token = ?, 
        expiryDate = ? 
      WHERE id = ?`,
        [accountId, token, expiryDate, id]
      )
    ).catch((err) => {
      console.log(err);
    });
  }

  async delete(id) {
    return await Promise.resolve(
      this.dao.run(`DELETE FROM session_tokens WHERE id = ?`, [id])
    ).catch((err) => {
      console.log(err);
    });
  }

  async getById(id) {
    return await Promise.resolve(
      this.dao.get(`SELECT * FROM session_tokens WHERE id = ?`, [id])
    ).catch((err) => {
      console.log(err);
    });
  }

  async getAll() {
    return await Promise.resolve(
      this.dao.all(`SELECT * FROM session_tokens`)
    ).catch((err) => {
      console.log(err);
    });
  }
}
module.exports = SessionTokens;
