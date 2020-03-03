import connection from '../db/index';

const mongodb = require('mongodb');

export const DB_NAME = 'municipality';
// const migration = client().collection('migration');

export const getDeath = (searchQuery = null, skip = 0) => (dispatch) => {
  let search;
  if (!searchQuery) {
    search = {};
  } else {
    search = {
      personName: {
        $regex: `.*${searchQuery},*`
      }
    };
  }

  connection((err, client) => {
    // const finalList = [];
    const db = client.db(DB_NAME);
    db.collection('death').createIndex({ personName: 'text' });
    // const totalCursor =
    db.collection('death').find(search, (erro, resp) => {
      console.log('The Response object');
      resp.count().then((count) => {
        dispatch({
          type: 'SET_DEATH_LIST_PAGES',
          payload: count
        });
        return 0;
      })
        .catch();
    });

    db.collection('death').find(search).skip(skip).limit(25)
      .toArray((error, result) => {
        if (!error) {
          dispatch({
            type: 'SET_DEATH_LIST',
            payload: result
          });
          dispatch({
            type: 'DEATH_LIST_LOADED'
          });
        }
      });
  });
};

export const addDeath = (formData, history) => {
  connection((err, obj) => {
    const db = obj.db(DB_NAME);
    db.collection('death').insert(formData, (error, resp) => {
      if (!err) {
        console.log('Response from DB, Insert Document ');
        console.log(resp);
        history.replace('/death/list');
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
      .collection('death')
      .deleteOne({ _id: new mongodb.ObjectID(objectId) }, (error, res) => {
        console.log(res);
        console.log(error);
        if (!error) {
          dispatch(getDeath());
        }
      });
  });
};


export const chooseEntry = (entry) => (dispatch) => {
  dispatch({
    type: 'SET_DEATH_ENTRY',
    payload: entry
  });
};

export const entryCancelled = () => (dispatch) => {
  dispatch({
    type: 'DEATH_ENTRY_CANCELLED'
  });
};
