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

  return (
    <div>
      <h1>{message}</h1>
      <table>
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
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
