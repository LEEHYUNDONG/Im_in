import * as firebase from 'firebase';
import config from '../../firebase.json';
import 'firebase/firestore';

const app = firebase.initializeApp(config); //앱과 파이어베이스 연동

const Auth = app.auth(); //파이어베이스 인증 연동

export const login = async ({ email, password }) => { //파이어베이스 메소드 email과 password 인증 *추후에 학번으로 바꿀 계획
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};
export const signup = async ({ email, password, name }) => { //학번, 비밀번호, 이름으로 회원가입, 파이어베이스에 계정 등록
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    return user;
};
export const logout = async () => { //로그아웃 메소드
    return await Auth.signOut();
};

export const DB = firebase.firestore(); //파이어베이스 파이어스토어(DB) 연동

export const createList = async ({ title, snum }) => { 
    const newListRef = DB.collection('channels').doc();//파이어스토어의 channels 컬렉션 연결
    const id = newListRef.id; //channels 컬렉션 아이디
    const newList = {   //다시다시다시
        id,
        title,
        snum,
        createdAt: Date.now(),
    };
    await newListRef.set(newList);
    return id;
};