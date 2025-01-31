import { useState } from 'react';
import { selectBlagueById } from "../service/blagues";

const IndexJokes = () => {
    const [blague, setBlague] = useState(null);
    const [inputId, setInputId] = useState('');

    const fetchBlagueById = async () => {
        if (!inputId) return;
        try {
            const data = await selectBlagueById(inputId);
            setBlague(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <h2>Chercher une blague par ID</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="number" 
                    value={inputId} 
                    onChange={(e) => setInputId(e.target.value)} 
                    placeholder="ID de la blague" 
                />
                <button onClick={fetchBlagueById}>Chercher</button>
            </form>

            {blague && (
                <article>
                    <p>Question : {blague.question}</p>
                    <p>Réponse : {blague.answer}</p>
                </article>
            )}
        </section>
    );
};

export default IndexJokes;
