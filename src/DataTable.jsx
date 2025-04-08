import { useEffect } from "react";
import { useState } from "react";
import users from "./data/users.json";
import "./dataTable.css";

export default function DataTable({
  currentPage,
  setCurrentPage,
  pageOptions,
  setPageOptions,
}) {
  let lengthOfUsers = users.length;
  const calculateTotalPages = () => {
    return Math.ceil(lengthOfUsers / itemsPerPage);
  };
  const [message, setMessage] = useState("Data Table");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(calculateTotalPages);
  const [data, setData] = useState(users);
  const [sortOrder, setSortOrder] = useState("asc");
  const headerInformation = [
    { label: "ID", key: "id", type: "number" },
    { label: "Name", key: "name", type: "string" },
    { label: "Age", key: "age", type: "number" },
    { label: "Occupation", key: "occupation", type: "string" },
  ];

  const startPoint = (currentPage - 1) * itemsPerPage;
  const endPoint = Number(startPoint) + Number(itemsPerPage);

  const handleUserSelection = (event) => {
    setItemsPerPage(event.target.value);
    setTotalPages(Math.ceil(lengthOfUsers / event.target.value));
    setCurrentPage(1);
  };

  const handleNextClick = (event) => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = (event) => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    console.log("startPoint", startPoint);
    console.log("endPoint", endPoint);
  });

  const sortByHeader = (e, headerKey) => {
    console.log("headerKey ", headerKey);
    // console.log(
    //   "type of",
    //   headerInformation.find(
    //     (header) => header.key === headerKey && header.type
    //   )
    // );
    const typeOfHeader = headerInformation.find(
      (header) => header.key === headerKey && header.type
    );
    console.log("typeOfHeader.type", typeOfHeader.type);

    setData((prev) => {
      if (typeOfHeader.type == "number") {
        return prev.sort((eachUserA, eachUserB) => {
          console.log("eachUserA", eachUserA);
          console.log("eachUserA[headerKey]", eachUserA[headerKey]);
          // // return positive value if a is less that b (asc)
          // if (eachUserA[headerKey] < eachUserB[headerKey]) return 1;
          // // return negative value if a is greater than b
          // if (eachUserA[headerKey] > eachUserB[headerKey]) return -1;
          // // a must be equal to b
          // return 0;
          return sortOrder === "asc"
            ? eachUserA[headerKey] - eachUserB[headerKey]
            : eachUserB[headerKey] - eachUserA[headerKey];
        });
      }

      return prev.sort((a, b) =>
        sortOrder === "asc"
          ? a[headerKey].localeCompare(b[headerKey])
          : b[headerKey].localeCompare(a[headerKey])
      );
    });
    setSortOrder("desc");
  };

  return (
    <div>
      <h1>{message}</h1>
      <table>
        <thead>
          <tr>
            {headerInformation.map(({ label, key }) => (
              <th
                key={key}
                onClick={(e) => sortByHeader(e, label.toLocaleLowerCase())}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .slice(startPoint, endPoint)
            .map(({ id, name, age, occupation }) => (
              <tr key={id} className="tableRow">
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{occupation}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <select onChange={handleUserSelection}>
        {pageOptions.map((eachOption) => {
          return <option value={eachOption}>{`Show ${eachOption}`}</option>;
        })}
      </select>
      <button
        className={currentPage === 1 ? "inactiveButton" : "button"}
        onClick={handlePrevClick}
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        className={currentPage === totalPages ? "inactiveButton" : "button"}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}
