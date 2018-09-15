import { FETCH_ALL_FIREBASE_DATA, FETCH_NEWS_SUCCESSFULLY } from './types';
import firebase from 'firebase';
import _ from 'lodash';

export const fetchAllFirebaseData = () => async dispatch => {
  await firebase
    .database()
    .ref('/')
    .on('value', snap => {
      let allFirebaseData = [];
      snap.forEach(element => {
        allFirebaseData = [...allFirebaseData, element.val()];
      });

      allFirebaseData = _.mapKeys(allFirebaseData, 'key');

      dispatch({ type: FETCH_ALL_FIREBASE_DATA, payload: allFirebaseData });
    });
};

export const saveNewsToFirebase = news => async dispatch => {
  // console.log('news is here', news);

  await firebase
    .database()
    .ref('/news')
    .update({ news })
    .then(() => alert('news successfully updated'))
    .catch(e => alert(e));
  dispatch({ type: FETCH_NEWS_SUCCESSFULLY, payload: news });
};
