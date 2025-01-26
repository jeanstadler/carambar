const selectAllBlaguesRandom = async () => {
	const request = new Request(`${import.meta.env.VITE_API_URL}/blagues/random`);
	// fecth permet de faire une requête HTTP
    console.log(request)
	const response = await fetch(request);
	// récupérer le données json contenues dans la reponse
	const data = await response.json();

	return data;
};
export { selectAllBlaguesRandom };
