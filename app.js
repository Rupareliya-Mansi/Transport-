const express = require("express");
app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3010;
const db = require("./config/db");
app.use(express.json());

const Luggage_data = require("./route/add_luggage");
app.use("/luggage", Luggage_data);   


const customer_data = require("./route/customer_info");
app.use("/customer", customer_data);

// const roal_permissions = require("./route/Roal_Admin");
// app.use("/roal_permissions", roal_permissions);

server.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
