import { FETCH_ALL_FIREBASE_DATA } from './types';
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
