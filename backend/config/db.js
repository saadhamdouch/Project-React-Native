// db.js
const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
    }
    this.connection = null;
    return Database.instance;
  }

  async connect(uri) {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(uri);
        console.log("Database connected successfully");
      } catch (error) {
        console.error("Database connection error:", error);
        throw error;
      }
    }
    return this.connection;
  }
}

const instance = new Database();
module.exports = instance;
