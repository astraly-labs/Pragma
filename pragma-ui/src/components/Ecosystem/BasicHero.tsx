import Image from "next/image";
import classNames from "classnames";
import GreenText from "@/components/common/GreenText";
import { ButtonLink } from "@/components/common/Button";

type BasicHeroProps = {
  title: string;
  greenTitle: string;
  description: string;
  solidButton: string;
  solidButtonLink: string;
  outlineButton: string;
  outlineButtonLink: string;
  illustrationLink: string;
  illustrationSmallLink: string;
};

const BasicHero = ({
  title,
  greenTitle,
  description,
  solidButton,
  solidButtonLink,
  outlineButton,
  outlineButtonLink,
  illustrationLink,
  illustrationSmallLink,
}: BasicHeroProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={illustrationLink}
        alt="Illustration Hero"
        width={900}
        height={400}
        className="absolute bottom-0 right-0 hidden md:block"
      />
      <Image
        src={illustrationSmallLink}
        alt="Illustration Hero"
        width={900}
        height={400}
        className="absolute right-0 left-0 bottom-0 ml-auto mr-auto block w-full md:hidden"
      />
      <div className={classNames("flex w-full")}>
        <header className="z-1 relative mx-5 flex flex-col justify-center space-y-10 pb-32 text-center md:mx-0 md:w-8/12 md:justify-start md:py-8 md:pl-20 md:text-left lg:my-32 lg:w-5/12">
          <h1 className="pt-32 text-lightGreen md:whitespace-nowrap">
            {title}
            <br />
            <span className="text-mint">{greenTitle}</span>
          </h1>
          <GreenText isAligned={false} className="hidden md:block">
            {description}
          </GreenText>
          <GreenText isAligned={true} className="block md:hidden">
            {description}
          </GreenText>
          <div className=" m-auto flex flex-col gap-6 md:m-0 md:flex-row">
            <ButtonLink
              center={false}
              color="mint"
              variant="solid"
              href={solidButtonLink}
              className="w-fit"
            >
              {solidButton}
            </ButtonLink>
            <ButtonLink
              center={false}
              color="mint"
              variant="outline"
              href={outlineButtonLink}
              className="w-full"
            >
              {outlineButton}
            </ButtonLink>
          </div>
        </header>
      </div>
    </div>
  );
};

export default BasicHero;
