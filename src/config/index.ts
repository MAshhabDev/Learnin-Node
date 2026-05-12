import dotnev from "dotenv";
import path from "path";


// For Find The Current Path

dotnev.config({ path: path.resolve(process.cwd(), ".env") });


// Create the confige for port

const config = {
  port: process.env.PORT,
};

export default config;
