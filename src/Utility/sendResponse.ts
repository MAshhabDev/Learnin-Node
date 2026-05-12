import type { ServerResponse } from "http";

export const sendResponse = (
    // Declare The Type
  res: ServerResponse,
  statusCode: number,

  success: boolean,
  message: string,
  data?: any,
) => {
  const response = {
    success,
    message,
    data,
  };
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
