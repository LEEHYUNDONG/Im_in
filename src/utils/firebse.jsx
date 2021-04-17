import * as firebase from 'firebase';
import config from '../../firebase.json';
import 'firebase/firestore';

const app = firebase.initializeApp(config);