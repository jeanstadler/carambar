const selectAllBlaguesIndex = async () => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/blagues/index`);
    const response = await fetch(request);
    const data = await response.json();
    return data;
}
export { selectAllBlaguesIndex };