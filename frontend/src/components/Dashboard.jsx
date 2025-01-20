import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming Axios for API requests
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/slices/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store?.auth['x-access-token']);
  console.log('token', token);

  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch all registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getAllUsers({ token })); // Replace with your API endpoint
        setUsers(response?.payload);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch, token]);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`/api/users/${userId}/role`, { role: newRole }); // Replace with your API endpoint
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      alert('Role updated successfully');
    } catch (err) {
      alert('Failed to update role');
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Current Role</th>
              <th className="py-3 px-6">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                  } hover:bg-gray-200`}
                >
                  <td className="py-3 px-6 text-gray-700 font-medium">{user.name}</td>
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-gray-700">{user.role}</td>
                  <td className="py-3 px-6">
                    <select
                      className="border border-gray-300 rounded-md py-2 px-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
