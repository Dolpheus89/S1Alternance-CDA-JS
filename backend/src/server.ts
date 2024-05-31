import app from "./app"
import "dotenv/config"

const PORT:string = process.env.BACKEND_PORT || "3000"

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
    
})

