type DoubleTextProps = {
  bigText: string;
  smallText: string;
};

export const DoubleText = ({ bigText, smallText }: DoubleTextProps) => (
  <div className={"flex flex-col"}>
    <div className="text-xs tracking-wider text-lightGreen sm:text-lg">
      {bigText}
    </div>
    <div className="font-mono text-xs tracking-wider text-LightGreenFooter sm:text-sm">
      {smallText}
    </div>
  </div>
);
