import './Add.css';
import { useState } from 'react';
import { addUserDetails } from '../API/API';
import { checkValidData } from '../Utils/Validate';

function Add() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('user');
  const [output, setOutput] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [mobileErr, setMobileErr] = useState('');

  const handleSubmit = async () => {
    if (!username) return setOutput("*Username is required");
    if (!name) return setOutput("*Name is required");
    if (!email) return setOutput("*Email is required");
    if (!password) return setOutput("*Password is required");
    if (!mobile) return setOutput("*Mobile is required");
    if (!address) return setOutput("*Address is required");
    if (!dateOfBirth) return setOutput("*Date of birth is required");
    if (!role) return setOutput("*Role is required");
    if (!password) return setOutput("*Password is required");

    const message = checkValidData(email);
    setOutput(message);
    if (message) return;

    const userDetails = { username, name, email, "phone_number": mobile, password, address, date_of_birth: dateOfBirth, role };

    const clearForm = () => {
      setUsername('');
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setAddress('');
      setDateOfBirth('');
      setRole('user');
    };

    try {
      const result = await addUserDetails(userDetails);
      if (result.status === true) {
        setOutput("User data add successfully...");
        clearForm();
      } else {
        setOutput("User Data add failed...");
      }
    } catch (error) {
      console.error(error);
      const err = error.response?.data?.status || "";

      if (err.includes("email")) {
        setEmailErr("Email Id is incorrect");
      }
      if (err.includes("password")) {
        setPasswordErr("Password must be greater than 5 and less than 10 characters.");
      }
      if (err.includes("mobile")) {
        setMobileErr("Mobile number must be 10 digits.");
      }
      setOutput("User Registration Failed...");
    }
  };

  return (
    <>
      <section className="section">
        <div className="container-add">
          <h1 className="output-message">{output}</h1>
          <h2 className='h2-add'>Add User</h2>
          <form className="add-form">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email</label>
            <span className="error-message-add">{emailErr}</span>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <span className="error-message-add">{passwordErr}</span>
            <input
              type="password"
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
            <span className="error-message-add">{mobileErr}</span>
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
    </>
  );
}

export default Add;
