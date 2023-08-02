import uniqid from 'uniqid';
import { addData } from '../services/storageAPI';
import { toFilterNotes, getCurrentFilterValue } from './filter';
import {
  getCurrentDateTime,
  extractDatesFromText,
} from '../services/workWithDate';

const NotesTable = document.querySelector('#notesTableBody');
const AddNoteButton = document.querySelector('#addNote');

export const notesMarkup = notesArr => {
  const markup = notesArr
    .map(({ id, name, content, createdAt, category }) => {
      const dates = extractDatesFromText(content);
      return `<tr id=${id}>
  <td><input type="text" value="${name}"  readonly /></td>
  <td>${createdAt}</td>
  <td>
    <select disabled>
      <option value="Task" ${
        category === 'Task' ? 'selected' : ''
      }>Task</option>
      <option value="Idea" ${
        category === 'Idea' ? 'selected' : ''
      }>Idea</option>
       <option value="Random Thought" ${
         category === 'Random Thought' ? 'selected' : ''
       }>Random Thought</option>
      
    </select>
  </td>
  <td><input type="text" value="${content}" readonly/></td>
  <td>${dates}</td>
  <td>
    <div> <button> edit </button>
        <button> arch </button>
        <button> del </button>
    </div>
  </td>
</tr>`;
    })
    .join('');

  return markup;
};

export const fillNotesTable = (notesArr = null) => {
  if (!notesArr) {
    const filteredArr = toFilterNotes(getCurrentFilterValue());
    NotesTable.innerHTML = notesMarkup(filteredArr);
  } else {
    NotesTable.innerHTML = notesMarkup(notesArr);
  }
};

fillNotesTable();

const addNewNote = () => {
  const newNote = [
    {
      id: uniqid(),
      name: 'Add name',
      createdAt: getCurrentDateTime(),
      content: 'Add content',
      category: 'Task',
      status: `${getCurrentFilterValue()}`,
    },
  ];

  const newNoteMarkup = notesMarkup(newNote);

  try {
    addData('notes', newNote);
  } catch (error) {
    console.log(error);
  }

  NotesTable.insertAdjacentHTML('beforeend', newNoteMarkup);
};

const onAddNoteClick = () => {
  addNewNote();
};

AddNoteButton.addEventListener('click', onAddNoteClick);
