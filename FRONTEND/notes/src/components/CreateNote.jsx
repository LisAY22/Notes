import React from 'react';
import { createNote } from '../services/NotesAPI.js';

function CreateNote(){
    const [note, setNote] = React.useState({
        title: '',
        content: ''
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createNote(note);
            window.alert('Note created successfully!');
            setNote({ title: '', content: '' });
        } catch (error) {
            window.alert('Error creating note. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container"> 
            <h2>Create Note Component</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" 
                        value={note.title} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" name="content" rows="3"
                        value={note.content} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default CreateNote;