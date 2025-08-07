import app from "./app";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "192.168.65.233", () => {
  console.log("Server started on port 3000");
});
