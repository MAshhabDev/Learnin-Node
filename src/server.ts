import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //   console.log(req);
    routeHandler(req, res);
  },
);

server.listen(config.port, () => {
  console.log(`Server Is Running on port ${config.port}`);
});
