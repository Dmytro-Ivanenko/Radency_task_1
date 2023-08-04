import { getData } from '../services/storageAPI';

const CategoryTable = document.querySelector('#categoryTableBody');

// Generate the markup for a single row in the category table
const categoryMarkup = notesArr => {
  const markup = notesArr
    .map(
      ({ category, active, archived }) =>
        `<tr>
          <td class="notes_category_icon ${category}"></td>      
          <td>${category}</td>
          <td>${active}</td>
          <td>${archived}</td>
        </tr>`
    )
    .join('');

  return markup;
};

// Count the number of active and archived notes for each category
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

// Populate the category table with data
export const fillCategoryTable = () => {
  const notes = getData('notes');
  const categoryArr = countNotesByCategory(notes);
  CategoryTable.innerHTML = categoryMarkup(categoryArr);
};

// Call the fillCategoryTable function to populate the table with data
fillCategoryTable();
