import express from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Dummy data
let users = [
  { id: 1, name: "Sushil", email: "sushil@example.com" },
  { id: 2, name: "Rohan", email: "rohan@example.com" }
];

// Home - Show all users
app.get("/", (req, res) => {
  res.render("major_HTTP_methods", { users });
});
// Show a single user (GET /user/:id)
app.get("/user/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.render("user_detail", { user });
  } else {
    res.status(404).render("error", { error: new Error("User not found") });
  }
});
// Show all users (GET /user)
app.get("/user", (req, res) => {
  res.render("user_list", { users });
});


// POST - Add a user
app.post("/user", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };
  users.push(newUser);
  res.redirect("/");
});

// PUT - Full update
app.put("/user/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    res.redirect("/");
  } else {
    res.status(404).render("error", { error: new Error("User not found") });
  }
});

// PATCH - Partial update
app.patch("/user/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    res.redirect("/");
  } else {
    res.status(404).render("error", { error: new Error("User not found") });
  }
});

// DELETE - Delete user
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.redirect("/");
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).render("error", { error: err });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
