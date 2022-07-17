import { useState } from "react";
import { useRouter } from "next/router";

const Submit = () => {
  const router = useRouter();

  const [base64, setBase64] = useState(null);

  const possible =
    " bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all";
  const disabled =
    "bg-gray-300 px-8 py-2 rxl font-bold hover:bg-gray-200 transition-all cursor-not-allowed";

  const handleSubmit = async () => {
    if (base64) {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: base64,
          name: Math.random().toString(16).slice(2),
        }),
      });

      const json = await res.json();

      router.push(`/post/${json.key}`);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (j) => {
      setBase64(j.target.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(base64);

  return (
    <main className="flex flex-col items-center justify-evenly min-h-full">
      <p className="text-yellow-300 font-bold text-xl">UNIQUEPOST</p>
      <h1 className="font-bold text-2xl m-4">Submit your image</h1>
      <section className="flex flex-col items-center justify-center">
        {base64 ? (
          <>
            <img
              className="w-72 rounded-xl object-cover"
              src={base64}
              alt="uploaded image"
            />
            <button
              onClick={() => setBase64(null)}
              className={`${possible} m-2`}
            >
              Upload another image
            </button>
          </>
        ) : (
          <input
            className=""
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        )}
      </section>
      <button className={base64 ? possible : disabled} onClick={handleSubmit}>
        Submit
      </button>
    </main>
  );
};

export default Submit;
