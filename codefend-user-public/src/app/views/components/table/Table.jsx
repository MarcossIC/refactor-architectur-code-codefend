import React, { useState, useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import "./table.scss";

const controlFields = ({ fieldsToHideOnMobile, table }) => {
  const [hideFields, setHideFields] = useState(false);

  const triggerFieldsVisibility = (fieldsHide) => {
    if (!fieldsToHideOnMobile || fieldsToHideOnMobile.length === 0) return;

    const fields = table.getAllLeafColumns();
    const fieldsToHide = fields.filter((field) =>
      fieldsToHideOnMobile.includes(field.id)
    );
    if (fieldsHide) {
      fieldsToHide.forEach((field) => field.toggleVisibility());
    }
    if (!fieldsHide) {
      fieldsToHide.forEach(
        (field) => field.getIsVisible() === false && field.toggleVisibility()
      );
    }
  };

  const onHideFields = (event) => {
    let currentHideNav = window.innerWidth <= 760;
    if (currentHideNav && !hideFields) {
      setHideFields(currentHideNav);
      triggerFieldsVisibility(true);
    }
    if (!currentHideNav && hideFields) {
      setHideFields(false);
      triggerFieldsVisibility(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onHideFields);

    return () => {
      window.removeEventListener("resize", onHideFields);
    };
  }, []);
};

const Table = ({
  data,
  columns,
  fieldsToHideOnMobile,
  sortBy,
  setSelectedNow,
  selectedNow,
  maxHeight,
}) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    get data() {
      return data;
    },
    get columns() {
      return columns;
    },
    state: {
      get sorting() {
        return sorting;
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
  });

  controlFields({ fieldsToHideOnMobile, table });

  useEffect(() => {
    if (sortBy && selectedNow) {
      const headerGroups = table.getHeaderGroups();
      const headers = headerGroups.map((headerGroup) => headerGroup.headers);
      const selectedSortField = headers[0].find(
        (header) => header.id === sortBy
      );
      setSelectedNow(false);
      selectedSortField.column.toggleSorting();
    }
  }, []);

  return (
    <div
      className={`table-wrapper max-w-full ${maxHeight && "h-full max-h-full"}`}
    >
      <div className="table-title-header">{children}</div>

      <div className="overflow-auto h-full">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                <tr>
                  {headerGroup.headers.map((header) => (
                    <>
                      <th>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    </>
                  ))}
                </tr>
              </>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <>
                <tr>
                  {row.getVisibleCells().map((cell) => (
                    <>
                      <td>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    </>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
