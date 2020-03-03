import connection from '../db/index';

const mongodb = require('mongodb');

export const DB_NAME = 'municipality';
// const migration = client().collection('migration');

export const getDivorce = (searchQuery = null, skip = 0) => (dispatch) => {
  let search;
  if (!searchQuery) {
    search = {};
  } else {
    search = {
      groomName: {
        $regex: `.*${searchQuery}.*`
      }
    };
  }

  connection((err, client) => {
    // const finalList = [];
    const db = client.db(DB_NAME);
    db.collection('divorce').createIndex({ personName: 'text' });
    // const totalCursor =
    db.collection('divorce').find(search, (erro, resp) => {
      console.log('The Response object');
      resp.count().then((count) => {
        dispatch({
          type: 'SET_DIVORCE_LIST_PAGES',
          payload: count
        });
        return 0;
      })
        .catch();
    });

    db.collection('divorce').find(search).skip(skip).limit(25)
      .toArray((error, result) => {
        if (!error) {
          dispatch({
            type: 'SET_DIVORCE_LIST',
            payload: result
          });
          dispatch({
            type: 'DIVORCE_LIST_LOADED'
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


export const deleteRecord = (objectId) => (dispatch) => {
  connection((err, client) => {
    client.db('municipality')
      .collection('divorce')
      .deleteOne({ _id: new mongodb.ObjectID(objectId) }, (error, res) => {
        console.log(res);
        console.log(error);
        if (!error) {
          dispatch(getDivorce());
        }
      });
  });
};

export const addDivorce = (formData, history) => {
  connection((err, obj) => {
    const db = obj.db(DB_NAME);
    db.collection('divorce').insert(formData, (error, resp) => {
      if (!err) {
        console.log('Response from DB, Insert Document ');
        console.log(resp);
        history.replace('/divorce/list');
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
export const chooseEntry = (entry) => (dispatch) => {
  dispatch({
    type: 'SET_DIVORCE_ENTRY',
    payload: entry
  });
};

export const entryCancelled = () => (dispatch) => {
  dispatch({
    type: 'DIVORCE_ENTRY_CANCELLED'
  });
};
