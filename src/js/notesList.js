import uniqid from 'uniqid';
import { addData, updateData } from '../services/storageAPI';
import { toFilterNotes, getCurrentFilterValue } from './filter';
import { fillCategoryTable } from './categoryList';
import {
  getCurrentDateTime,
  extractDatesFromText,
} from '../services/workWithDate';

const NotesTable = document.querySelector('#notesTableBody');
const AddNoteButton = document.querySelector('#addNote');

export const notesMarkup = (notesArr, editable = false) => {
  const markup = notesArr
    .map(({ id, name, content, createdAt, category }) => {
      const dates = extractDatesFromText(content);
      return `<tr id=${id}>
  <td><input type="text" value="${name}" name="name"  ${
    editable ? '' : 'readonly'
  } /></td>
  <td>${createdAt}</td>
  <td>
    <select name="category" ${editable ? '' : 'disabled'}>
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
  <td><input type="text" value="${content}" name="content" ${
    editable ? '' : 'readonly'
  }/></td>
  <td>${dates}</td>
  <td>
    <div> <button class="notes_editButton ${
      editable ? 'editable' : ''
    }" > edit </button>
        <button> arch </button>
        <button> del </button>
    </div>
  </td>
</tr>`;
    })
    .join('');

  return markup;
};

const fillListeners = () => {
  const editButtons = document.querySelectorAll('.notes_editButton');
  editButtons.forEach(elem => {
    elem.addEventListener('click', onEditNoteClick);
  });
};

export const fillNotesTable = (notesArr = null) => {
  if (!notesArr) {
    const filteredArr = toFilterNotes(getCurrentFilterValue());
    NotesTable.innerHTML = notesMarkup(filteredArr);
  } else {
    NotesTable.innerHTML = notesMarkup(notesArr);
  }

  fillListeners();
};

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

  const newNoteMarkup = notesMarkup(newNote, true);

  try {
    addData('notes', newNote);
  } catch (error) {
    console.log(error);
  }

  NotesTable.insertAdjacentHTML('beforeend', newNoteMarkup);
};
const saveChanges = (parent, name, content, category) => {
  const dataObj = {
    id: parent.id,
    name: name.value,
    content: content.value,
    category: category.value,
  };

  updateData('notes', dataObj);
};

const onAddNoteClick = () => {
  addNewNote();
  fillCategoryTable();
};

function onEditNoteClick({ target }) {
  const parent = target.closest('tr');

  const nameInput = parent.querySelector('input[name="name"]');
  const contentInput = parent.querySelector('input[name="content"]');
  const categorySelect = parent.querySelector('select[name="category"]');

  if (target.classList.value.includes('editable')) {
    saveChanges(parent, nameInput, contentInput, categorySelect);

    nameInput.setAttribute('readonly', 'readonly');
    contentInput.setAttribute('readonly', 'readonly');
    categorySelect.setAttribute('disabled', 'disabled');
  } else {
    nameInput.removeAttribute('readonly');
    contentInput.removeAttribute('readonly');
    categorySelect.removeAttribute('disabled');
  }

  target.classList.toggle('editable');
}

fillNotesTable();

AddNoteButton.addEventListener('click', onAddNoteClick);

// не працює функція збереження, перевірити роботу лістнерів при фільтрації
