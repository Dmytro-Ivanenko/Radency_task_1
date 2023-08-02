import Notes from '../data/notes.json';

export const initData = () => {
  localStorage.setItem('notes', JSON.stringify(Notes.notes));
};

export const getData = key => {
  return JSON.parse(localStorage.getItem(`${key}`));
};

initData();
