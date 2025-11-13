import React from 'react';
import HeaderApp from './components/HeaderApp';
import FooterApp from './components/FooterApp';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import { fetchNotes } from './services/NotesAPI.js';

function App() {
    const [notes, setNotes] = React.useState([]);

    React.useEffect(() => {
        const loadNotes = async () => {
            let data = await fetchNotes();
            setNotes(data);
        }; 
        loadNotes();
    }, []);

    return (
        <div className='container-fluid p-0'>
            <HeaderApp />
            <div className='container my-4'>
                <div className='row'>
                    {notes.map((note) => (
                        <div className='col-md-4 mb-3' key={note.id}>
                            <Notes title={note.title} content={note.content} />
                        </div>
                    ))}
                </div>
            </div>
            <CreateNote />
            <FooterApp />
        </div>
    )
}

export default App;
