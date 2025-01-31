import Joke from '../models/joke.model.js';

class JokeRepository {
  public async getAllJokes() {
    return await Joke.findAll();
    // .findAll() est une fonction fournie par sequelize
  }

  public async getJokeById(id: number) {
    return await Joke.findByPk(id);
    // .findByPk(id) est une fonction fournie par sequelize
  }

  public async addJoke(question: string, answer: string) {
    return await Joke.create({ question, answer });
  }

  public async getRandomJoke() {
    console.log("modifed test")
    const jokes = await Joke.findAll();
    if (jokes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  public async initializeJokes() {
    const initialJokes = [
      {
        question: "Quelle est la femelle du hamster ?",
        answer: "L'Amsterdam"
      },
      {
        question: "Que dit un oignon quand il se cogne ?",
        answer: "Aïe"
      },
      {
        question: "Quel est l'animal le plus heureux ?",
        answer: "Le hibou, parce que sa femme est chouette."
      },
      {
        question: "Pourquoi le football c'est rigolo ?",
        answer: "Parce que Thierry en rit"
      }
    ];

    try {
      await Joke.sync();
      const count = await Joke.count();
      if (count === 0) {
        await Joke.bulkCreate(initialJokes);
      }
    } catch (error) {
      console.error('Error initializing jokes:', error);
      throw error;
    }
  }
}

export default JokeRepository;