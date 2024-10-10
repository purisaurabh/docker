import React, { useState, useEffect } from "react";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string; // Add mobile field
}

interface Props {}

const App: React.FC<Props> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // New state for mobile
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/list");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      profiles: {
        name,
        email,
        mobile
      }
    };

    if (isEditing) {
      try {
        const response = await fetch(
          `http://localhost:8080/profile_update/${editingUser?.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData) // Use the new structure
          }
        );
        const data = await response.json();
        setUsers(
          users.map((user) => (user.id === editingUser?.id ? data : user))
        );
        setIsEditing(false);
        setEditingUser(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData) // Use the new structure
        });
        const data = await response.json();
        setUsers([...users, data]);
      } catch (error) {
        console.error(error);
      }
    }
    setName("");
    setEmail("");
    setMobile(""); // Reset mobile
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/profile_delete/${id}`, {
        method: "DELETE"
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user: User) => {
    setIsEditing(true);
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile); // Set mobile for editing
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CRUD App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)} // Handle mobile input
          placeholder="Mobile Number"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <div className="flex justify-between">
              <span>
                {user.name} ({user.email}) - {user.mobile}{" "}
                {/* Display mobile */}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
