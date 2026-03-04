import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Assets/styles.module.scss";
import { Price } from "@/app/(dashboard)/assets/_types";
import { truncateTxHash } from "@/utils";

export const PriceTable = ({
  components,
  decimals,
  network,
}: {
  components: Price[];
  decimals: number;
  network: string;
}) => {
  return (
    <div className="z-1 w-full flex-col justify-between gap-0 green-box">
      <h4 className="text-lightGreen">Price Components</h4>
      <div className="w-full overflow-x-scroll">
        <div className={styles.priceComp}>
          <div className="flex flex-row gap-2	 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Publisher
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Source
          </div>

          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price
          </div>
          {network === "mainnet" && (
            <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
              Hash
            </div>
          )}
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Last Updated
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider"></div>
        </div>
        {components.map((component, index) => (
          <PriceItem
            key={index}
            component={component}
            decimals={decimals}
            network={network}
          />
        ))}
      </div>
    </div>
  );
};

const PriceItem = ({
  component,
  decimals,
  network,
}: {
  component: Price;
  decimals: number;
  network: string;
}) => {
  return (
    <div className={styles.priceComp}>
      <Link
        href={`/provider/${component.publisher}`}
        className="flex cursor-pointer flex-row gap-2 	 font-mono text-sm text-lightGreen md:tracking-wider"
      >
        {component.publisher}
        <Image
          height={16}
          width={16}
          alt="Link"
          src="/assets/vectors/outLink.svg"
        />
      </Link>
      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.source}
      </div>

      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {parseInt(component.price, 16) / 10 ** decimals}
      </div>
      {network === "mainnet" && (
        <Link
          className=" flex cursor-pointer flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider"
          href={`https://voyager.online/tx/${component.tx_hash}`}
        >
          {truncateTxHash(component.tx_hash)}
          <Image
            height={16}
            width={16}
            alt="Link"
            src="/assets/vectors/outLink.svg"
          />
        </Link>
      )}

      <div className="flex flex-row gap-2 overflow-auto font-mono text-sm text-lightGreen md:tracking-wider">
        {new Date(component.timestamp * 1000).toLocaleString()}
      </div>
      <div className="flex flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider"></div>
    </div>
  );
};
