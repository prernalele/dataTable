import DataTable from "./DataTable";
import { useState } from "react";

export default function App() {
  const perPageOptions = [5, 10, 20];
  const [currentPage, setCurrentPage] = useState(1);

  const [pageOptions, setPageOptions] = useState(perPageOptions);

  return (
    <div className="containerDiv">
      <DataTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageOptions={pageOptions}
        setPageOptions={setPageOptions}
      />
    </div>
  );
}
