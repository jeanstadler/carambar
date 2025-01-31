import { useState } from 'react';
import { selectAllBlaguesRandom } from "../service/blagues-random";

const RandomJokes = () => {
    const [blague, setBlague] = useState(null);

    const fetchRandomBlague = async () => {
        try {
            const data = await selectAllBlaguesRandom();
            setBlague(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <button onClick={fetchRandomBlague}>
                Blague aléatoire
            </button>

            {blague && (
                <article>
                    <p>Question : {blague.question}</p>
                    <p>Réponse : {blague.answer}</p>
                </article>
            )}
        </section>
    );
};

export default RandomJokes;
