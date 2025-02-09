import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: '*', 
    credentials: false 
}));

app.use(morgan("dev"));

app.use("/api/v1",router);

app.all("*",(req,res) => {
    res.status(404).send("404 OOPS!! Page not found");
})


export default app;