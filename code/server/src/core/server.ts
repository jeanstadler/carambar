import express, {
  type Router,
  type Express,
} from "express";
import http from "node:http";
import cors from "cors";
import jokeRouter from "../router/joke-router.js";

class Server {
  private app: Express = express();
  private router: Router = express.Router();

  constructor() {
    this.app.use(express.json());
    this.app.use(cors({
      origin: process.env.ORIGINS?.split(",")
    }));
    this.app.use(express.static(process.env.ASSETS_DIRECTORY as string));
    this.app.use(this.router);
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.use("/", new jokeRouter().getRouter());
  };

  public createServer = (): http.Server => {
    return http.createServer(this.app);
  };
}

export default Server;