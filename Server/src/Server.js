import app from "./app/app.js";
import config from "./config/config.js";
import Dbconnection from "./config/db.js";

await Dbconnection();
app.listen(config.PORT, () => {
  console.log(`Server is runing on port ${config.PORT}`);
});
