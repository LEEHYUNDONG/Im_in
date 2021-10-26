import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Video, Audio } from 'expo-av';
import { getCurrentUser } from '../utils/firebase';

import { DB } from '../utils/firebase';
import {ProgressContext} from '../contexts';
import { Alert } from 'react-native';
import {Checkattd} from '../utils/firebase';
import { UserContext} from '../contexts';

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function FaceCheck() {
  const [hasVideoPermission, setHasVideoPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  
  //video
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraSource, setCameraSource] = useState(null);
  const cameraRef = useRef();

  const user = getCurrentUser();
  const [uid,setUid] = useState(user.email.substring(0,7));

  const { spinner } = useContext(ProgressContext);

  //카메라권한
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasVideoPermission(status === "granted");
    })();
  }, []);

  //오디오권한
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasAudioPermission(status === "granted");
    })();
  }, []);

  if (hasVideoPermission === null) {
    return <View />;
  }
  if (hasVideoPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasAudioPermission === null) {
    return <View />;
  }
  if (hasAudioPermission === false) {
    return <Text>No access to audio</Text>;
  }

  //viedo
  //카메라가 사진이나 비디오를 캡쳐할 준비가되었는지 구분
  const CameraReady = () => {
    setCameraReady(true);
  };

  //사진찍기
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.01, base64: false, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        //setPreview(true);

        console.log("picture source :", source);
        setCameraSource(source);
      }
      if (source != null) {
        // If file selected then create FormData
        //const fileToUpload=singleFile.uri;
        //setSingleFile(source);
        //console.log("hhhh", singleFile);
        const name = user.email.split("@")[0] + ".jpg";
        const data = new FormData();
        data.append("title", user.email.split("@")[0]);
        //data.append("title", "student iddddd");
        data.append("image", {
          name: name,
          type: "image/jpg",
          uri: source
        });
        console.log(data);

        var start = new Date();
        // Please change file upload URL
        let res=await fetch("http://18.219.85.27:8000/images/", {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        //console.log(res);
        let responseJson = await res.json();

        console.log(responseJson);
        if (responseJson.status == 1) {
          console.log("Upload Successful");
        }

        var end = new Date();
        var gap = end.getTime() - start.getTime();
        console.log(responseJson.check_list[0].check);
        console.log(gap/1000);
        //출결 함수 호출
        //console.log(typeof(responseJson.check_list[0].check));
        // if (responseJson.check_list[0].check == true){
        //   attendence();
        // }
        //responseJson.check_list[0].check ? () => attendence() : null;

      } else {
        // If no file selected the show alert
        console.log("Please Select File first");
      }
      await cameraRef.current.resumePreview();
    }
  };
  //파이어베이스 풀결 갱신
  const attendence = (attd) => {
        // 현재로 하려면 const date = moment(new Date()).format(); 하고 넣기
        //현재 시간 - 8 = 현재 교시 ~ 09:00 1교시
        //아래는 임시 9월 2일 10시 2분으로 가정
        console.log("ll");
        //const now = Date.now()
        const moment = require('moment');
        const days = ['일','월','화','수','목','금','토']
        const date = moment('2021-09-01 09:02:00','YYYYMMDD HH:mm:ss');
        const class_ = days[date.day()]+(date.hour()-8);
        
        let week;
        parseInt(date.format('WW'))> 30 ? week = parseInt(date.format('WW')) - 34 : week = parseInt(today.format('WW'));
        console.log(week)
        DB.collection('student')
            .doc(uid).collection(uid)
            .get().then(result => {
                result.forEach(doc=>{
                    const data = doc.data();
                    for(let i = 0; i < data.days.length; i++){
                        if(data.days[i] == class_){
                            _handleAttendenceTrue(data.title,uid,week,i+1);
                            break;
                        }
                    }
                })
            })

        const _handleAttendenceTrue = async (title,snum,week,period) => {//파이어베이스에 class 생성
            
            try {
                spinner.start();
                const id = await Checkattd({ title, snum, week,period});
            } catch (e) {
                Alert.alert('Error', e.message);
            } finally {
                spinner.stop();
            }
          };
  }


  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.cameracontainer}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={CameraReady}
        onMountError={error => {
          console.log("cammera error", error);
        }}
      />
      <TouchableOpacity style={styles.capture} onPress={takePicture} />
    </SafeAreaView>
  );
}

//style
const styles = StyleSheet.create({
  //카메라 컨테이너
  cameracontainer: {
    flex: 1.0
  },
  //단순 텍스트
  text: {
    fontSize: 15,
    color: "black"
  },
  // face: {
  //   justifyContent: 'center',
  //   backgroundColor: 'transparent',
  //   position: 'absolute',
  //   borderColor: '#808000',
  //   padding: 10,
  //   borderWidth: 1,
  //   borderRadius: 1,
  // },
  //얼굴인식유무 텍스트
  faceText: {
    color: "#11CC11",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent"
  },
  //video style
  container: {
    ...StyleSheet.absoluteFillObject
  },
  //미리보기 취소
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c5c5c5",
    position: "absolute",
    height: Math.floor(WINDOW_HEIGHT * 0.03),
    width: Math.floor(WINDOW_HEIGHT * 0.03),
    borderRadius: Math.floor(Math.floor(WINDOW_HEIGHT * 0.03) / 2),
    top: 35,
    left: 15,
    opacity: 0.7,
    zIndex: 2
  },
  media: {
    ...StyleSheet.absoluteFillObject
  },
  //미리보기 x모양
  closeX: {
    width: "70%",
    height: 1,
    backgroundColor: "white"
  },
  //조작버튼
  // control: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "absolute",
  //   flexDirection: "row",
  //   bottom: 40,
  //   width: "100%",
  // },
  //촬영버튼
  capture: {
    backgroundColor: "#cfcfcf",
    borderRadius: 2,
    height: Math.floor(WINDOW_HEIGHT * 0.1),
    width: Math.floor(WINDOW_HEIGHT * 0.1),
    borderRadius: Math.floor(Math.floor(WINDOW_HEIGHT * 0.1) / 2),
    marginHorizontal: 150,
    marginBottom: 5
  },
  //녹화중표시 컨테이너
  recordingContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "transparent",
    top: 25,
    opacity: 0.7
  },
  //녹화중표시 문구
  recordingPhrase: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center"
  },
  //녹화중표시 원
  recordCircle: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5
  }
});