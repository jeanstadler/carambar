const selectAllBlagues = async () => {
	const request = new Request(`${import.meta.env.VITE_API_URL}/blagues`);
	// fetch permet de faire une requête HTTP
	const response = await fetch(request);
	// récupérer les données JSON contenues dans la réponse
	const data = await response.json();
    console.log(request)
	return data;
};

const selectBlagueById = async (id) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/blagues/${id}`);
    const response = await fetch(request);
    if (!response.ok) {
        throw new Error('Blague non trouvée');
    }
    const data = await response.json();
    return data;
};

const addBlague = async (question, answer) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/blagues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
    });

    const response = await fetch(request);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout de la blague.');
    }

    const data = await response.json();
    return data;
};

export { selectAllBlagues, selectBlagueById, addBlague };
