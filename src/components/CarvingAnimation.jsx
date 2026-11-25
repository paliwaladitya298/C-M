import { useEffect, useRef, useState } from "react";

const frames = [
  { src: "/animation/frames/frame-01.png", duration: 320 },
  { src: "/animation/frames/frame-02.png", duration: 180 },
  { src: "/animation/frames/frame-03.png", duration: 280 },
  { src: "/animation/frames/frame-04.png", duration: 90 },
  { src: "/animation/frames/frame-05.png", duration: 100 },
  { src: "/animation/frames/frame-06.png", duration: 320 },
  { src: "/animation/frames/frame-07.png", duration: 210 },
  { src: "/animation/frames/frame-08.png", duration: 230 },
  { src: "/animation/frames/frame-09.png", duration: 240 },
  { src: "/animation/frames/frame-10.png", duration: 280 },
  { src: "/animation/frames/frame-11.png", duration: 120 },
  { src: "/animation/frames/frame-13.png", duration: 220 },
  { src: "/animation/frames/frame-14.png", duration: 200 },
  { src: "/animation/frames/frame-15.png", duration: 260 },
  { src: "/animation/frames/frame-16.png", duration: 240 },
  { src: "/animation/frames/frame-17.png", duration: 280 },
  { src: "/animation/frames/frame-18.png", duration: 380 },
  { src: "/animation/frames/frame-19.png", duration: 220 },
  { src: "/animation/frames/frame-20.png", duration: 260 },
  { src: "/animation/frames/frame-21.png", duration: 240 },
  { src: "/animation/frames/frame-22.png", duration: 300 },
  { src: "/animation/frames/frame-23.png", duration: 340 },
  { src: "/animation/frames/frame-24.png", duration: null },
];

const lastFrameIndex = frames.length - 1;
const description = "A craftsman carves a rough stone into a Celtic cross memorial.";

function preloadFrame(src) {
  const image = new Image();
  image.src = src;
  return image.decode();
}

export default function CarvingAnimation() {
  const [frameIndex, setFrameIndex] = useState(lastFrameIndex);
  const [playbackFinished, setPlaybackFinished] = useState(false);
  const [canReplay, setCanReplay] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const fallbackFrameRef = useRef(lastFrameIndex);
  const loadedFramesRef = useRef([]);
  const animationRequestRef = useRef(0);
  const playbackFailedRef = useRef(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);

    motionPreference.addEventListener("change", updatePreference);
    return () => motionPreference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    let cancelled = false;
    playbackFailedRef.current = false;

    if (prefersReducedMotion) {
      setFrameIndex(lastFrameIndex);
      setPlaybackFinished(true);
      setCanReplay(false);
      return undefined;
    }

    setFrameIndex(lastFrameIndex);
    setPlaybackFinished(false);
    setCanReplay(false);

    const startPlayback = async () => {
      const results = await Promise.allSettled(frames.map(({ src }) => preloadFrame(src)));
      const loadedFrames = results.flatMap((result, index) => {
        if (result.status === "fulfilled") return [index];
        console.error(`Unable to preload animation frame ${frames[index].src}`, result.reason);
        return [];
      });

      if (cancelled) return;

      loadedFramesRef.current = loadedFrames;
      const fallbackFrame = loadedFrames.includes(lastFrameIndex)
        ? lastFrameIndex
        : loadedFrames[loadedFrames.length - 1];
      if (fallbackFrame !== undefined) {
        fallbackFrameRef.current = fallbackFrame;
        setFrameIndex(fallbackFrame);
      }

      if (loadedFrames.length !== frames.length) {
        setPlaybackFinished(true);
        return;
      }

      setCanReplay(true);
      let currentFrame = 0;
      let elapsed = 0;
      let previousTime;
      setFrameIndex(currentFrame);

      const advance = (time) => {
        if (playbackFailedRef.current) return;
        if (previousTime !== undefined) elapsed += time - previousTime;
        previousTime = time;

        let nextFrame = currentFrame;
        while (nextFrame < lastFrameIndex && elapsed >= frames[nextFrame].duration) {
          elapsed -= frames[nextFrame].duration;
          nextFrame += 1;
        }

        if (nextFrame !== currentFrame) {
          currentFrame = nextFrame;
          setFrameIndex(currentFrame);
        }

        if (currentFrame === lastFrameIndex) {
          setPlaybackFinished(true);
          return;
        }

        animationRequestRef.current = window.requestAnimationFrame(advance);
      };

      animationRequestRef.current = window.requestAnimationFrame(advance);
    };

    void startPlayback();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationRequestRef.current);
    };
  }, [prefersReducedMotion, replayKey]);

  const handleImageError = () => {
    playbackFailedRef.current = true;
    window.cancelAnimationFrame(animationRequestRef.current);
    const alternativeFrame = loadedFramesRef.current.filter((index) => index !== frameIndex).pop();
    setFrameIndex(
      frameIndex === fallbackFrameRef.current
        ? (alternativeFrame ?? fallbackFrameRef.current)
        : fallbackFrameRef.current,
    );
    setPlaybackFinished(true);
    setCanReplay(false);
  };

  return (
    <div className="hero-animation">
      <figure className="animation-artwork" role="img" aria-label={description}>
        <img src={frames[frameIndex].src} alt="" draggable="false" onError={handleImageError} />
      </figure>
      {playbackFinished && canReplay && !prefersReducedMotion && (
        <button
          className="animation-replay"
          type="button"
          onClick={() => setReplayKey((key) => key + 1)}
        >
          Replay animation
        </button>
      )}
    </div>
  );
}
