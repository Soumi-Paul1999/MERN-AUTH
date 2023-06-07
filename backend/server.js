import express from "express";
import dotenv from "dotenv";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use("/api/users",userRoutes);
app.get("/", (req,res)=>{
    res.send("server is ready")
})

app.use(notFound);
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server running on the port http://localhost:${port}`)
});

//POST/api/users = Register a user
//POST /api/users/auth = Authenticate a user and get token
//POST /api/users/logout = Logout user and clear cookie
// GET /api/users/profile = get user profile
// PUT /api/users/profile = Update profile