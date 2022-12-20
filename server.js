const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

require("dotenv").config();

app.listen(PORT, () => {
  console.log(`API server now listening on port ${PORT}`);
});
