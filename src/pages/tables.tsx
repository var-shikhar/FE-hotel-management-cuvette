import CHAIR_ICON from "../assets/chair-2.svg"
import DELETE_ICON from "../assets/delete.svg"
import ADD_ICON from "../assets/plus-icon.svg"
import Button from "../components/button"
import "../components/css/table.css"
import Modal from "../components/dialog"
import Header from "../components/header"
import LoadingSpinner from "../components/spinner"
import useTableHook from "../hooks/use-table"

const TableDashboard = () => {
  const {
    handleAddTable,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
    isLoading,
    tableList,
    handleSelection,
    mode,
    modalToggle,
    setModalToggle,
    inputValues,
    handleInputChange,
    handleUpdateTable,
  } = useTableHook()
  if (isLoading || isDeleting) return <LoadingSpinner />
  return (
    <div>
      <Header title="Tables" />
      <div className="table-wrapper">
        {tableList?.tableData?.map((table) => (
          <div key={table.tableDataID} className="table">
            <span
              className="delete-icon"
              onClick={() => handleSelection(table.tableDataID, "Delete")}
            >
              <img src={DELETE_ICON} alt="delelte" />
            </span>
            <div className="title">{table.tableName}</div>
            <div className="table-no">
              {table.tableNo >= 10 ? table.tableNo : `0${table.tableNo}`}
            </div>

            <div
              className="table-chair"
              onClick={() => handleSelection(table.tableDataID, "Edit")}
            >
              <img src={CHAIR_ICON} alt="edit" />
              {table.totalChairs}
            </div>
          </div>
        ))}
        <div
          className="blank-table"
          onClick={() => handleSelection("", "Create")}
        >
          <img src={ADD_ICON} alt="add" />
        </div>
      </div>
      {/* Common HOC Modal for Create and Delete */}
      <Modal
        open={modalToggle}
        onClose={() => setModalToggle(false)}
        title={
          mode === "Delete"
            ? "Delete Table"
            : mode === "Edit"
            ? "Edit Table Details"
            : "Add New Table"
        }
        size={"small"}
      >
        {mode === "Delete" ? (
          <div className="delete-wrapper">
            <div>
              Are you sure, Once deleted all orders assigned to this table also
              will be deleted.
            </div>
            <span className="btn-grp">
              <Button
                type="button"
                size="sm"
                color="secondary"
                onClick={() => setModalToggle(false)}
              >
                Close
              </Button>
              <Button type="button" size="sm" onClick={handleDelete}>
                Delete Table
              </Button>
            </span>
          </div>
        ) : (
          <div className="table-form">
            <input
              type="text"
              value={inputValues?.tableName}
              placeholder="Table name (optional)"
              name="tableName"
              className="inp-tableName"
              onChange={handleInputChange}
            />
            <input
              type="number"
              value={inputValues?.tableNo}
              placeholder="Table no"
              name="tableNo"
              className="inp-tableNo"
              autoFocus
              onChange={handleInputChange}
            />
            <label className="inp-select-label">
              Chair
              <select
                name="totalChairs"
                value={inputValues?.totalChairs}
                onChange={handleInputChange}
                className="inp-select"
              >
                {Array.from({ length: 21 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
            <Button
              type="button"
              onClick={() => {
                if (mode === "Edit") handleUpdateTable()
                else handleAddTable()
              }}
              disabled={
                isCreating ||
                isUpdating ||
                !inputValues ||
                !inputValues?.tableName ||
                !inputValues?.tableNo ||
                !inputValues?.totalChairs
              }
            >
              {mode === "Edit" ? "Edit Table" : "Create Table"}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default TableDashboard
