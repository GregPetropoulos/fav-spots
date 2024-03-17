import * as SQLite from 'expo-sqlite';
// MAKING A CUSTOM DB FOR THE DEVICE

const database = SQLite.openDatabase('places.db');

// Sets up the initial base structure a (table) with a query, and only executes once
export const init = () => {
  // Set up a promise to resolve if db exists or does not but is built out,
  // and will reject if there is typo in command or some other failure
  const promise = new Promise((resolve, reject) => {
    // db query
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    /* db query
    insert int the places db into the columns title, imageUri etc, The values have question marks for place holders and the array after has the right order of the actual values passed into the insertPlace function based off the class Place model
    */

    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise
};
