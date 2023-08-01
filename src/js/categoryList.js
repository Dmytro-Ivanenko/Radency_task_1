const CategoryTable = document.querySelector('#TableBody');

const categoryMarkup = notesArr => {
  const markup = notesArr
    .map(
      ({ category, active, archived }) =>
        `<tr>
  <td>${category}</td>
  <td>${active}</td>
  <td>${archived}</td>

</tr>`
    )
    .join('');

  return markup;
};

const fillCategoryTable = () => {
  CategoryTable.innerHTML = categoryMarkup();
};

fillCategoryTable();

// Треба створити функцію-каунтер, що зробить масив рядків.
