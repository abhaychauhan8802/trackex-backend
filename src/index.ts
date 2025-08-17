import app from "./app";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "10.104.81.233", () => {
  console.log("Server started on port 3000");
});
