"use client";

import { Fragment, isValidElement, ReactNode, useState } from "react";
import { Button } from "../Button";

type Column<T> = {
  header: ReactNode;
  accessor?: keyof T | string;
  cell?: (row: T, rowIndex: number) => ReactNode;
  className?: string;
  isVisible: boolean;
  onClick?: any;
};

type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey?: (row: T, index: number) => string | number;
  headerSticky?: boolean;
  metaData?: MetaData;
  subActions?: SubAction[];
  mainAction?: MainAction;
  className?: string;
  tableClasses?: string;
  searchKey?: string;
  fallbackText?: string;
};

type MetaData = {
  id: string | number;
  createdAt: string;
  privateIpv4: string;
  publicIpv4: string;
  privateIpv6: string;
  publicIpv6: string;
};

type SubAction = {
  children: string;
  onClick: () => void;
  classNames?: string;
};

type MainAction = {
  children: string;
  onClick: (id: string) => void;
  classNames?: string;
};

function isReactNode(value: any): value is ReactNode {
  return (
    isValidElement(value) ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  );
}

export default function Table<T extends Record<string, any>>({
  columns,
  rows,
  rowKey,
  headerSticky = false,
  metaData,
  subActions,
  mainAction,
  className,
  tableClasses,
  searchKey,
  fallbackText = "No Data Found",
}: TableProps<T>) {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>();
  const [searchTerm, setSearchTerm] = useState("");
  const thPadding = "py-3 px-6";
  const tdPadding = "py-4 px-6";
  const tdDefaultStyling = "body-medium font-medium text-themeGray-900";

  const defaultRowKey = (row: T, i: number) => {
    // prefer id or _id if present, else index
    if ((row as any).id !== undefined) return (row as any).id;
    if ((row as any)._id !== undefined) return (row as any)._id;
    return i;
  };

  const metaDataKeys: { name: string; key: keyof MetaData }[] = [
    { name: "ID", key: "id" },
    { name: "Created Time", key: "createdAt" },
    { name: "Private IPv4", key: "privateIpv4" },
    { name: "Public IPv4", key: "publicIpv4" },
    { name: "Private IPv6", key: "privateIpv6" },
    { name: "Public IPv6", key: "publicIpv6" },
  ];

  const isExpandable =
    (metaData && Object.entries(metaData)?.length > 0) ||
    (subActions && subActions?.length > 0) ||
    (mainAction && Object.entries(mainAction)?.length > 0);

  const visibleColumnsLength = columns.filter(
    (column) => column.isVisible
  ).length;

  const filteredRows = searchKey
    ? rows.filter((row) => {
        const value = row[searchKey];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : rows;

  const renderRowDetailsAndActions = (rowId: number, detailsId: string) => {
    return (
      <tr
        key={`extra tr-${rowId}`}
        className={`${rowId + 1 === hoveredRowId ? "" : "border-none"}`}
      >
        <td
          key={`extra td-${rowId}`}
          colSpan={visibleColumnsLength}
          className="p-0"
        >
          <div
            className={`flex flex-col gap-4 py-4 px-6 transition-all duration-500 ease-in-out overflow-hidden ${
              rowId + 1 === hoveredRowId
                ? "max-h-[300px] opacity-100"
                : "max-h-0 opacity-0 !p-0"
            }`}
            onMouseOver={() => {
              setHoveredRowId(rowId + 1);
            }}
            onMouseLeave={() => {
              setHoveredRowId(null);
            }}
          >
            {metaData && (
              <div className="flex justify-between items-center gap-3">
                {metaDataKeys.map((item, index) => (
                  <div
                    key={index}
                    className={`${tdDefaultStyling} whitespace-nowrap`}
                  >
                    <span>{item.name}</span> <br />
                    <span className="text-themeGray-600 font-normal">
                      {metaData?.[item.key] ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {subActions && subActions?.length > 0 && (
              <>
                <div
                  className={`title-medium text-[18px] font-semibold text-themeGray-900`}
                >
                  Actions
                </div>
                {renderActions()}
              </>
            )}
            {mainAction && Object.entries(mainAction)?.length > 0 && (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    mainAction?.onClick(detailsId);
                  }}
                  classNames={`w-fit ${
                    mainAction?.classNames ? mainAction?.classNames : ""
                  }
                        `}
                >
                  {mainAction.children}
                </Button>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  const renderActions = () => {
    return (
      <div className="flex flex-wrap gap-3">
        {subActions?.map((item, index) => (
          <Button
            key={index}
            variant="secondary"
            classNames="w-fit whitespace-nowrap"
            onClick={item.onClick}
          >
            {item.children}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      {searchKey && (
        <div className="flex justify-start items-center mt-2 mb-2">
          <input
            type="text"
            placeholder={`Search by ${searchKey}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-themeGray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <div
        className={`w-full max-w-full overflow-x-auto rounded-[20px] ${className}`}
      >
        <table
          className={`${
            headerSticky && "relative"
          } w-full text-left rounded-[20px] divide-y divide-themeGray-200 bg-themeWhite-900 border-collapse ${tableClasses}`}
        >
          <thead
            className={`${headerSticky && "sticky top-0"} bg-themeGray-50`}
          >
            <tr>
              {columns
                .filter((column) => column.isVisible)
                .map((col, ci) => (
                  <th
                    key={ci}
                    scope="col"
                    className={`w-max whitespace-nowrap ${thPadding} title-small font-normal text-themeGray-500 ${
                      col.className ?? ""
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-themeGray-200">
            {rows && rows?.length === 0 ? (
              <tr>
                <td
                  className={`text-center text-themeGray-500 ${tdPadding}`}
                  colSpan={visibleColumnsLength}
                >
                  {fallbackText}
                </td>
              </tr>
            ) : (
              filteredRows.map((row, ri) => (
                <Fragment
                  key={rowKey ? rowKey(row, ri) : defaultRowKey(row, ri)}
                >
                  <tr
                    key={rowKey ? rowKey(row, ri) : defaultRowKey(row, ri)}
                    className={`${
                      isExpandable && ri + 1 === hoveredRowId
                        ? "rounded-[10px] border-none"
                        : ""
                    }`}
                    onMouseOver={() => {
                      setHoveredRowId(ri + 1);
                    }}
                    onMouseLeave={() => {
                      setHoveredRowId(null);
                    }}
                    onClick={() => {
                      if (row?.onClick) {
                        row?.onClick(row);
                      }
                      return;
                    }}
                  >
                    {columns
                      .filter((column) => column.isVisible)
                      .map((col, ci) => {
                        if (col.cell) {
                          return (
                            <td
                              key={ci}
                              className={`${tdPadding} ${tdDefaultStyling} ${
                                isExpandable && ri + 1 === hoveredRowId
                                  ? ""
                                  : ""
                              } ${col.className ?? ""}`}
                            >
                              {col.cell(row, ri)}
                            </td>
                          );
                        }

                        const accessor = col.accessor as string | undefined;
                        const rawValue = accessor
                          ? (row as any)[accessor]
                          : undefined;

                        //rendering renderable values

                        if (isReactNode(rawValue)) {
                          return (
                            <td
                              key={ci}
                              className={`${tdPadding} ${tdDefaultStyling} truncate ${
                                isExpandable && ri + 1 === hoveredRowId
                                  ? ""
                                  : ""
                              } ${col.className ?? ""}`}
                              title={
                                typeof rawValue === "string" ? rawValue : ""
                              }
                            >
                              {(rawValue as ReactNode) || "---"}
                            </td>
                          );
                        }

                        //fallback for values that could trigger rendering errors
                        const safe =
                          rawValue === null || rawValue === undefined
                            ? ""
                            : String(rawValue);

                        return (
                          <td
                            key={ci}
                            className={`${tdPadding} ${tdDefaultStyling} truncate ${
                              isExpandable && ri + 1 === hoveredRowId ? "" : ""
                            } ${col.className ?? ""}`}
                            title={typeof rawValue === "string" ? rawValue : ""}
                          >
                            {safe}
                          </td>
                        );
                      })}
                  </tr>
                  {isExpandable && renderRowDetailsAndActions(ri, row.id)}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
