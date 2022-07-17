import fastify from "fastify";
import fileUpload from "fastify-file-upload";
import cors from "@fastify/cors";

import { Deta } from "deta";

import "dotenv/config";

import {
  Client,
  TokenCreateTransaction,
  PrivateKey,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  TokenNftInfoQuery,
  NftId,
} from "@hashgraph/sdk";

const mint = async (nftName, nftUrl) => {
  const accountId = process.env.ID;
  const privateKey = process.env.KEY;

  const client = Client.forTestnet();

  client.setOperator(accountId, privateKey);

  const token = await new TokenCreateTransaction()
    .setTokenName(nftName)
    .setTokenSymbol("CRUNCH")
    .setDecimals(0)
    .setInitialSupply(0)
    .setSupplyKey(PrivateKey.fromString(privateKey))
    .setTokenType(TokenType.NonFungibleUnique)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(1)
    .setTreasuryAccountId(accountId)
    .execute(client);

  const receipt_token = await token.getReceipt(client);
  const id = receipt_token.tokenId;

  const nft = await new TokenMintTransaction()
    .setTokenId(id)
    .setMetadata([Buffer.from(nftUrl)])
    .execute(client);

  const receipt = await nft.getReceipt(client);

  const serial = receipt.serials[0].toNumber();

  const info = await new TokenNftInfoQuery()
    .setNftId(new NftId(id, serial))
    .execute(client);

  return {
    receipt,
    receipt_token,
    id: id.num.low,
    serial,
    metadata: info[0].metadata.toString(),
  };
};

const compare = (first, second) => {
  first = first.replace(/\s+/g, "");
  second = second.replace(/\s+/g, "");

  if (first === second) return 1;
  if (first.length < 2 || second.length < 2) return 0;

  const firstBigrams = new Map();

  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

    firstBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
};

const app = fastify();
const deta = Deta(process.env.DETA);
const drive = deta.Base("fs");
const db = deta.Base("photos");

app.register(fileUpload);
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
  allowHeaders: ["Content-Type"],
});

app.get("/", async () => {
  return db.fetch();
});

app.get("/:id", async (req) => {
  const { id } = req.params;

  return db.get(id);
});

app.post("/add", async (req) => {
  const { file, title, variant } = req.body;

  const imageData = await drive.get(file);
  const posts = await db.fetch();

  let plagiarism = false;

  posts.items.map((i) => {
    const similarity = compare(i?.image?.data, imageData?.data);

    i.similarity = similarity;

    if (similarity > 0.75) {
      plagiarism = true;
    }
  });

  if (plagiarism) {
    return {
      plagiarism,
      posts: posts.items,
    };
  }

  const nft = await mint(title, `http://localhost:8000/photo/${file}`);

  return db.put({
    variant,
    title,
    image: imageData,
    nft,
    posts: posts.items,
  });
});

app.post("/upload", async (req) => {
  const { name, data } = req.body;
  return drive.insert({ data }, name);
});

app.get("/photo/:id", async (req) => {
  const { id } = req.params;
  return drive.get(id);
});

const run = async () => {
  try {
    await app.listen({ port: 8000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

run();
