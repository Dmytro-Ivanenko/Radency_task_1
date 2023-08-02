import Notes from '../data/notes.json';

const initData = () => {
  localStorage.setItem('notes', JSON.stringify(Notes.notes));
};

export const getData = key => {
  return JSON.parse(localStorage.getItem(`${key}`));
};

export const addData = (key, dataArr) => {
  const currentArr = getData(key);
  const updatedArr = [...currentArr, ...dataArr];
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

// in develope
export const deleteData = key => {
  return JSON.parse(localStorage.removeItem(`${key}`));
};

initData();
