import { fetchUserByid, updateUserDetails } from '../API/API';
import './UpdateUser.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateUser() {
  const params = useParams();
  const [username, setUsername] = useState('');
  const [output, setOutput] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(params)
        const result = await fetchUserByid(params.id);
        console.log(result)
        const user = result[0];
        setUsername(user.username);
        setName(user.name);
        setEmail(user.email);
        setMobile(user.phone_number);
        setAddress(user.address);
        setDateOfBirth(user.date_of_birth);
        setRole(user.role);
        setPassword(user.password);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await updateUserDetails(params.id, username, name, email,mobile, password, address,dateOfBirth, role);
      setOutput("User edited successfully...");
    } catch (error) {
      setOutput("User not changed, please try again...");
    }
  };

  return (
    <section className="section">
      <div className="container-update">
        <h1 className="output-message">{output}</h1>
        <h2 className='h2-update'>Update User</h2>
        <form className="update-form">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            placeholder="Enter Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label>Address</label>
          <textarea
            rows="3"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <label>Mobile</label>
          <input
            type="text"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label>Role</label>
          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateUser;
