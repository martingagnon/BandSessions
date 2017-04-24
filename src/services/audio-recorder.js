import {AudioRecorder} from 'react-native-audio';

export const prepareRecording = (audioPath) => {
  AudioRecorder.prepareRecordingAtPath(audioPath, {
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: 'High',
    AudioEncoding: 'aac',
    AudioEncodingBitRate: 32000
  });
};

export const record = async () => {
  await AudioRecorder.startRecording();
};

export const pause = async () => {
  await AudioRecorder.pauseRecording();
};

export const stop = async () => {
  AudioRecorder.stopRecording();
};

export const setOnProgress = (onProgress) => {
  AudioRecorder.onProgress = onProgress;
};
