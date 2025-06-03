const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
app.use(cors());

connectDB();
app.use(express.json());

// Define Routes
app.use("/api/roles", require("./routes/roles.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/corusel", require("./routes/corusel.routes"));
app.use("/api/image", require("./routes/image.routes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
