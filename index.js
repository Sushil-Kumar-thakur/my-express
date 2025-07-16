// index.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { user_login_static } from './Middleware_Function/user_login_static.js';
import methodOverride from 'method-override'; 
import userRoutes from './routes/userRoutes.js';
import { timeLogger } from './Middleware_Function/timeLogger.js';
import { workingHours } from './Middleware_Function/workingHours.js';
// import expressLayouts from 'express-ejs-layouts';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============ CONFIG ============
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
// app.use(expressLayouts); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());  // Parses JSON data for every incoming request
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ============ LOAD USERS ============
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

// ============ ROUTES ============

app.get('/login', (req , res ) => {
  res.render('user_login_static')
});
app.post('/login' , user_login_static , (req , res ) => {
  res.send('✅ Login successful!');
});


// ✅ Application-Level Middleware
app.use(timeLogger);
app.use(workingHours);
// Use router-level middleware under /users
app.use('/users', userRoutes);  // 👉 All user routes prefixed with /users







app.use(function(req, res ,next){
  console.log("chal bhai"); 
  next(); 
});

app.get("/" , (req ,res) => {
  res.send("brother what is your name "); 
});

app.get("/bhai" , (req ,res) => {
  res.send(" hello bhai jaan ")
});
 






// ============ RESTful Routes ============
app.post('/submit', (req, res) => res.send('✅ Data received via POST'));
app.put('/update', (req, res) => res.send('🛠️ Data updated with PUT'));
app.delete('/delete', (req, res) => res.send('❌ Item deleted with DELETE'));

// ============ Error Handling ============
app.get('/error', (req, res) => {
  throw new Error("💥 Something went wrong!");
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(500).render('error', { message: "Something went wrong" });
});

app.use((req, res) => {
  res.status(404).send("🚫 Page Not Found");
});

// ============ Start Server ============
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
