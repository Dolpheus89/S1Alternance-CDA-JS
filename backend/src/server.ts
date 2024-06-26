import app from "./app"
import { dsc } from "./utils/db";
import "dotenv/config"
import "reflect-metadata"

const PORT:string = process.env.BACKEND_PORT || "3000"

app.listen(PORT , async () => {
    await dsc.initialize()
    console.log(`server is running on http://localhost:${PORT}`);
})

