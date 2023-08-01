import Notes from '../data/notes.json';


export const initData = () => {
    localStorage.setItem("notes", JSON.stringify(Notes.notes));
    localStorage.setItem("archivedNotes", JSON.stringify(Notes.archivedNotes));
}

export const getData = (key) => {
    return JSON.parse(localStorage.getItem(`${key}`));
}

initData();




