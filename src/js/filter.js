import { getData } from './storageAPI';
import { notesMarkup } from './notesList';

const Filter = document.querySelector('.filter');
const currentFilterValue = document.querySelector(
  'input[name="notesFilter"]:checked'
).value;

const toFilterNotes = status => {
  const notesArr = getData('notes');
  const filteredArr = notesArr.filter(note => note.status === status);

  notesMarkup(filteredArr);
};

Filter.addEventListener('change', ev => {
  const selectedFilter = ev.target.value;
  toFilterNotes(selectedFilter);
});

toFilterNotes(currentFilterValue);
