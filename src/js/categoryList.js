import { getData } from './storageAPI';

const CategoryTable = document.querySelector('#TableBody');

const categoryMarkup = () => {
  const notesArr = getData('notes');
  console.dir(notesArr);
  const markup = notesArr
    .map(
      ({ id, name, content, createdAt, category }) =>
        `<tr>
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
</tr>`
    )
    .join('');

  NotesTable.innerHTML = markup;
};

categoryMarkup();
