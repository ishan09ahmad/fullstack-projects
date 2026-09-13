import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/mongodb.js";
await connectDB();
// const port=process.env.PORT;

// app.listen(port, () => {
//   console.log("server is running on port:", port);
// });

export default app;