import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import Image from "../../components/Image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const effects = [
    "normal",
    "icy-water",
    "summer-heat",
    "fever",
    "strawberry",
    "yellow-haze",
  ];

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("normal");
  const [text, setText] = useState("");

  const { data } = useSWR(`http://localhost:8000/photo/${id}`, fetcher);

  const handleClick = async () => {
    const res = await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: data?.key,
        title: text,
        variant: selected,
      }),
    });

    const r = await res.json();

    router.push(r.plagiarism ? "/plagiarism" : `/photo/${r.key}`);
  };

  if (!data) {
    return (
      <main className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-300" />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-around h-full">
      <p className="text-yellow-300 font-bold text-xl">UNIQUEPOST</p>
      {step == 0 && (
        <>
          <Image
            variant={selected}
            src={data?.data}
            className="rounded-xl w-60"
          />
          <section className="whitespace-nowrap overflow-x-auto overflow-y-auto">
            {effects.map((effect, key) => (
              <Image
                key={key}
                circular
                cclassName={`mx-4 cursor-pointer ${
                  selected == effect &&
                  "border-4 rounded-full border-yellow-300"
                }`}
                className="w-16 h-16 rounded-full object-cover"
                src={data?.data}
                variant={effect}
                onClick={() => setSelected(effect)}
              />
            ))}
          </section>
          <button
            onClick={() => setStep(1)}
            className="bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all"
          >
            Next step
          </button>
        </>
      )}
      {step == 1 && (
        <>
          <Image
            variant={selected}
            src={data?.data}
            className="rounded-xl w-60"
          />
          <textarea
            placeholder="Add a caption"
            className="border-1 border-slate-200 rounded-xl w-72 h-32"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all"
          >
            Submit
          </button>
        </>
      )}
    </main>
  );
};

export default Post;
