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

export const updateData = (key, dataObj) => {
  const { id, name, content, category } = dataObj;
  const currentArr = getData(key);
  const updatedArr = currentArr.map(note => {
    if (note.id == id) {
      return { ...note, name, content, category };
    }
    return note;
  });
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

export const archiveData = (key, id) => {
  const currentArr = getData(key);
  const updatedArr = currentArr.map(note => {
    if (note.id == id) {
      const newStatus = note.status === 'active' ? 'archived' : 'active';
      return { ...note, status: newStatus };
    }
    return note;
  });
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

export const archiveAllData = (key, status) => {
  const currentArr = getData(key);
  const updatedArr = currentArr.map(note => {
    if (note.status === status) {
      const newStatus = note.status === 'active' ? 'archived' : 'active';
      return { ...note, status: newStatus };
    }
    return note;
  });
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

export const deleteData = (key, id) => {
  const currentArr = getData(key);
  const updatedArr = currentArr.filter(note => {
    if (note.id != id) {
      return true;
    }
    return false;
  });
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

export const deleteAllData = (key, status) => {
  const currentArr = getData(key);
  const updatedArr = currentArr.filter(note => {
    if (note.status === status) {
      return false;
    }
    return true;
  });
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

initData();
