import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Product } from "../types/product.type";
import { parseBody } from "../Utility/parseBody";
import { sendResponse } from "../Utility/sendResponse";

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

    try {
     return sendResponse(res, 200, true, "This Is Product route", products);
    } catch (error) {
     return sendResponse(res, 500, false, "Server Down", error);
    }
  }

  //   Get Single product
  else if (method === "GET" && id !== null) {
    try {
      const products = readProduct();

      const product = products.find((p: Product) => p.id === id);
   return   sendResponse(
        res,
        200,
        true,
        "This Is The Product of specific id",
        product,
      );
    } catch (error) {
     return sendResponse(res, 500, false, "Server Down", error);
    }
  }

  // Create A Product by post method
  else if (method === "POST" && url?.startsWith("/products")) {
    try {
      const body = await parseBody(req);
      console.log(body);
      const products = readProduct();

      const newProduct = {
        id: Date.now(),
        ...body,
      };

      products.push(newProduct);

      insertProduct(products);
      return sendResponse(res, 200, true, "Product Added Successfully", newProduct);
    } catch (error) {
     return sendResponse(res, 500, false, "Server Down", error);
    }
  } else if (method === "PUT" && id !== null) {
    try {
      const body = await parseBody(req);
      const products = readProduct();
      const index = products.findIndex((p: Product) => p.id === id);

      if (index < 0) {
        return sendResponse(res, 404, false, "No Data");
      }

      products[index] = { id: products[index].id, ...body };
      insertProduct(products);
    return  sendResponse(
        res,
        200,
        true,
        "Product Updated Successfully",
        products[index],
      );
    } catch (error) {
     return  sendResponse(res, 500, false, "Server Down", error);
    }
  } else if (method === "DELETE" && id !== null) {
    try {
      const products = readProduct();
      const index = products.findIndex((p: Product) => p.id === id);

      if (index < 0) {
        return sendResponse(res, 500, false, "Server Down");
      }

      products.splice(index, 1);
      insertProduct(products);
      return sendResponse(res, 200, true, "The Products Has Successfully deleted");
    } catch (error) {
      return sendResponse(res, 500, false, "Server Down", error);
    }
  } else {
    return sendResponse(res, 500, false, "Server Down");
  }
};
