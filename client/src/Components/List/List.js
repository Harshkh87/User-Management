import { listUserDetails, deleteUserDetails } from '../API/API'; 
import './List.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function List() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [uDetails, setUDetails] = useState([]);
  const [uListErr, setUListErr] = useState('');
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listUserDetails({ search, sortBy, sortOrder, page, limit });
        setUDetails(data);
      } catch (error) {
        console.error("Error fetching user list:", error);
        const err = error.response?.data?.status || "Unknown error";
        if (err.includes("Resource not found")) {
          setUListErr("User List is Empty.");
          setTimeout(() => setUListErr(''), 4000);
        }
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
      <section className="admin-section">
        <div className="container-adminManager">
          <h5 className='h5-adminManager'>{uListErr}</h5>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by username or email"
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
            <span>Page {page}</span>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
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
                {uDetails.map((row) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default List;
