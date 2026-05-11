import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { Product } from "../types/product.type";
import { parseBody } from "../Utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlStrip = url?.split("/");
  const id =
    urlStrip && urlStrip[1] === "products" ? Number(urlStrip[2]) : null;

  // get All product
  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This Is Product route", data: products }),
    );
  }

  //   Get Single product
  else if (method === "GET" && id !== null) {
    const products = readProduct();

    const product = products.find((p: Product) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This Is Single Product route",
        data: product,
      }),
    );
  }

  // Create A post method
  else if (method === "POST" && url?.startsWith("/products")) {
    const body = await parseBody(req);
    console.log(body);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This Is Single Product route",
        data: "",
      }),
    );
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product route not found",
      }),
    );
  }
};
