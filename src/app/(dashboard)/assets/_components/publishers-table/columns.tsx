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
      className="flex items-center gap-1 cursor-pointer select-none"
      onClick={column.getToggleSortingHandler()}
    >
      {label}
      <SortIcon className="w-3 h-3" />
    </div>
  );
};

export const publisherColumns: ColumnDef<DataProviderInfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => SortableHeader("Identifier", column),
    cell: ({ row }) => {
      const publisher = row.original;
      return (
        <Link
          href={`/provider/${publisher.name}`}
          className="flex items-center gap-2"
        >
          <Avatar>
            <AvatarImage width={30} height={30} src={publisher.image} />
            <AvatarFallback className="bg-lightBlur">
              {publisher.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>
              {publisher.name === "SKYNET_TRADING" ? "SKYNET" : publisher.name}
            </span>
            <span className="text-xs uppercase text-LightGreenFooter">
              {publisher.type}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => SortableHeader("Last update", column),
    cell: ({ row }) => (
      <span>
        {formatDistanceToNow(
          new Date(Number(row.original.lastUpdated) * 1000),
          { addSuffix: true }
        )}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span>{getPublisherType(Number(row.original.type))}</span>
    ),
  },
  {
    accessorKey: "reputationScore",
    header: ({ column }) => SortableHeader("Reputation", column),
  },
  {
    accessorKey: "nbFeeds",
    header: ({ column }) => SortableHeader("Nb feeds", column),
  },
  {
    accessorKey: "dailyUpdates",
    header: ({ column }) => SortableHeader("Updates/day", column),
  },
  {
    accessorKey: "totalUpdates",
    header: "Total updates",
  },
];
