import { useState } from "react";
import AllJokes from "./all_Jokes";
import RandomJokes from "./random_jokes";
import AddJokes from "./add_jokes";
import IndexJokes from "./index_Jokes";

const HomePage = () => {
    const [message, setMessage] = useState("Prêt à se fandre la poire ?");

    const resetView = () => {
        setMessage("Prêt à se fandre la poire ?");
        window.location.reload();
    };

    return (
        <main>
            <h1>Blagues</h1>
            <section>
                <button onClick={resetView}>
                    Reset
                </button>
            </section>

            {message && <p>{message}</p>}

            <AllJokes />
            <RandomJokes />
            <AddJokes />
            <IndexJokes />
        </main>
    );
};

export default HomePage;
