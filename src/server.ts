import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "http";
import { routeHandler } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //   console.log(req);
    routeHandler(req, res);
  },
);

server.listen(5000, () => {
  console.log("Server Is Running on port 5000");
});
