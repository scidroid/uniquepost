import useSWR from "swr";
import Image from "../components/Image";
import Link from "next/link";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Posts = () => {
  const [page, setpage] = useState(0);

  const { data } = useSWR(`http://localhost:8000/`, fetcher);

  const handlePage = (bool) => {
    const MIN = 0;
    const MAX = data?.count - 1;

    if (bool) {
      if (page < MAX) {
        setpage(page + 1);
      }
    } else if (page > MIN) {
      setpage(page - 1);
    }
  };

  const getStyles = (bool) => {
    const possible =
      "bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all";
    const disabled =
      "bg-gray-300 px-8 py-2 rxl font-bold hover:bg-gray-200 transition-all cursor-not-allowed";

    const MIN = 0;
    const MAX = data?.count - 1;

    if (bool) {
      return page < MAX ? possible : disabled;
    } else if (page > MIN) {
      return possible;
    } else {
      return disabled;
    }
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
      <h1 className="font-bold text-2xl text-center">All posts</h1>
      <article className="flex flex-col items-center justify-center">
        <Image
          variant={data?.items[page]?.variant}
          src={data?.items[page]?.image?.data}
          className="rounded-xl w-60"
        />
        <Link href={`/photo/${data?.items[page]?.key}?posts`}>
          <button className="m-4 bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
            View post
          </button>
        </Link>
      </article>
      <div>
        <button onClick={() => handlePage(false)} className={getStyles(false)}>
          ←
        </button>
        <button onClick={() => handlePage(true)} className={getStyles(true)}>
          →
        </button>
      </div>
    </main>
  );
};

export default Posts;
