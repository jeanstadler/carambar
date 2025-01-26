import 'dotenv/config';
import Server from "./src/core/server.js";
import JokeRepository from './src/repository/joke-repository.js';

const init = async () => {
  try {
    const jokeRepository = new JokeRepository();
    await jokeRepository.initializeJokes();
    
    const server = new Server().createServer();
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

init();