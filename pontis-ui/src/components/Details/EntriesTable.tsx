import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { Entry } from "../../hooks/oracle";
import { capitalize, secondsToTime } from "../../../utils/display";

interface EntriesTableProps {
  assetKey: string;
  oracleResponse: Entry[];
  loading: boolean;
  error: string;
}

const EntriesTable: React.FC<EntriesTableProps> = ({
  assetKey,
  oracleResponse,
  loading,
  error,
}) => {
  const data = useMemo(() => {
    if (loading || !oracleResponse?.length) {
      return [];
    }
    if (error) {
      return [];
    }
    return oracleResponse;
  }, [oracleResponse, loading, error]);

  const columns = useMemo<ColumnDef<Entry>[]>(
    () => [
      {
        accessorKey: "source",
        accessorFn: (entry) => capitalize(entry.source),
        header: "Source",
      },
      {
        accessorKey: "value",
        header: "Value",
      },
      {
        accessorKey: "timestamp",
        accessorFn: (entry) => secondsToTime(entry.timestamp),
        header: "Time",
      },
      {
        accessorKey: "publisher",
        accessorFn: (entry) => capitalize(entry.publisher),
        header: "Publisher",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-w-7xl overflow-y-hidden overflow-x-scroll rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
      <table className="w-full divide-y divide-slate-300 font-mono">
        <thead className="bg-slate-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={classNames(
                        "px-3 py-4 text-left text-lg font-semibold text-slate-900"
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className={classNames({
                "bg-slate-50": i % 2,
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-slate-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
