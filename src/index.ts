import app from "./app";
const dotenv = require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("DB connection successful!");
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
