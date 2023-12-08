import { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        notes: [],
    };

    componentDidMount() {
        axios.get("/notes").then((response) => {
            this.setState({ notes: response.data });
        });

        //follow this to line 35 in the index.js file on the server side
        //in the console.log on the browser, you'll see the response from the server "Hey, you need to give me proper JSON"
        axios.post("/notes", "hello").then((response) => {
            console.log(response)
        })
    }

    render() {
        return (
            <div className="app">
                <h1>Client app Change This</h1>
                {this.state.notes.map((note) => (
                    <article key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </article>
                ))}
            </div>
        );
    }
}

export default App;
