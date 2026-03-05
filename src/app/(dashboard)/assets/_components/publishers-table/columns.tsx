import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";
import { getPublisherType } from "@/app/(dashboard)/assets/_helpers/getPublisherType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SortableHeader = (label: string, column: any) => {
  const sortState = column.getIsSorted();

  let SortIcon = ArrowUpDown;
  if (sortState === "asc") SortIcon = ArrowDown;
  else if (sortState === "desc") SortIcon = ArrowUp;

  return (
    <div
      className="flex cursor-pointer select-none items-center gap-1.5 transition-colors hover:text-lightGreen"
      onClick={column.getToggleSortingHandler()}
    >
      {label}
      <SortIcon className="h-3 w-3 opacity-50" />
    </div>
  );
};

export const publisherColumns: ColumnDef<DataProviderInfo>[] = [
  {
    accessorKey: "name",
    size: 220,
    header: ({ column }) => SortableHeader("Identifier", column),
    cell: ({ row }) => {
      const publisher = row.original;
      const displayName =
        publisher.name === "SKYNET_TRADING" ? "SKYNET" : publisher.name;
      return (
        <Link
          href={`/provider/${publisher.name}`}
          className="group/link flex items-center gap-3"
        >
          <Avatar className="h-9 w-9 border border-lightBlur/50 transition-shadow group-hover/link:shadow-[0_0_10px_rgba(21,255,129,0.15)]">
            <AvatarImage width={36} height={36} src={publisher.image} />
            <AvatarFallback className="bg-lightBlur text-xs font-medium text-lightGreen">
              {displayName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-white transition-colors group-hover/link:text-mint">
              {displayName}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-lightGreen/40">
              {getPublisherType(Number(publisher.type))}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    size: 180,
    header: ({ column }) => SortableHeader("Last update", column),
    cell: ({ row }) => {
      const raw = row.original.lastUpdated;
      if (!raw || raw === "null") {
        return <span className="text-xs italic text-lightGreen/30">n/a</span>;
      }
      const ts = Number(raw) * 1000;
      if (isNaN(ts) || ts <= 0) {
        return <span className="text-xs italic text-lightGreen/30">n/a</span>;
      }
      const distance = formatDistanceToNow(new Date(ts), { addSuffix: true });
      const isRecent = Date.now() - ts < 600_000;
      return (
        <span
          className={
            isRecent ? "text-mint/80" : "font-mono text-xs text-lightGreen/60"
          }
        >
          {distance}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const typeStr = getPublisherType(Number(row.original.type));
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            typeStr === "1st party"
              ? "border border-mint/20 bg-mint/10 text-mint"
              : "border border-purple/20 bg-purple/10 text-purple"
          }`}
        >
          {typeStr}
        </span>
      );
    },
  },
  {
    accessorKey: "reputationScore",
    header: ({ column }) => SortableHeader("Reputation", column),
    cell: ({ row }) => (
      <span className="text-xs text-lightGreen/40 italic">
        {row.original.reputationScore || "soon"}
      </span>
    ),
  },
  {
    accessorKey: "nbFeeds",
    header: ({ column }) => SortableHeader("Feeds", column),
    cell: ({ row }) => (
      <span className="font-mono font-medium text-white">
        {row.original.nbFeeds}
      </span>
    ),
  },
  {
    accessorKey: "dailyUpdates",
    size: 150,
    header: ({ column }) => SortableHeader("Updates / day", column),
    cell: ({ row }) => (
      <span className="font-mono text-lightGreen">
        {Number(row.original.dailyUpdates).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "totalUpdates",
    size: 140,
    header: "Total updates",
    cell: ({ row }) => (
      <span className="font-mono text-lightGreen/70">
        {Number(row.original.totalUpdates).toLocaleString()}
      </span>
    ),
  },
];
