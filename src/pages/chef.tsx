import DELETE_ICON from "../assets/delete.svg"
import SORT_ICON from "../assets/sort.svg"
import Button from "../components/button"
import "../components/css/chef.css"
import Modal from "../components/dialog"
import Header from "../components/header"
import LoadingSpinner from "../components/spinner"
import useChefHook from "../hooks/use-chef"

const Chef = () => {
  const {
    handleDelete,
    handleToggle,
    filteredList,
    isLoading,
    handleSort,
    handleSelectChef,
    isDeleting,
    modalToggle,
    setModalToggle,
    mode,
    inputName,
    setInputName,
    handleAddChef,
    isCreating,
  } = useChefHook()

  if (isLoading || isDeleting) return <LoadingSpinner />
  return (
    <div>
      <Header
        title="Manage Chefs"
        button={{
          title: "Add New Chef",
          handleClick: () => handleSelectChef("", "Create"),
        }}
      />
      <div className="chef-table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <div className="d-flex align-items-center gap-2">
                  <span>Full Name</span>
                  <img
                    src={SORT_ICON}
                    alt="sort"
                    width={15}
                    height={15}
                    className="pointer"
                    onClick={handleSort}
                  />
                </div>
              </th>
              <th>Is Admin</th>
              <th>Total Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList?.length > 0 ? (
              filteredList.map((item, idx) => (
                <tr key={item.chefId}>
                  <td>{idx + 1}</td>
                  <td>{item.chefName}</td>
                  <td>
                    <div className="badge">
                      {item.isAdmin ? "Admin Chef" : "Member Chef"}
                    </div>
                  </td>
                  <td>{item.totalOrders}</td>
                  <td>
                    {!item.isAdmin ? (
                      <span className="edit-btn">
                        <img
                          src={DELETE_ICON}
                          alt={"delete-profile"}
                          width={15}
                          height={15}
                          onClick={() =>
                            handleSelectChef(item.chefId, "Delete")
                          }
                        />
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Chef found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Common HOC Modal for Create and Delete */}
      <Modal
        open={modalToggle}
        onClose={() => setModalToggle(false)}
        title={mode === "Delete" ? "Delete Chef" : "Add New Chef"}
        size={"small"}
      >
        {mode === "Delete" ? (
          <div className="delete-wrapper">
            <div>
              Are you sure, Once deleted can't recover and all orders will get
              transfered to admin.
            </div>
            <span>
              <Button
                type="button"
                size="sm"
                color="secondary"
                onClick={handleToggle}
              >
                Close
              </Button>
              <Button type="button" size="sm" onClick={handleDelete}>
                Delete Chef
              </Button>
            </span>
          </div>
        ) : (
          <div>
            <input
              type="text"
              title="chef name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="form-input input"
            />
            <Button
              type="button"
              color="primary"
              size="md"
              className="w-100"
              onClick={handleAddChef}
              disabled={isCreating || inputName === ""}
            >
              Add Chef
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Chef
