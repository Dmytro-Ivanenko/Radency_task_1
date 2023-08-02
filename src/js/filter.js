import { getData } from '../services/storageAPI';
import { fillNotesTable } from './notesList';

const Filter = document.querySelector('.filter');

export const getCurrentFilterValue = () => {
  return document.querySelector('input[name="notesFilter"]:checked').value;
};

export const toFilterNotes = status => {
  const notesArr = getData('notes');
  const filteredArr = notesArr.filter(note => note.status === status);

  return filteredArr;
};

const onFilterChange = ev => {
  const selectedFilter = ev.target.value;
  const filteredArr = toFilterNotes(selectedFilter);
  fillNotesTable(filteredArr);
};

Filter.addEventListener('change', onFilterChange);
