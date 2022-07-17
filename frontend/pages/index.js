import { motion } from "framer-motion";
import Image from "../components/Image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const effects = [
    "normal",
    "icy-water",
    "summer-heat",
    "fever",
    "strawberry",
    "yellow-haze",
  ];

  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const random = effects[Math.floor(Math.random() * effects.length)];
      setText(random);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <main className="flex flex-col justify-around items-center h-full">
      <p className="text-yellow-300 font-bold text-xl">UNIQUEPOST</p>
      <div className="mt-2 relative z-10 w-52 h-52">
        <motion.div
          animate={{
            rotate: [30, -30, 30, -30, 30, -30, 30, -30, 30, -30, 30, -30, 30],
          }}
          transition={{ duration: 30 }}
          className="absolute top-0 z-30 w-52 h-52 rounded-xl bg-yellow-300"
        />
        <motion.div
          animate={{
            rotate: [-30, 30, -30, 30, -30, 30, -30, 30, -30, 30, -30, 30, -30],
          }}
          transition={{ duration: 30 }}
          className="absolute top-0 z-20 w-52 h-52 rounded-xl bg-blue-500"
        />
        <Image
          variant={text}
          cclassName="z-40 absolute top-0 rxl"
          src="https://source.unsplash.com/random/600x600/?woman"
          className="w-52 h-52 rxl object-cover"
        />
      </div>
      <article className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mt-6 mb-6 mx-12 text-center">
          Transform your photos in NFTs
        </h1>
        <Link href="/about">
          <button className="bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
            Start now
          </button>
        </Link>
        <Link href="/posts">
          <button className="mt-2 bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
            View posts
          </button>
        </Link>
      </article>
    </main>
  );
};

export default Home;
