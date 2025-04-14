import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";

const SortableHeader = (label: string, column: any) => {
  const sortState = column.getIsSorted();

  let SortIcon = ArrowUpDown;
  if (sortState === "asc") SortIcon = ArrowDown;
  else if (sortState === "desc") SortIcon = ArrowUp;

  return (
    <div
      className="flex items-center gap-1 cursor-pointer select-none"
      onClick={column.getToggleSortingHandler()}
    >
      {label}
      <SortIcon className="w-3 h-3" />
    </div>
  );
};

export const columns = (currentSource?: string): ColumnDef<AssetInfo>[] => [
  {
    accessorKey: "ticker",
    header: ({ column }) => SortableHeader("Pair", column),
    cell: ({ row }) => {
      const asset = row.original;
      return (
        <Link
          prefetch
          href={`/asset/${encodeURIComponent(asset.ticker).replace(
            "%2F",
            "-"
          )}?network=${currentSource}`}
          className="flex items-center gap-2"
        >
          <Avatar>
            <AvatarImage width={30} height={30} src={asset.image} />
            <AvatarFallback className="bg-lightBlur">
              {asset.ticker[0]}
            </AvatarFallback>
          </Avatar>

          <span>{asset.ticker}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => SortableHeader("Last Updated", column),
    cell: ({ row }) => <span>{row.original.lastUpdated}</span>,
  },
  {
    accessorKey: "sources",
    header: ({ column }) => SortableHeader("Nb Sources", column),
  },
  {
    accessorKey: "price",
    header: ({ column }) => SortableHeader("Price", column),
    cell: ({ row }) => <span>${Number(row.original.price).toFixed(5)}</span>,
  },
  ...(!currentSource || currentSource !== "api"
    ? [
        {
          accessorKey: "variations.past1h",
          header: ({ column }) => SortableHeader("1H", column),
          cell: ({ row }) => {
            const val = Number(row.original.variations.past1h);
            const color = val > 0 ? "text-mint" : val < 0 ? "text-redDown" : "";
            return (
              <span className={color}>
                {val > 0 ? "▲" : val < 0 ? "▼" : "-"} {val}%
              </span>
            );
          },
        },
        {
          accessorKey: "variations.past24h",
          header: ({ column }) => SortableHeader("24H", column),
          cell: ({ row }) => {
            const val = Number(row.original.variations.past24h);
            const color = val > 0 ? "text-mint" : val < 0 ? "text-redDown" : "";
            return (
              <span className={color}>
                {val > 0 ? "▲" : val < 0 ? "▼" : "-"} {val}%
              </span>
            );
          },
        },
        {
          accessorKey: "variations.past7d",
          header: ({ column }) => SortableHeader("7D", column),
          cell: ({ row }) => {
            const val = Number(row.original.variations.past7d);
            const color = val > 0 ? "text-mint" : val < 0 ? "text-redDown" : "";
            return (
              <span className={color}>
                {val > 0 ? "▲" : val < 0 ? "▼" : "-"} {val}%
              </span>
            );
          },
        },
        {
          id: "chart",
          header: "7D Chart",
          cell: ({ row }) =>
            row.original.chart ? (
              <Image
                src={row.original.chart}
                alt="chart"
                width={100}
                height={40}
              />
            ) : (
              <span>N/A</span>
            ),
        },
      ]
    : []),
];
