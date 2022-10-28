import { Request, Response } from "express";
import Web3 from "web3";
import * as jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../util/secrets";
import { User } from "../models/User";
import { NativeError } from "mongoose";
import { UserDocument } from "../models/User";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

/**
 * Crawler.
 * @route POST /
 */

let result: {};
let address = "";

const chain = EvmChain.ETHEREUM;
export const crawler = async (req: Request, res: Response) => {
  var verified_email;

  // Verify User with JWT
  jwt.verify(
    req.headers.authorization?.replace("Bearer ", ""),
    SESSION_SECRET,
    (err: any, decoded: jwt.JwtPayload) => {
      if (err) {
        res.status(200).send("Verify Token Failed!");
        return;
      }
      verified_email = decoded.email;
    }
  );

  await User.findOne(
    { email: verified_email },
    (err: NativeError, existingUser: UserDocument) => {
      if (err) {
        console.log(err, "Error Occured in DB");
        res.status(200).send(err);
      }
      if (existingUser) {
        address = existingUser.address;
      }
    }
  );
  await crawlTransactionwithMoralis();
  res.status(200).send(result);
};

export const crawlerERC20 = async (req: Request, res: Response) => {
  var verified_email;
  // Verify User with JWT
  jwt.verify(
    req.headers.authorization?.replace("Bearer ", ""),
    SESSION_SECRET,
    (err: any, decoded: jwt.JwtPayload) => {
      if (err) {
        console.log("Alex Test Result Error:", err);
        res.status(200).send("Verify Token Failed!");
        return;
      }
      verified_email = decoded.email;
    }
  );

  await User.findOne(
    { email: verified_email },
    (err: NativeError, existingUser: UserDocument) => {
      if (err) {
        console.log(err, "Error Occured in DB");
        res.status(200).send(err);
      }
      if (existingUser) {
        address = existingUser.address;
      }
    }
  );
  await crawlTransactionERC20withMoralis();
  res.status(200).send(result);
};

const crawlTransactionwithMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
  Moralis.EvmApi.transaction
    .getWalletTransactions({
      address,
      chain,
    })
    .then((res) => {
      let tempArr: any[] = [];
      if (res != null && res.result != null) {
        for (let txHash of res.result) {
          tempArr = [
            ...tempArr,
            {
              hash: txHash.hash,
              from: txHash.from["_value"].toLowerCase(),
              to: txHash.to["_value"].toLowerCase(),
              value: txHash.value["rawValue"],
            },
          ];
        }
        result = tempArr;
      }
    });
};

const crawlTransactionERC20withMoralis = async () => {
  const axios = require("axios");
  const config = {
    method: "get",
    url: `https://deep-index.moralis.io/api/v2/${address}/erc20/transfers?chain=eth`,
    headers: { "X-API-Key": process.env.MORALIS_API_KEY },
  };
  let res = await axios(config);
  let tempArr: any[] = [];
  console.log(res.data.result, "Alex Test ERC20 Transaction");
  if (res != null && res.data.result != null) {
    for (let txHash of res.data.result) {
      tempArr = [
        ...tempArr,
        {
          contractAddress: txHash.address,
          hash: txHash.transaction_hash,
          from: txHash.from_address,
          to: txHash.to_address,
          value: txHash.value,
        },
      ];
    }
    result = tempArr;
  }
};
