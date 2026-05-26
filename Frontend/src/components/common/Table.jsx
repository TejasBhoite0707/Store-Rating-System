import {
  useState,
} from "react";

const Table = ({
  columns,
  data,
}) => {
  const [sortKey, setSortKey] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [
    ...data,
  ].sort((a, b) => {
    if (!sortKey) return 0;

    const valueA =
      a[sortKey];
    const valueB =
      b[sortKey];

    if (
      typeof valueA ===
        "string" &&
      typeof valueB ===
        "string"
    ) {
      return sortOrder ===
        "asc"
        ? valueA.localeCompare(
            valueB
          )
        : valueB.localeCompare(
            valueA
          );
    }

    return sortOrder ===
      "asc"
      ? valueA - valueB
      : valueB - valueA;
  });

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            {columns.map(
              (column) => (
                <th
                  key={
                    column.key
                  }
                  onClick={() =>
                    column.sortable &&
                    handleSort(
                      column.key
                    )
                  }
                  className={`p-3 text-left ${
                    column.sortable
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {
                      column.title
                    }

                    {column.sortable &&
                      sortKey ===
                        column.key && (
                        <span>
                          {sortOrder ===
                          "asc"
                            ? "↑"
                            : "↓"}
                        </span>
                      )}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {sortedData.length ===
          0 ? (
            <tr>
              <td
                colSpan={
                  columns.length
                }
                className="p-6 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          ) : (
            sortedData.map(
              (row) => (
                <tr
                  key={row.id}
                  className="border-t"
                >
                  {columns.map(
                    (
                      column
                    ) => (
                      <td
                        key={
                          column.key
                        }
                        className="p-3"
                      >
                        {column.render
                          ? column.render(
                              row
                            )
                          : row[
                              column
                                .key
                            ]}
                      </td>
                    )
                  )}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;