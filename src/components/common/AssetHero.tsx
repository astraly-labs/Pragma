import { ArrowUpRight } from "lucide-react";
export default function AssetHero({
  title,
  greenTitle,
  description,
  solidButton,
  solidButtonLink,
}) {
  return (
    <header className="explorer-intro">
      <span className="eyebrow">Starknet / Data explorer</span>
      <div>
        <h1>
          {title}
          <br />
          <span>{greenTitle}</span>
        </h1>
        <div>
          <p>{description}</p>
          <a className="text-link" href={solidButtonLink}>
            {solidButton}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
