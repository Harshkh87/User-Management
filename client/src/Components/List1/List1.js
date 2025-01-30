import { listUserDetails, deleteUserDetails } from '../API/API';
import './List1.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function List() {
  const [alert, setAlert] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [uDetails, setUDetails] = useState([]);
  const [uListErr, setUListErr] = useState('');
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("username");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listUserDetails(search, sortOrder, sortBy, page, limit);
        setUDetails(res.data);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error("Error fetching user list:", error);
        if (uListErr == null) {
          setUListErr("User List is Empty.");
          setTimeout(() => {
            setUListErr('')
          }, 4000);
        }
        setUDetails('');
        setTotalPages(1);
      }
    };
    fetchData();
  }, [trigger, search, sortBy, sortOrder, page, limit]);

  const deleteUser = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await deleteUserDetails(_id);
        setTrigger(!trigger);
        setAlert(toast.success("User deleted successfully."));
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Operation failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div><Toaster /></div>
      <section className="list-section">
        <div className="container-list">
          <h5 className='h5-list'>{uListErr}</h5>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by username"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="username">Username</option>
              <option value="email">Email</option>
              <option value="created_at">Created At</option>
              <option value="updated_at">Updated At</option>
            </select>
            <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select onChange={(e) => setLimit(Number(e.target.value))} value={limit}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page <= 1}>Previous</button>
            <span>Page {page}of {totalPages}</span>
            <button
              onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={page >= totalPages}>
              Next
            </button>
          </div>
          <div className="detail-box">
            <table className="user-table">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>username</th>
                  <th>email</th>
                  <th>name</th>
                  <th>date_of_birth</th>
                  <th>address</th>
                  <th>phone_number</th>
                  <th>role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {uDetails.length > 0 ? (
                  uDetails.map((row) => (
                    <tr key={row._id}>
                      <td>{row._id}</td>
                      <td>{row.username}</td>
                      <td>{row.email}</td>
                      <td>{row.name}</td>
                      <td>{row.date_of_birth}</td>
                      <td>{row.address}</td>
                      <td>{row.phone_number}</td>
                      <td>{row.role}</td>
                      <td>
                        <Link to={`/update/${row._id}`}>
                          <span className="action-link">Update User detail</span>
                        </Link>
                        <br />
                        <span className="delete-link" onClick={() => deleteUser(row._id)}>
                          DELETE
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr style={{ "textAlign": "center" }}>
                    <td colSpan="9">{uListErr || "No users found"}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default List;
