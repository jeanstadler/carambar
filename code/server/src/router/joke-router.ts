import express, { Router } from "express";
import JokeController from "../controller/joke-controller.js";

class JokeRouter {
  private router: Router = express.Router();
  private jokeController: JokeController = new JokeController();

  public getRouter = (): Router => {
    this.router.get('/blagues', this.jokeController.getJokes);
    this.router.get('/blagues/random', this.jokeController.getRandom);
    this.router.get('/blagues/:id', this.jokeController.getJoke);
    this.router.post('/blagues', this.jokeController.createJoke);
    
    return this.router;     
  }
}

export default JokeRouter;