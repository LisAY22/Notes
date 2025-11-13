const API_URL = 'http://127.0.0.1:8000/notes/';

export const fetchNotes = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error fetching notes');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch Notes Error:', error);
        return [];
    }
};

export const createNote = async (noteData) => {
    try {
        const response = await fetch(`${API_URL}create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        }); 
        if (!response.ok) {
            throw new Error('Error creating note');
        }
        return await response.json();   
    } catch (error) {
        console.error('Create Note Error:', error);
        return null;
    }   
};