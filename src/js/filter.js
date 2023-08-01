import { getData } from './storageAPI';

export const toFilterNotes = status => {
  const notesArr = getData('notes');
  return notesArr.filter(note => note.status === status);
};
