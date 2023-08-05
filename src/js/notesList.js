// Import necessary modules and functions
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

// Find elements on the page
const NotesTable = document.querySelector('#notesTable');
const NotesTableBody = document.querySelector('#notesTableBody');
const AddNoteButton = document.querySelector('#addNote');

//    __ FUNCTIONS __
// Function to generate HTML markup for displaying notes in the table
export const notesMarkup = (notesArr, editable = false) => {
  const filterValue = getCurrentFilterValue();

  const markup = notesArr
    .map(({ id, name, content, createdAt, category }) => {
      const dates = extractDatesFromText(content);
      return `<tr class="${editable ? 'editable' : ''}" id=${id}>
  <td class="notes_category_icon ${category}"></td><td ><input  type="text" value="${name}" name="name"  ${
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
    }" ></button>
        <button class="notes_archiveButton  ${
          filterValue === 'archived' ? 'toActiveBtn' : ''
        }"></button>
        <button class="notes_deleteButton"></button>
    </div>
  </td>
</tr>`;
    })
    .join('');

  return markup;
};

// Fill the table with notes
export const fillNotesTable = (notesArr = null) => {
  if (!notesArr) {
    const filteredArr = toFilterNotes(getCurrentFilterValue());
    NotesTableBody.innerHTML = notesMarkup(filteredArr);
  } else {
    NotesTableBody.innerHTML = notesMarkup(notesArr);
  }
};

// Add a new note
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

// Save changes in a note
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

// Click handler for "Add Note" button
const onAddNoteClick = () => {
  addNewNote();
  fillCategoryTable();
};

// Click handler for "Edit" button in a note
const onEditNoteClick = button => {
  const row = button.closest('tr');

  const nameInput = row.querySelector('input[name="name"]');
  const contentInput = row.querySelector('input[name="content"]');
  const categorySelect = row.querySelector('select[name="category"]');

  if (button.classList.value.includes('editable')) {
    saveChanges(row, nameInput, contentInput, categorySelect);
    fillNotesTable();
  } else {
    nameInput.removeAttribute('readonly');
    contentInput.removeAttribute('readonly');
    categorySelect.removeAttribute('disabled');
  }

  button.classList.toggle('editable');
  row.classList.toggle('editable');
};

// Click handler for "Archive" button in a note
const onArchiveNoteClick = button => {
  const row = button.closest('tr');

  archiveData('notes', row.id);
  row.remove();
  fillCategoryTable();
};

// Click handler for "Delete" button in a note
const onDeleteNoteClick = button => {
  const row = button.closest('tr');

  deleteData('notes', row.id);
  row.remove();
  fillCategoryTable();
};

// Click handler for "Archive All" button on the page
const onArchiveAllNoteClick = () => {
  archiveAllData('notes', getCurrentFilterValue());
  NotesTableBody.innerHTML = '';
  fillCategoryTable();
};

// Click handler for "Delete All" button on the page
const onDeleteAllNoteClick = () => {
  deleteAllData('notes', getCurrentFilterValue());
  NotesTableBody.innerHTML = '';
  fillCategoryTable();
};

// Fill the table with notes when the page loads
fillNotesTable();

// Add event listeners for various buttons on the page
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
