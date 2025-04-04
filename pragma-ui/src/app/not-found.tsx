import Image from "next/image";
import tourist from "@/../public/assets/tourist.webp";
import { ButtonLink } from "@/components/common/Button";
import GreenText from "@/components/common/GreenText";

const Custom404Page = () => (
  <div className="gro w-full px-6 pt-40 pb-10 sm:px-24 md:px-32">
    <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 sm:space-y-10 md:space-y-16">
      <div className="w-32 sm:w-48">
        <Image
          src={tourist}
          alt="Tourist looking at a map"
          priority
          layout="responsive"
        />
      </div>
      <div>
        <h1 className="mb-4 text-center text-lightGreen">
          404&#8194;&#8211;&#8194;Zero knowledge of this page
        </h1>
        <GreenText>
          You told your friends you weren’t bringing your phone, to try and
          experience what travel was like back in the day. You bought a map, a
          bottle of water and a camera just for this trip. But the map was from
          2005, the landscape had changed and no one had verified the map. So
          here you are, in the middle of a large field, which the map continues
          to claim is a local grocer.
        </GreenText>
      </div>
      <div className="flex flex-col space-y-8 text-center sm:flex-row sm:space-x-12 sm:space-y-0">
        <ButtonLink variant="solid" color="mint" center={false} href="/">
          Return home
        </ButtonLink>
        <ButtonLink
          variant="outline"
          color="mint"
          center={false}
          href="mailto:support@pragma.build?body=Hi%Pragma-Team,"
        >
          Request asset
        </ButtonLink>
      </div>
    </div>
  </div>
);

export default Custom404Page;
