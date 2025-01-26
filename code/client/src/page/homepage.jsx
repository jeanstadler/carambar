import { useState, useEffect } from "react";
import { selectAllBlagues, selectBlagueById, addBlague } from "../service/blagues";
import { selectAllBlaguesRandom } from "../service/blagues-random";

const HomePage = () => {
    const [blagues, setBlagues] = useState([]);
    const [blague, setBlague] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("Prêt à se fandre la poire ?");
    const [inputId, setInputId] = useState('');

    // États pour le formulaire d'ajout
    const [showAddForm, setShowAddForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addSuccess, setAddSuccess] = useState(null);

    const fetchAllBlagues = async () => {
        setLoading(true);
        setError(null);
        setMessage("");
        try {
            const data = await selectAllBlagues();
            setBlagues(data);
            setBlague(null);
        } catch (err) {
            setError("Erreur lors de la récupération des blagues.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRandomBlague = async () => {
        setLoading(true);
        setError(null);
        setMessage("");
        try {
            const data = await selectAllBlaguesRandom();
            setBlague(data);
            setBlagues([]);
        } catch (err) {
            setError("Erreur lors de la récupération de la blague aléatoire.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlagueById = async () => {
        if (!inputId) {
            setError("Veuillez entrer un ID.");
            return;
        }
        setLoading(true);
        setError(null);
        setMessage("");
        try {
            const data = await selectBlagueById(inputId);
            setBlague(data);
            setBlagues([]);
        } catch (err) {
            setError(err.message || "Erreur lors de la récupération de la blague.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetView = () => {
        setBlagues([]);
        setBlague(null);
        setError(null);
        setMessage("Prêt à se fandre la poire ?");
        setInputId('');
        setShowAddForm(false);
        setNewQuestion('');
        setNewAnswer('');
        setAddError(null);
        setAddSuccess(null);
    };

    const handleAddBlague = async () => {
        if (!newQuestion.trim() || !newAnswer.trim()) {
            setAddError("Les champs question et réponse sont obligatoires.");
            return;
        }

        setAddLoading(true);
        setAddError(null);
        setAddSuccess(null);

        try {
            const addedBlague = await addBlague(newQuestion, newAnswer);
            setAddSuccess("Blague ajoutée avec succès !");
            // Optionnel : Ajouter la nouvelle blague à la liste sans recharger
            setBlagues((prevBlagues) => [...prevBlagues, addedBlague]);
            // Réinitialiser le formulaire
            setNewQuestion('');
            setNewAnswer('');
            setShowAddForm(false);
        } catch (err) {
            setAddError(err.message || "Erreur lors de l'ajout de la blague.");
            console.error(err);
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <main>
            <h1>Blagues</h1>
            <div style={{ marginBottom: "20px" }}>
                <button onClick={fetchAllBlagues} style={{ marginRight: "10px" }}>
                    Voir toutes les blagues
                </button>
                <button onClick={fetchRandomBlague} style={{ marginRight: "10px" }}>
                    Blague aléatoire
                </button>
                <button onClick={resetView} style={{ marginRight: "10px" }}>
                    Reset
                </button>
                <button onClick={() => setShowAddForm(!showAddForm)}>
                    Ajouter une nouvelle blague
                </button>
            </div>

            {showAddForm && (
                <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                    <h2>Ajouter une Nouvelle Blague</h2>
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            Question:
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Entrez la question"
                                style={{ marginLeft: "10px", padding: "0.5em", width: "80%" }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            Réponse:
                            <input
                                type="text"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                placeholder="Entrez la réponse"
                                style={{ marginLeft: "10px", padding: "0.5em", width: "80%" }}
                            />
                        </label>
                    </div>
                    {addError && <p style={{ color: "red" }}>{addError}</p>}
                    {addSuccess && <p style={{ color: "green" }}>{addSuccess}</p>}
                    <button onClick={handleAddBlague} disabled={addLoading}>
                        {addLoading ? "Validation..." : "Valider"}
                    </button>
                </div>
            )}

            <div style={{ marginBottom: "20px" }}>
                <h2>Choisir une blague par ID</h2>
                <input 
                    type="number" 
                    value={inputId} 
                    onChange={(e) => setInputId(e.target.value)} 
                    placeholder="Entrez l'ID de la blague" 
                    style={{ marginRight: "10px", padding: "0.5em" }}
                />
                <button onClick={fetchBlagueById}>Entrer</button>
            </div>

            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p>{message}</p>}

            {blagues.length > 0 && (
                <div>
                    <h2>Liste des Blagues</h2>
                    <ul>
                        {blagues.map((blague) => (
                            <li key={blague.id} style={{ marginBottom: "10px" }}>
                                <strong>Question :</strong> {blague.question} <br />
                                <strong>Réponse :</strong> {blague.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {blague && (
                <div>
                    <h2>Blague Sélectionnée</h2>
                    <p><strong>Question :</strong> {blague.question}</p>
                    <p><strong>Réponse :</strong> {blague.answer}</p>
                </div>
            )}
        </main>
    );
};

export default HomePage;
