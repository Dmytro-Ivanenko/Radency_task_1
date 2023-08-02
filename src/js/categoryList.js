import { getData } from './storageAPI';
const CategoryTable = document.querySelector('#categoryTableBody');

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

const countNotesByCategory = notes => {
  const categories = {};

  notes.forEach(note => {
    const { category, status } = note;
    if (!categories[category]) {
      categories[category] = { active: 0, archived: 0 };
    }

    if (status === 'archived') {
      categories[category].archived += 1;
    } else {
      categories[category].active += 1;
    }
  });

  return Object.entries(categories).map(([category, counts]) => ({
    category,
    active: counts.active,
    archived: counts.archived,
  }));
};

export const fillCategoryTable = () => {
  const notes = getData('notes');
  const categoryArr = countNotesByCategory(notes);
  CategoryTable.innerHTML = categoryMarkup(categoryArr);
};

fillCategoryTable();
