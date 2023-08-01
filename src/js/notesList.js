import { toFilterNotes } from './filter';

const NotesTable = document.querySelector('#notesTableBody');
const selectedFilter = document.querySelector(
  'input[name="notesFilter"]:checked'
).value;

export const notesMarkup = () => {
  const notesArr = toFilterNotes(selectedFilter);
  const markup = notesArr
    .map(({ id, name, content, createdAt, category, status }) => {
      return `<tr>
  <td>${name}</td>
  <td>${createdAt}</td>
  <td>${category}</td>
  <td>${content}</td>
  <td>${id}</td>
  <td>
    <div><button> edit </button>
        <button> arch </button>
        <button> del </button>
    </div>
  </td>
</tr>`;
    })
    .join('');

  NotesTable.innerHTML = markup;
};

notesMarkup();
