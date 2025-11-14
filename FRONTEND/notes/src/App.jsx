import React from 'react';
import HeaderApp from './components/HeaderApp';
import FooterApp from './components/FooterApp';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import { fetchNotes } from './services/NotesAPI.js';

function App() {
    const [notes, setNotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadNotes = async () => {
            let data = await fetchNotes();
            setNotes(data);
        }; 
        loadNotes();
    }, [loading]);

    const handleNotesChange = () => {
        setLoading(!loading);
    }

    return (
        <div className='container-fluid p-0'>
            <HeaderApp />
            <div className='container my-4'>
                <h2 className='text'>Notes</h2>
                <div className='row'>
                    {notes.map((note) => (
                        <div className='col-md-4 mb-3' key={note.id}>
                            <Notes title={note.title} content={note.content} />
                        </div>
                    ))}
                </div>
            </div>
            <CreateNote onNotesChange={handleNotesChange} />
            <FooterApp />
        </div>
    )
}

export default App;
