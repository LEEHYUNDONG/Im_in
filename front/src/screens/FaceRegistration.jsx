import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Video, Audio } from 'expo-av';
import { getCurrentUser } from '../utils/firebase';

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function FaceRecognition() {
  const [hasVideoPermission, setHasVideoPermission] = useState(null);
  //const [hasAudioPermission, setHasAudioPermission] = useState(null);

  //video
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraSource, setCameraSource] = useState(null);
  const cameraRef = useRef();

  const user = getCurrentUser();

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
      const options = { quality: 0.5, base64: false, skipProcessing: true };
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
        data.append("title", "B811226");
        data.append("title", "student iddddd");
        data.append("image", {
          name: name,
          type: "image/jpg",
          uri: source
        });
        console.log(data);
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
      } else {
        // If no file selected the show alert
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
  //얼굴인식유무 텍스트 -> 출석체크 확인 텍스트?
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
  media: {
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