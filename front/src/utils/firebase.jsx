import * as firebase from 'firebase';
import config from '../../firebase.json';
import 'firebase/firestore';

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};
export const signup = async ({ email, password, name }) => {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    return user;
};
export const logout = async () => {
    return await Auth.signOut();
};

export const DB = firebase.firestore();

export const createList = async ({ title, snum }) => {
    const newListRef = DB.collection('channels').doc();
    const id = newListRef.id;
    const newList = {
        id,
        title,
        snum,
        createdAt: Date.now(),
    };
    await newListRef.set(newList);
    return id;
};