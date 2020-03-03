
import connection from '../db/index';

const mongodb = require('mongodb');


export const DB_NAME = 'municipality';
// const migration = client().collection('migration');

export const getBirth = (searchQuery = null, skip = 0) => (dispatch) => {
  let search;
  if (!searchQuery) {
    search = {};
  } else {
    search = {
      personName: {
        $regex: `.*${searchQuery}.*`
      }
    };
  }

  connection((err, client) => {
    // const finalList = [];
    const db = client.db(DB_NAME);
    db.collection('birth').createIndex({ personName: 'text' });
    // const totalCursor =
    db.collection('birth').find(search, (erro, resp) => {
      console.log('The Response object');
      resp.count().then((count) => {
        dispatch({
          type: 'SET_BIRTH_LIST_PAGES',
          payload: count
        });
        return 0;
      })
        .catch();
    });

    db.collection('birth').find(search).skip(skip).limit(25)
      .toArray((error, result) => {
        if (!error) {
          dispatch({
            type: 'SET_BIRTH_LIST',
            payload: result
          });
          dispatch({
            type: 'BIRTH_LIST_LOADED'
          });
        }
      });
  });
};

export const addBirth = (formData, history) => {
  connection((err, obj) => {
    const db = obj.db(DB_NAME);
    db.collection('birth').insert(formData, (error, resp) => {
      if (!err) {
        console.log('Response from DB, Insert Document ');
        console.log(resp);
        history.replace('/birth/list');
      } else {
        console.log('Response from DB, Insert Document Error ');
        console.log(err);
      }
    });
  });
};

// export const updateMigration = (formData, id, history) => {
//   migration.deleteOne({ id }, (err, obj) => {
//     if (err) {

//     } else {
//       history.goBack();
//     }
//   });
// };

export const deleteRecord = (objectId) => (dispatch) => {
  connection((err, client) => {
    client.db('municipality')
      .collection('birth')
      .deleteOne({ _id: new mongodb.ObjectID(objectId) }, (error, res) => {
        console.log(res);
        console.log(error);
        if (!error) {
          dispatch(getBirth());
        }
      });
  });
};

export const chooseEntry = (entry) => (dispatch) => {
  dispatch({
    type: 'SET_BIRTH_ENTRY',
    payload: entry
  });
};

export const entryCancelled = () => (dispatch) => {
  dispatch({
    type: 'BIRTH_ENTRY_CANCELLED'
  });
};
