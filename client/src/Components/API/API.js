import axios from 'axios';
import { apiUrlUser } from '../../api_url';

//add User
export const addUserDetails = async (userDetails) => {
    try {
        const response = await axios.post(`${apiUrlUser}add`, userDetails);
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

//retrieve User
export const fetchUserByid = async (id) => {
    try {
        var condition_obj = { "_id": id };
        const response = await axios.get(`${apiUrlUser}user_retrieve`, { params: { condition_obj: condition_obj } });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

//list User
export const listUserDetails = async (search, sortOrder, sortBy, page, limit) => {
    try {
        const response = await axios.get(`${apiUrlUser}users_list`, { params: { search, sortOrder, sortBy, page, limit } });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

//delete User
export const deleteUserDetails = async (id) => {
    const delete_details = { data: { _id: id } };
    try {
        const response = await axios.delete(`${apiUrlUser}delete`, delete_details);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//update User
export const updateUserDetails = async (_id, username, name, email, mobile, password, address, dateOfBirth, role) => {
    var userDetails = { "condition_obj": { "_id": _id }, "content_obj": { "username": username, "name": name, "phone_number": mobile, "password": password, "email": email, "address": address, "date_of_birth": dateOfBirth, "role": role } };
    try {
        const response = await axios.patch(`${apiUrlUser}update`, userDetails);
        return response.data;
    } catch (error) {
        throw error;
    }
};
