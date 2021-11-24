import {DB,Checkattd} from './firebase';
import { Alert } from 'react-native';

export const Attendance = (attd) => {
    // 현재로 하려면 const date = moment(new Date()).format(); 하고 넣기
    //현재 시간 - 8 = 현재 교시 ~ 09:00 1교시
    //아래는 임시 9월 2일 10시 2분으로 가정
    console.log(attd.check_list[0].id);
    //const now = Date.now()
    const moment = require('moment');
    const days = ['일','월','화','수','목','금','토']
    const date = moment();
    const class_ = days[date.day()]+(date.hour()-8);
    
    let week;
    parseInt(date.format('WW'))> 30 ? week = parseInt(date.format('WW')) - 34 : week = parseInt(today.format('WW'));
    console.log(week)
    DB.collection('student')
        .doc(attd.check_list[0].id).collection(attd.check_list[0].id)
        .get().then(result => {
            result.forEach(doc=>{
                const data = doc.data();
                for(let i = 0; i < data.days.length; i++){
                    if(data.days[i] == class_){
                        attd.check_list[0].check ? _handleAttendanceTrue(data.title,attd.check_list[0].id,week,i+1) : Alert.alert("출석 실패");
                        break;
                    }
                }
            })
        })

    const _handleAttendanceTrue = async (title,snum,week,period) => {//파이어베이스에 class 생성
        
        try {
            console.log(title,snum,week,period)
            const id = await Checkattd({ title, snum, week,period});
            Alert.alert('출석 완료');
        } catch (e) {
            Alert.alert('Error 발생', e.message);
        } finally {
            console.log('출석체크 호출됨')
        }
      };
}