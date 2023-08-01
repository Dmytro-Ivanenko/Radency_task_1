const NotesTable = document.querySelector('#notesTableBody');

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
