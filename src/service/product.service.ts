import path from "path";
import fs from "fs";
// For merge or join the two file
const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct = () => {
  const product = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(product);

  
};
