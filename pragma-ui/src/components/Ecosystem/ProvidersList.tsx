import Image from "next/image";
import styles from "./styles.module.scss";

const providersData = [
  {
    logo: "/assets/publishers/skynet_trading.svg",
    description:
      "Skynet Trading is thrilled to be at the forefront of enhancing trust and accuracy in the crypto market, contributing our valuable data through Pragma's advanced zk-enabled technology, a pivotal step towards a more transparent and reliable digital asset ecosystem.",
  },
  {
    logo: "/assets/publishers/flowdesk.svg",
    description:
      "We are happy to partner with Pragma as a data provider. Their verifiable computational feeds are a key component to support the next generation of Defi protocols and we are excited to take part in this project",
  },
  {
    logo: "/assets/publishers/avnu.svg",
    description:
      "We're thrilled to provide our top-tier data from our solvers to help secure DeFi on Starknet",
  },
];

const ProvidersList = () => (
  <div className="flex w-full flex-col gap-9 overflow-hidden lg:flex-row">
    {providersData.map((tab, index) => (
      <div className={styles.dpBox} key={index}>
        <Image
          src={tab.logo}
          height={32}
          width={120}
          className="h-8"
          alt="logo"
        />
        {tab.description}
      </div>
    ))}
  </div>
);

export default ProvidersList;
