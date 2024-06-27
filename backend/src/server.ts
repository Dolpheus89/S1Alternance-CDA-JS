import app from "./app"
import { dsc, clearDB, initData } from "./utils/db";
import "dotenv/config"
import "reflect-metadata"

const PORT:string = process.env.BACKEND_PORT || "3000"

app.listen(PORT , async () => {
    await dsc.initialize()
    await clearDB()
    await initData()

    console.log(`server is running on http://localhost:${PORT}`);
})

