import classNames from "classnames";
import sharedStyles from "../../pages/styles.module.scss";
import Image from "next/image";
import DoubleText from "./DoubleText";
import Link from "next/link";

type AssetHeaderProps = {
  asset: any;
  isAsset?: boolean;
};

const AssetHeader = ({ isAsset, asset }: AssetHeaderProps) => {
  return (
    <div
      className={classNames(
        "w-full flex-col justify-between gap-8 self-stretch md:flex-row md:gap-5	",
        sharedStyles.greenBox
      )}
    >
      <h2 className="my-auto flex flex-row items-center gap-4 text-lightGreen">
        <Image height={60} width={60} alt="arrowDown" src={asset.image} />
        <div className="flex flex-col">
          {isAsset ? asset.ticker : asset.name}
          {isAsset ? (
            ""
          ) : (
            <Link
              href={asset.link}
              className="pt-1 font-mono text-sm tracking-widest text-LightGreenFooter"
            >
              {asset.link}
            </Link>
          )}
          <div className="font-mono text-sm tracking-widest text-LightGreenFooter">
            {isAsset ? "" : asset.type}
          </div>
        </div>
      </h2>
      {isAsset ? (
        <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
          <div className="flex flex-col gap-4">
            <DoubleText bigText={`$${asset.price}`} smolText={"Price"} />
            <DoubleText bigText={asset.type} smolText={"Asset Type"} />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText bigText={asset.sources} smolText={"Nb Sources"} />
            <DoubleText bigText={asset.ema} smolText={"1h EMA"} />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText bigText={asset.lastUpdated} smolText={"Last Updated"} />
            <DoubleText bigText={asset.macd} smolText={"1h MACD"} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
          <div className="flex flex-col gap-4">
            <DoubleText bigText={asset.nbFeeds} smolText={"Nb Feeds"} />
            <DoubleText bigText={asset.type} smolText={"DP Type"} />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText
              bigText={asset.reputationScore}
              smolText={"Reputation score"}
            />
            <DoubleText
              bigText={asset.reputationScore}
              smolText={"24h updates"}
            />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText bigText={asset.lastUpdated} smolText={"Last Updated"} />
            <DoubleText
              bigText={asset.totalUpdates}
              smolText={"Total updates"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetHeader;
