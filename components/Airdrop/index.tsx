import React from "react";
import NFTMintPage from "./MIntNft";
import AppHeader from "../common/AppHeader";
import PixelCatHolderAirdrop from "./PixelCatHolderAirdrop";
import WarpletHolderAirdrop from "./WarpleHolderAirdrop";

const Airdrop = () => {
  return (
    <div>
      <AppHeader headerName="Airdrop" />
      <div className="px-4 -mt-4 space-y-4 mb-20">
        {/* <PixelCatHolderAirdrop /> */}
        <WarpletHolderAirdrop />
        <NFTMintPage />
      </div>
    </div>
  );
};

export default Airdrop;
