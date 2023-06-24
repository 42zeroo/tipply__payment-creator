import classNames from 'classnames';
import { useField } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import playIcon from 'src/assets/icons/play.svg';
import recordIcon from 'src/assets/icons/record.svg';
import stopIcon from 'src/assets/icons/stop.svg';

interface RecorderProps {
  name: string;
  disabled?: boolean;
}

const MAX_RECORDING_TIME = 20000;

const blobToBase64String = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(',')[1] || '';
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const Recorder = ({ disabled, name }: RecorderProps) => {
  const [recording, setRecording] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [error, setError] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [elapsedRecordTime, setElapsedRecordTime] = useState(0);
  const [, , { setValue }] = useField(name);

  const nodeRef = useRef(null);
  const stopRecordButtonRef = useRef(null);
  const playRecordButtonRef = useRef(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const dataArrayRef = useRef<Blob[]>([]);
  const startRef = useRef<number>(0);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const stopRecording = useCallback(() => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setRecording(false);
      const duration = Math.min(
        Date.now() - (startRef.current || 0),
        MAX_RECORDING_TIME
      );
      setRecordTime(duration);
      setElapsedRecordTime(0);
    }
  }, []);

  const playPauseRecordedAudio = useCallback(async () => {
    setError(false);

    if (!isFinite(elapsedTime) || elapsedTime <= 0) {
      const audio = new Audio(audioSrc);

      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration * 1000;
        setElapsedTime(0);

        startRef.current = Date.now();

        const updateElapsedTime = () => {
          const elapsed = Date.now() - startRef.current;
          setElapsedTime(elapsed);

          if (elapsed < duration && !audio.paused) {
            requestAnimationFrame(updateElapsedTime);
          } else {
            setElapsedTime(isFinite(duration) ? duration : 0);
          }
        };

        audio
          .play()
          .then(() => {
            requestAnimationFrame(updateElapsedTime);
          })
          .catch(() => {
            setError(true);
          });

        audioElementRef.current = audio;
      });
    } else {
      audioElementRef?.current?.pause();
    }
  }, [audioSrc, elapsedTime, startRef, audioElementRef]);

  const startRecording = useCallback(async () => {
    setError(false);
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(audioStream);

      mediaRecorder.ondataavailable = (event) => {
        dataArrayRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioData = new Blob(dataArrayRef.current, {
          type: 'audio/wav',
        });
        dataArrayRef.current = [];

        const audioUrl = URL.createObjectURL(audioData);
        setAudioSrc(audioUrl);
        const base64string = await blobToBase64String(audioData);
        setValue(base64string);
        setElapsedTime(0);
      };

      mediaRecorder.start(MAX_RECORDING_TIME);
      setRecording(true);
      startRef.current = Date.now();

      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      setError(true);
    }
  }, [blobToBase64String, setValue]);

  const removeRecord = useCallback(() => {
    setAudioSrc('');
    setElapsedTime(0);
    setRecordTime(0);
    setValue('');
  }, [setValue]);

  const stopPlayingRecord = useCallback(() => {
    audioElementRef.current?.pause();
  }, [audioElementRef]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (recording) {
      interval = setInterval(() => {
        setElapsedRecordTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [recording]);

  useEffect(() => {
    if (elapsedRecordTime >= MAX_RECORDING_TIME) {
      stopRecording();
    }
  }, [elapsedRecordTime, stopRecording]);

  const recordingState = useMemo(
    () =>
      disabled
        ? 'disabled'
        : recording
        ? 'recording'
        : recordTime > 0
        ? 'recorded'
        : error
        ? 'error'
        : 'neutral',
    [recording, recordTime, error]
  );

  const renderRecordingState = useCallback(() => {
    switch (recordingState) {
      case 'disabled':
      case 'neutral':
        return 'DOSTĘPNA OD 20,00 PLN';

      case 'recording':
        return 'TRWA NAGRYWANIE WIADOMOŚCI';

      case 'recorded':
        return 'WIADOMOŚĆ ZOSTAŁA NAGRANA';

      case 'error':
        return 'WYSTAPIŁ BŁĄD. SPRÓBUJ PONOWNIE';

      default:
        return '';
    }
  }, [recordingState]);

  const renderDescription = useCallback(
    () => (
      <div className="recorder__description">
        <p>WIADOMOŚĆ GŁOSOWA</p>
        <div className="recorder__description--small">
          <p>WIADOMOŚĆ ZOSTANIE ODTWORZONA</p>
          <p>NA TRANSMISJI STREAMERA</p>
        </div>

        <div className="recorder__description__state">
          <SwitchTransition>
            <CSSTransition
              key={recordingState}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames="fade"
            >
              <p
                ref={nodeRef}
                className={classNames(
                  `recorder__description__state--${recordingState}`,
                  ' '
                )}
              >
                {renderRecordingState()}
              </p>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    ),
    [renderRecordingState, nodeRef, recordingState]
  );

  const renderButtons = useCallback(() => {
    return (
      <div className="recorder__buttons__container">
        <div className="recorder__buttons">
          <SwitchTransition>
            <CSSTransition
              key={
                recordTime > 0 && !recording ? 'remove-record' : 'stop-record'
              }
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames="fade"
            >
              <button
                type="button"
                ref={stopRecordButtonRef}
                onClick={
                  recordTime > 0 && !recording
                    ? elapsedTime > 0
                      ? stopPlayingRecord
                      : removeRecord
                    : stopRecording
                }
                disabled={
                  disabled || (!recording && recordTime <= 0) || elapsedTime > 0
                }
                className={classNames(
                  'recorder__button',
                  'recorder__button--stop'
                )}
              >
                {recordTime > 0 && !recording ? (
                  <img src={'remove_icon'} alt="remove_record" />
                ) : (
                  <img src={stopIcon} alt="stop_record" />
                )}
              </button>
            </CSSTransition>
          </SwitchTransition>

          <button
            type="button"
            onClick={startRecording}
            disabled={
              disabled ||
              recording ||
              (isFinite(elapsedTime) && elapsedTime > 0)
            }
            className={classNames(
              'recorder__button',
              'recorder__button--record',
              {
                'recorder__button--recording': recording,
              }
            )}
          >
            <img src={recordIcon} alt="stop_record" />
          </button>

          <SwitchTransition>
            <CSSTransition
              key={
                !isFinite(elapsedTime) || elapsedTime <= 0 ? 'play' : 'pause'
              }
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames="fade"
            >
              <button
                ref={playRecordButtonRef}
                type="button"
                onClick={playPauseRecordedAudio}
                disabled={disabled || recording || recordTime <= 0}
                className={classNames(
                  'recorder__button',
                  'recorder__button--play'
                )}
              >
                {!isFinite(elapsedTime) || elapsedTime <= 0 ? (
                  <img src={playIcon} alt="play_icon" />
                ) : (
                  <img src={'pause_icon'} alt="pause_icon" />
                )}
              </button>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    );
  }, [
    recordTime,
    recording,
    elapsedTime,
    disabled,
    stopPlayingRecord,
    removeRecord,
    stopRecording,
    startRecording,
    playPauseRecordedAudio,
  ]);

  return (
    <div className="creator-payment-view__recorder">
      <div
        style={
          {
            '--record-duration-percentage': `${
              ((recording ? elapsedRecordTime : elapsedTime) /
                (recording ? 20 * 1000 : recordTime)) *
              100
            }%`,
          } as React.CSSProperties
        }
        className={classNames('recorder__wrapper', {
          'recorder__wrapper--active': recording || !!audioSrc,
        })}
      >
        {renderButtons()}
        {renderDescription()}
      </div>
    </div>
  );
};
