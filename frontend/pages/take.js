import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/router";

const TakePhoto = () => {
  const router = useRouter();

  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    const src = webcamRef.current.getScreenshot();

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: src,
        name: Math.random().toString(16).slice(2),
      }),
    });

    const json = await res.json();

    router.push(`/post/${json.key}`);
  }, [webcamRef]);

  return (
    <main className="flex flex-col items-center justify-around h-full">
      <p className="text-yellow-300 font-bold text-xl">UNIQUEPOST</p>
      <section className="flex flex-col items-center justify-center">
        <Webcam
          className="rounded-xl w-80 webh"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: { ideal: 600 },
            height: { ideal: 700 },
            facingMode: "user",
          }}
        />
        <button
          onClick={capture}
          className="bg-red-500 w-20 h-20 rounded-full mt-4"
        />
      </section>
    </main>
  );
};

export default TakePhoto;
