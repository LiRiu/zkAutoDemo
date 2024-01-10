//@ts-ignore
import { Bytes, Block, require } from "@hyperoracle/zkgraph-lib";
import { ethscriptionsProtocolCreateEthscription } from "./types/ethscriptionsProtocolCreateEthscription";

export function handleBlocks(blocks: Block[]): Bytes {
  const events = blocks[0].events;
  let resultBytes: Bytes = Bytes.fromHexString(
    "0x0682108f000000000000000000000000000000000000000000000000000000000000002"
  );

  let longBytes: Bytes = Bytes.fromI32BigEndian(events.length).padStart(32, 0);
  resultBytes = Bytes.fromByteArray(resultBytes.concat(longBytes));

  require( events.length > 0 );

  for (let i = 0; i < events.length; i++) {
    const Ethscription = ethscriptionsProtocolCreateEthscription.fromEvent(
      events[i]
    );
    const ownerBytes = Ethscription.initialOwner.padStart(32, 0);
    resultBytes = Bytes.fromByteArray(resultBytes.concat(ownerBytes));
  }
  return resultBytes;
}
