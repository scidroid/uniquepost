import Link from "next/link";

const About = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-full">
      <p className="text-yellow-300 font-bold text-xl">UNIQUEPOST</p>
      <h1 className="font-bold text-2xl m-4">How this works?</h1>
      <img src="/about.png" className="w-72" />
      <p className="text-center mb-4 mx-6">
        Take a photo, add a filter and add it to the blockchain
      </p>
      <Link href="/take">
        <button className="bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
          Take the photo
        </button>
      </Link>
      <Link href="/submit">
        <button className="mt-2 bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
          Submit a photo
        </button>
      </Link>
    </main>
  );
};

export default About;
