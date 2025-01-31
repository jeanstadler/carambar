import { useState } from 'react';
import { selectAllBlagues } from "../service/blagues";

const AllJokes = () => {
    const [blagues, setBlagues] = useState([]);

    const fetchAllBlagues = async () => {
        try {
            const data = await selectAllBlagues();
            setBlagues(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <button onClick={fetchAllBlagues}>
                Voir toutes les blagues
            </button>

            {blagues.length > 0 && (
                <article>
                    <h2>Liste des Blagues</h2>
                    <ul>
                        {blagues.map((blague) => (
                            <li key={blague.id}>
                                <p>Question : {blague.question}</p>
                                <p>Réponse : {blague.answer}</p>
                            </li>
                        ))}
                    </ul>
                </article>
            )}
        </section>
    );
};

export default AllJokes;
