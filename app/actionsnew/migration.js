import connection from '../db/index';

const mongodb = require('mongodb');

export const DB_NAME = 'municipality';
// const migration = client().collection('migration');

export const getMigrations = (searchQuery = null, skip = 0) => (dispatch) => {
  let search;
  if (!searchQuery) {
    search = {};
  } else {
    search = {
      'individual.migratorName': {
        $regex: `.*${searchQuery}.*`
      }
    };
  }

  connection((err, client) => {
    // const finalList = [];
    const db = client.db(DB_NAME);
    db.collection('migration').createIndex({ name: 'text' });
    // const totalCursor =
    db.collection('migration').find(search, (erro, resp) => {
      console.log('The Response object');
      resp.count().then((count) => {
        dispatch({
          type: 'SET_MIGRATION_LIST_PAGES',
          payload: count
        });
        return 0;
      })
        .catch();
    });

    db.collection('migration').find(search).skip(skip).limit(25)
      .toArray((error, result) => {
        if (!error) {
          dispatch({
            type: 'SET_MIGRATION_LIST',
            payload: result
          });
          dispatch({
            type: 'MIGRATION_LIST_LOADED'
          });
        }
      });
    // db.collection('migration').find

    // totalCursor.count().then((count) => {
    //   let c = 0;
    //   if (count % 25 === 0) {
    //     c = count / 25;
    //   } else {
    //     c = (count / 25) + 1;
    //   }
    //   const cursor = totalCursor.skip(skip);
    //   cursor.each((r, a) => {
    //     if (a) {
    //       finalList.push(a);
    //     }
    //   });
    //   console.log('From Action, the response is: ');
    //   console.log(finalList);


    //   dispatch({
    //     type: 'SET_MIGRATION_LIST',
    //     payload: {
    //       total_pages: c,
    //       currentpage: skip,
    //       data: finalList,

    //     }
    //   });
    //   return dispatch({ type: 'MIGRATION_LIST_LOADED' });
    // }).catch((error) => {
    //   console.log(error);
    // });
  });
};

export const addMigration = (formData, history) => {
  connection((err, obj) => {
    const db = obj.db(DB_NAME);
    db.collection('migration').insert(formData, (error, resp) => {
      if (!err) {
        console.log('Response from DB, Insert Document ');
        console.log(resp);
        history.replace('/migration/list');
      } else {
        console.log('Response from DB, Insert Document Error ');
        console.log(err);
      }
    });
  });
};


export const deleteRecord = (objectId) => (dispatch) => {
  connection((err, client) => {
    client.db('municipality')
      .collection('migration')
      .deleteOne({ _id: new mongodb.ObjectID(objectId) }, (error, res) => {
        console.log(res);
        console.log(error);
        if (!error) {
          dispatch(getMigrations());
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

export const chooseEntry = (entry) => (dispatch) => {
  dispatch({
    type: 'SET_MIGRATION_ENTRY',
    payload: entry
  });
};

export const entryCancelled = () => (dispatch) => {
  dispatch({
    type: 'ENTRY_CANCELLED'
  });
};

