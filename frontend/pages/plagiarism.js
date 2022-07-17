import Link from "next/link";

const Plagiarism = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-full">
      <p className="text-yellow-300 font-bold text-xl">UNIQUEPOST</p>
      <h1 className="text-center font-bold text-2xl m-4">
        We see a problem with your post
      </h1>
      <img src="/warning.png" className="w-80" />
      <p className="text-center mb-4 mx-6">
        Our platform looks for originality. We determined that this post is very
        similar to another one and we can't accept it.
      </p>
      <Link href="/">
        <button className="bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
          Back to home
        </button>
      </Link>
    </main>
  );
};

export default Plagiarism;
