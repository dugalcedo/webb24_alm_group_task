const express = require("express");
const { testConnection } = require("./config/database");
const UserRouter = require("./routes/User");
const AccommodationRouter = require("./routes/Accommodation");
const { doAssociations } = require("./config/associations.js")

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/users", UserRouter);
app.use("/accomodations", AccommodationRouter)

app.get("/", (req, res) => {
  res.send("It's working.")
})

// Start server
async function start() {

  // ASSOCIATIONS
  doAssociations()
  const connected = await testConnection()
  if (!connected) {
    console.log(`Failed to connect. Shutting down.`)
    process.exit()
  }


  app.listen(port, () => {
    console.log(`Now listening: http://localhost:${port}`)
  })
}
start()
