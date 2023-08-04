import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notes from '../data/notes.json';

// Initialize the data in localStorage with the initial data from Notes.json
const initData = () => {
  try {
    localStorage.setItem('notes', JSON.stringify(Notes.notes));
  } catch (error) {
    console.error('Error initializing data in localStorage:', error);
  }
};

// Get data from localStorage based on the provided key
export const getData = key => {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    Notify.failure('Error getting data from server..');
    return [];
  }
};

// Add new data to the existing data in localStorage
export const addData = (key, dataArr) => {
  try {
    const currentArr = getData(key);
    const updatedArr = [...currentArr, ...dataArr];
    localStorage.setItem(key, JSON.stringify(updatedArr));

    Notify.success('Element added to database');
  } catch (error) {
    Notify.failure('An error occurred, the item were not added..');
  }
};

// Update existing data in localStorage based on the provided data object
export const updateData = (key, dataObj) => {
  try {
    const { id, name, content, category } = dataObj;
    const currentArr = getData(key);
    const updatedArr = currentArr.map(note => {
      if (note.id == id) {
        return { ...note, name, content, category };
      }
      return note;
    });
    localStorage.setItem(key, JSON.stringify(updatedArr));
    Notify.success('Element updated');
  } catch (error) {
    Notify.failure('An error occurred, the item were not added..');
  }
};

// Archive a specific data item in localStorage
export const archiveData = (key, id) => {
  try {
    const currentArr = getData(key);
    const updatedArr = currentArr.map(note => {
      if (note.id == id) {
        const newStatus = note.status === 'active' ? 'archived' : 'active';
        return { ...note, status: newStatus };
      }
      return note;
    });
    localStorage.setItem(key, JSON.stringify(updatedArr));
    Notify.success('Success');
  } catch (error) {
    Notify.failure('An error occurred, the item were not archived..');
  }
};

// Archive all data items with a specific status in localStorage
export const archiveAllData = (key, status) => {
  try {
    const currentArr = getData(key);
    const updatedArr = currentArr.map(note => {
      if (note.status === status) {
        const newStatus = note.status === 'active' ? 'archived' : 'active';
        return { ...note, status: newStatus };
      }
      return note;
    });
    localStorage.setItem(key, JSON.stringify(updatedArr));
    Notify.success('Success');
  } catch (error) {
    Notify.failure('An error occurred..');
  }
};

// Delete a specific data item from localStorage
export const deleteData = (key, id) => {
  try {
    const currentArr = getData(key);
    const updatedArr = currentArr.filter(note => note.id != id);
    localStorage.setItem(key, JSON.stringify(updatedArr));
    Notify.success('Element deleted');
  } catch (error) {
    Notify.failure('An error occurred, the item were not deleted..');
  }
};

// Delete all data items with a specific status from localStorage
export const deleteAllData = (key, status) => {
  try {
    const currentArr = getData(key);
    const updatedArr = currentArr.filter(note => note.status !== status);
    localStorage.setItem(key, JSON.stringify(updatedArr));
    Notify.success('Elements deleted');
  } catch (error) {
    Notify.failure('An error occurred, items were not deleted..');
  }
};

// Initialize data when the module is imported
initData();
