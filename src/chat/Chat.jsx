import { useState, useRef, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import {
  BsFillEmojiSmileFill,
  BsFillStopFill,
  BsCameraVideoFill,
} from "react-icons/bs";
import { AiFillPauseCircle, AiOutlinePlus } from "react-icons/ai";
import { BiSolidMicrophone } from "react-icons/bi";

const Chat = () => {
  // State variables for managing various aspects of the chat component
  const [showAudio, setShowAudio] = useState(false);
  const [audioRecordings, setAudioRecordings] = useState([]);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [showMicControls, SetShowMicControls] = useState(false);
  const [showVideoControls, SetShowVideoControls] = useState(false);
  const audioElementRef = useRef(null);

  // Audio recording setup using useReactMediaRecorder hook
  const {
    status: audioStatus,
    startRecording: startAudioRecording,
    stopRecording: stopAudioRecording,
    pauseRecording: pauseAudioRecording,
    resumeRecording: resumeAudioRecording,
    mediaStream: audioMediaStream,
  } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      // When audio recording stops, add it to the list with a timestamp and isAudio flag
      setAudioRecordings([
        ...audioRecordings,
        { url: blobUrl, timestamp: Date.now(), isAudio: true, isVideo: false },
      ]);
    },
  });

  useEffect(() => {
    // Set the audio stream for playback
    if (audioElementRef.current && audioMediaStream) {
      audioElementRef.current.srcObject = audioMediaStream;
    }
  }, [audioElementRef, audioMediaStream]);

  // Function to toggle audio recording
  const toggleAudio = () => {
    setShowAudio(!showAudio);
    SetShowMicControls(!showMicControls);
    if (!showAudio) {
      startAudioRecording();
    } else {
      stopAudioRecording();
      // Add the audio recording to the list with the isAudio flag
      setAudioRecordings([
        ...audioRecordings,
        { url: audioStatus, timestamp: Date.now(), isAudio: true },
      ]);
    }
  };

  // Function to toggle audio pause and resume
  const toggleAudioPause = () => {
    if (isAudioPaused) {
      resumeAudioRecording();
    } else {
      pauseAudioRecording();
    }
    setIsAudioPaused(!isAudioPaused);
  };

  // State variables for managing video recording
  const [showVideo, setShowVideo] = useState(false);
  const [videoRecordings, setVideoRecordings] = useState([]);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    // Set up video streaming when showVideo is true and getUserMedia is available
    if (
      showVideo &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera:", error);
        });
    }
  }, [showVideo]);

  // Video recording setup using useReactMediaRecorder hook
  const {
    status: videoStatus,
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    pauseRecording: pauseVideoRecording,
    resumeRecording: resumeVideoRecording,
    mediaStream: videoMediaStream,
  } = useReactMediaRecorder({
    video: true,
    onStop: (blobUrl) => {
      // When video recording stops, add it to the list with a timestamp and isVideo flag
      setVideoRecordings([
        ...videoRecordings,
        { url: blobUrl, timestamp: Date.now(), isAudio: false, isVideo: true },
      ]);
    },
  });

  useEffect(() => {
    // Set the video stream for playback
    if (videoElementRef.current && videoMediaStream) {
      videoElementRef.current.srcObject = videoMediaStream;
    }
  }, [videoElementRef, videoMediaStream]);

  // Function to toggle video recording
  const toggleVideo = () => {
    setShowVideo(!showVideo);
    SetShowVideoControls(!showVideoControls);
    if (!showVideo) {
      startVideoRecording();
    } else {
      stopVideoRecording();
      // Add the video recording to the list with the isVideo flag
      setVideoRecordings([
        ...videoRecordings,
        { url: videoStatus, timestamp: Date.now(), isVideo: true },
      ]);
    }
  };

  // Function to toggle video pause and resume
  const toggleVideoPause = () => {
    if (isVideoPaused) {
      resumeVideoRecording();
    } else {
      pauseVideoRecording();
    }
    setIsVideoPaused(!isVideoPaused);
  };

  // Combine audio and video recordings and sort them by timestamp
  const allRecordings = [...audioRecordings, ...videoRecordings].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    // JSX for rendering the chat component and its controls
    <div className=" bg-[#18242d] flex flex-col relative  sm:h-[589px] overflow-y-auto">
      <div className="w-full flex justify-end items-end flex-col ">
        <div className="me-4"></div>

        {allRecordings
          .slice()
          .reverse()
          .map((recording, index) => (
            <div
              key={`recording-${index}`}
              className="mx-auto sm:me-6 my-5 mb-24 z-50 max-w-md"
            >
              {/* Conditionally render audio or video element based on the recording type */}
              {recording.isAudio ? (
                <audio src={recording.url} controls />
              ) : (
                <video
                  src={recording.url}
                  controls
                  className="w-[20rem] rounded-lg"
                />
              )}
            </div>
          ))}
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-[20rem] me-6 mb-24 rounded-md"
          ></video>
        )}
      </div>
      <div className="bg-[#202c33] h-16 flex items-center justify-end z-50 px-5 fixed bottom-0 w-full md:w-[60%]">
        {showMicControls && (
          <>
            {showAudio && (
              // Button to pause/resume audio recording
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-2xl p-2 rounded-md"
                onClick={toggleAudioPause}
                disabled={!showAudio}
              >
                <AiFillPauseCircle />
              </button>
            )}
            {showAudio && (
              // Button to stop audio recording
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-2xl p-2 ms-4 rounded-md"
                onClick={toggleAudio}
              >
                <BsFillStopFill />
              </button>
            )}
          </>
        )}
        {!showMicControls && (
          <div className=" text-center flex items-center">
            <div className=" flex items-center">
              {showVideo && (
                <>
                  {/* Button to stop video recording */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white me-4 px-4 py-2 rounded-md"
                    onClick={toggleVideo}
                  >
                    Stop Video
                  </button>
                  {/* Button to pause/resume video recording */}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 me-4 text-white px-4 py-2 rounded-md"
                    onClick={toggleVideoPause}
                    disabled={!showVideo}
                  >
                    {isVideoPaused ? "Resume Video" : "Pause Video"}
                  </button>
                </>
              )}
            </div>
            {showVideo || isVideoPaused ? (
              // Display video recording status
              <p className="mb-2  text-red-600 me-4 text-bold text-xl">
                {videoStatus}
              </p>
            ) : null}
          </div>
        )}
        {showAudio || isAudioPaused || showVideoControls ? null : (
          <>
            <div className="w-1/6 flex justify-center">
              {/* Buttons for adding emojis and more */}
              <BsFillEmojiSmileFill className="text-3xl me-3 text-[#aebac1]" />
              <AiOutlinePlus className="text-3xl text-[#aebac1]" />
            </div>
            <div className=" h-12 rounded-xl bg-[#2a3942] w-3/5"></div>
          </>
        )}
        <div className="text-center ">
          {showAudio || isAudioPaused ? (
            // Display audio recording status
            <p className="mb-2 ms-4 text-red-600 text-bold text-xl">
              {audioStatus}
            </p>
          ) : null}
          <div className=" flex items-center">
            {!showVideo && !showAudio && (
              <button
                className={`text-[#aebac1] px-4 py-2 text-3xl rounded-md mr-2 ${
                  showVideo ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={toggleVideo}
                disabled={showVideo}
              >
                {/* Button for toggling video recording */}
                <BsCameraVideoFill className="text-2xl mx-4 text-[#aebac1]" />
              </button>
            )}
            {showAudio || isAudioPaused || showVideoControls ? null : (
              <button
                className={`text-[#aebac1] px-4 py-2 text-3xl rounded-md mr-2 ${
                  showAudio ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={toggleAudio}
                disabled={showAudio}
              >
                {/* Button for toggling audio recording */}
                <BiSolidMicrophone />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
