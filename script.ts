import User from "./models/User";
import dbConnect from "./lib/db";

async function main() {
  try {
    await dbConnect();
    console.log("Database connected");
    await User.updateMany({}, { $set: { earned: 0 } });
    console.log("Users updated successfully");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
main().catch((error) => {
  console.error("Error in main execution:", error);
});
