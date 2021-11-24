import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Video, Audio } from 'expo-av';
import { getCurrentUser } from '../utils/firebase';

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function FaceRegistration() {
  const [hasVideoPermission, setHasVideoPermission] = useState(null);
  //const [hasAudioPermission, setHasAudioPermission] = useState(null);

  //video
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraSource, setCameraSource] = useState(null);
  const cameraRef = useRef();

  const user = getCurrentUser();

  const [regFaceNum, setRegFaceNum] = useState(1);

  //카메라권한
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasVideoPermission(status === "granted");
    })();
  }, []);

  //오디오권한
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Audio.requestPermissionsAsync();
  //     setHasAudioPermission(status === "granted");
  //   })();
  // }, []);

  if (hasVideoPermission === null) {
    return <View />;
  }
  if (hasVideoPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // if (hasAudioPermission === null) {
  //   return <View />;
  // }
  // if (hasAudioPermission === false) {
  //   return <Text>No access to audio</Text>;
  // }

  //viedo
  //카메라가 사진이나 비디오를 캡쳐할 준비가되었는지 구분
  const CameraReady = () => {
    setCameraReady(true);
  };

  //사진찍기
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.3, base64: false, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        //setPreview(true);

        console.log("picture source :", source);
        setCameraSource(source);
      }
      if (source != null) {
        const name = user.email.split("@")[0] + ".jpg";
        const data = new FormData();
        data.append("title", user.email.split("@")[0]);
        data.append("image", {
          name: name,
          type: "image/jpg",
          uri: source
        });
        console.log(data);

        let res;
        try{
          res=await fetch("http://3.144.173.100:8000/images/", {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        } catch {
          console.log("error");
        }

        //console.log(res);
        let responseJson = await res.json();
        
        console.log(responseJson.status);
      
        if (responseJson.status == 201) {
          setRegFaceNum(regFaceNum + 1);
          console.log("Upload Successful");
          console.log("등록 얼굴 수 : " + regFaceNum);
        }
      } else {
        console.log("Please Select File first");
      }
      await cameraRef.current.resumePreview();
    }
  };

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
  //video style
  container: {
    ...StyleSheet.absoluteFillObject
  },
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
});