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

export const DB = firebase.firestore(); //변수 DB에 파이어베이스의 파이어스토어를 불러온다.

export const getCurrentUser = () => {
    const { email } = Auth.currentUser;
    return { email };
};

export const createprof = async ({ title, snum, uid}) => {
    const newListRef = DB.collection('professor').doc(uid).collection(title).doc();//파이어스토어에 필드생성
    const subject = title;
    const id = newListRef.id
    const attd = null
    const newList = {   //요소들을 넣고 마지막에 정렬하기 위해 생성 일시 저장
        id,
        subject,
        snum,
        attd,
        createdAt: Date.now(),
    };
    await newListRef.set(newList);
    return subject;
};

/*export const createstdn = async ({ title, snum, uid}) => {
    const newListRef = DB.collection('student').doc(uid).collection(title).doc();//파이어스토어에 필드생성
    const subject = title;
    const id = newListRef.id
    const attd = null
    const newList = {   //요소들을 넣고 마지막에 정렬하기 위해 생성 일시 저장
        id,
        subject,
        snum,
        attd,
        createdAt: Date.now(),
    };
    await newListRef.set(newList);
    return subject;
};*/
export const createstdn = async ({ title, snum}) => { 
    const newListRef = DB.collection('student').doc(snum).collection(snum).doc(title);//파이어스토어에 필드생성
    const id = newListRef.id; //생성된 문서의 id 사용
    const newList = {   //요소들을 넣고 마지막에 정렬하기 위해 생성 일시 저장
        id,
        title,
        snum,
        createdAt: Date.now(),
    };
    await newListRef.set(newList);
    return id;
};