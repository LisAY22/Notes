import '../index.css';


function Notes({title, content}){
    return (
        <div className="card">
            <div className="card-body notes-color">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    );

}

export default Notes;