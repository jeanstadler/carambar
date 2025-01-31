import { useState } from 'react';
import { addBlague } from "../service/blagues";

const AddJokes = () => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const handleAddBlague = async () => {
        if (!newQuestion.trim() || !newAnswer.trim()) return;
        
        try {
            await addBlague(newQuestion, newAnswer);
            setNewQuestion('');
            setNewAnswer('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <h2>Ajouter une Nouvelle Blague</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Question"
                    />
                </fieldset>
                <fieldset>
                    <input
                        type="text"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="Réponse"
                    />
                </fieldset>
                <button onClick={handleAddBlague}>Ajouter</button>
            </form>
        </section>
    );
};

export default AddJokes;
