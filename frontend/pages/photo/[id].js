import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "../../components/Image";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Photo = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useSWR(`http://localhost:8000/${id}`, fetcher);

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
      <Image
        variant={data?.variant}
        src={data?.image?.data}
        className="rounded-xl w-60"
      />
      <h1 className="font-bold text-2xl text-center">{data?.title}</h1>
      <p>{`NFT ID: ${data?.nft.id}`}</p>
      <Link href="/">
        <button className="bg-yellow-300 px-8 py-2 rxl font-bold hover:shadow hover:bg-yellow-200 transition-all">
          Go to the homepage
        </button>
      </Link>
    </main>
  );
};

export default Photo;
