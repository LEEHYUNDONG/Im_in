import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Video, Audio } from 'expo-av';
import * as FaceDetector from 'expo-face-detector';

const WINDOW_HEIGHT = Dimensions.get("window").height;

const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function FaceRegistration() {
  const [hasVideoPermission, setHasVideoPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  //facedetector
  const [faces, setFaces] = useState([]);
  const [len, setLen] = useState(0);
  const [b, setB] = useState(null);
  const [f, setF] = useState(null);
  const [r, setR] = useState(null);
  const [y, setY] = useState(null);
  //video
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const cameraRef = useRef();
  const [detectFace, setDetectFace] = useState(true);

  const faceDetected = ({ faces }) => {
    if(faces.length > 0){
      if(detectFace){
        setDetectFace(false);
      }
      setFaces({faces});
      setLen(faces.length);
      setB(faces[0].bounds);
      setF(faces[0].faceID);
      setR(faces[0].rollAngle);
      setY(faces[0].yawAngle);
      console.log({faces});
    }else{
      setFaces({faces});
      setLen(faces.length);
      console.log({faces});
    }
  };

  //첫얼굴 인식시 자동동영상촬영시작
  useEffect(() => {
    if(!detectFace){
      videotimer();
    }
  }, [detectFace]);

  //카메라권한
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();     
      setHasVideoPermission(status === 'granted');
    })();
  }, []);

  //오디오권한
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasAudioPermission(status === 'granted');
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
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  //사진찍기
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
      }
    }
  };
  //비디오녹화
  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  //비디오녹화중지
  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };
  //카메라 변경
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  //사진 또는 비디오 미리보기 취소
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };
  //미리보기 취소버튼
  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );
  //녹화된비디오재생
  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      shouldPlay={true}
      style={styles.media}
    />
  );
  //녹화중표시
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );
  //카메라 전후면전환버튼, 촬영버튼
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{"Flip"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onLongPress={recordVideo}
        onPressOut={stopVideoRecording}
        //onPress={takePicture}
        onPress={videotimer}
        style={styles.capture}
      />
    </View>
  );

  //자동 녹화시작,중지
  const videotimer = async () => {
    setTimeout(() => {
      recordVideo();
    }, 500);
    setTimeout(() => {
      stopVideoRecording();
    }, 6000);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.cameracontainer}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
        onFacesDetected={faceDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 500,
          tracking: true,
        }}
      />
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderCancelPreviewButton()}
        {!videoSource && !isPreview && renderCaptureControl()}
      </View>
      {len > 0
        ?
        <View
          key={f}
          transform={[
            { perspective: 600 },
            { rotateZ: `${r.toFixed(0)}deg` },
            { rotateY: `${y.toFixed(0)}deg` },
          ]}
          style={[
            styles.face,
            {
              ...b.size,
              left: b.origin.x,
              top: b.origin.y,
            },
          ]}>
          <Text style={styles.faceText}>rollAngle: {r.toFixed(0)}</Text>
          <Text style={styles.faceText}>yawAngle: {y.toFixed(0)}</Text>
        </View>    
        :
        <View style={styles.container}>
          <Text style={styles.faceText}>얼굴이 인식되지 않았습니다.</Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameracontainer: {
    flex: 0.7,
  },
  camera: {
    flex: 0.7,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  face: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 1,
    position: 'absolute',
    borderColor: '#808000',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  faceText: {
    color: '#32CD32',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  //video style
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#000000",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
});