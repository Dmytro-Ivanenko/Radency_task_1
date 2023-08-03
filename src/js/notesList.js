import uniqid from 'uniqid';

import {
  addData,
  updateData,
  archiveData,
  archiveAllData,
  deleteData,
  deleteAllData,
} from '../services/storageAPI';
import { toFilterNotes, getCurrentFilterValue } from './filter';
import { fillCategoryTable } from './categoryList';
import {
  getCurrentDateTime,
  extractDatesFromText,
} from '../services/workWithDate';

const NotesTable = document.querySelector('#notesTable');
const NotesTableBody = document.querySelector('#notesTableBody');
const AddNoteButton = document.querySelector('#addNote');

//    __ FUNCTIONS __
export const notesMarkup = (notesArr, editable = false) => {
  const filterValue = getCurrentFilterValue();

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
        <button class="notes_archiveButton  ${
          filterValue === 'archived' ? 'toActiveBtn' : ''
        }"> arch </button>
        <button class="notes_deleteButton"> del </button>
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
    NotesTableBody.innerHTML = notesMarkup(filteredArr);
  } else {
    NotesTableBody.innerHTML = notesMarkup(notesArr);
  }
};

// Working with notes
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

  NotesTableBody.insertAdjacentHTML('beforeend', newNoteMarkup);
};

const saveChanges = (parent, name, content, category) => {
  const dataObj = {
    id: parent.id,
    name: name.value,
    content: content.value,
    category: category.value,
  };

  updateData('notes', dataObj);
  fillCategoryTable();
};

const onAddNoteClick = () => {
  addNewNote();
  fillCategoryTable();
};

const onEditNoteClick = button => {
  const row = button.closest('tr');

  const nameInput = row.querySelector('input[name="name"]');
  const contentInput = row.querySelector('input[name="content"]');
  const categorySelect = row.querySelector('select[name="category"]');

  if (button.classList.value.includes('editable')) {
    saveChanges(row, nameInput, contentInput, categorySelect);

    nameInput.setAttribute('readonly', 'readonly');
    contentInput.setAttribute('readonly', 'readonly');
    categorySelect.setAttribute('disabled', 'disabled');
  } else {
    nameInput.removeAttribute('readonly');
    contentInput.removeAttribute('readonly');
    categorySelect.removeAttribute('disabled');
  }

  button.classList.toggle('editable');
};

const onArchiveNoteClick = button => {
  const row = button.closest('tr');

  archiveData('notes', row.id);
  row.remove();
  fillCategoryTable();
};

const onDeleteNoteClick = button => {
  const row = button.closest('tr');

  deleteData('notes', row.id);
  row.remove();
  fillCategoryTable();
};

const onArchiveAllNoteClick = () => {
  archiveAllData('notes', getCurrentFilterValue());
  NotesTableBody.innerHTML = '';
  fillCategoryTable();
};

const onDeleteAllNoteClick = () => {
  deleteAllData('notes', getCurrentFilterValue());
  NotesTableBody.innerHTML = '';
  fillCategoryTable();
};

fillNotesTable();

AddNoteButton.addEventListener('click', onAddNoteClick);
NotesTable.addEventListener('click', event => {
  if (event.target.classList.contains('notes_editButton')) {
    onEditNoteClick(event.target);
  } else if (event.target.classList.contains('notes_archiveButton')) {
    onArchiveNoteClick(event.target);
  } else if (event.target.classList.contains('notes_deleteButton')) {
    onDeleteNoteClick(event.target);
  } else if (event.target.classList.contains('notes_archiveAllButton')) {
    onArchiveAllNoteClick(event.target);
  } else if (event.target.classList.contains('notes_deleteAllButton')) {
    onDeleteAllNoteClick(event.target);
  }
});
