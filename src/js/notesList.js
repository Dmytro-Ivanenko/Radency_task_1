import { toFilterNotes } from './filter';

const NotesTable = document.querySelector('#notesTableBody');
const currentFilterValue = document.querySelector(
  'input[name="notesFilter"]:checked'
).value;

export const notesMarkup = notesArr => {
  const markup = notesArr
    .map(({ id, name, content, createdAt, category, status }) => {
      return `<tr>
  <td>${name}</td>
  <td>${createdAt}</td>
  <td>${category}</td>
  <td>${content}</td>
  <td>${id}</td>
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
    const filteredArr = toFilterNotes(currentFilterValue);
    NotesTable.innerHTML = notesMarkup(filteredArr);
  } else {
    NotesTable.innerHTML = notesMarkup(notesArr);
  }
};

fillNotesTable();
