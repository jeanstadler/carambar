import { Request, Response } from 'express';
import JokeRepository from '../repository/joke-repository.js';

class JokeController {
  private jokeRepository: JokeRepository = new JokeRepository();

  public getJokes = async (req: Request, res: Response) => {
    try {
      const jokes = await this.jokeRepository.getAllJokes();
      res.json(jokes);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des blagues' });
    }
  }

  public getJoke = async (req: Request, res: Response) => {
    try {
      const joke = await this.jokeRepository.getJokeById(Number(req.params.id));
      if (!joke) {
        return res.status(404).json({ error: 'Blague non trouvée' });
      }
      res.json(joke);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la blague' });
    }
  }

  public createJoke = async (req: Request, res: Response) => {
    try {
      const { question, answer } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ error: 'La question et la réponse sont requises' });
      }
      const joke = await this.jokeRepository.addJoke(question, answer);
      res.status(201).json(joke);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague' });
    }
  }

  public getRandom = async (req: Request, res: Response) => {
    try {
      const joke = await this.jokeRepository.getRandomJoke();
      if (!joke) {
        return res.status(404).json({ error: 'Aucune blague disponible' });
      }
      res.json(joke);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération d\'une blague aléatoire' });
    }
  }
} 

export default JokeController;