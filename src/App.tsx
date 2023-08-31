import "bootstrap/dist/css/bootstrap.css";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

const example_user = {
  id: 0,
  name: "Richa Verma",
};

function App() {
  const { users, error, loader, setUsers, setError } = useUsers();

  const deleteUser = (id: number) => {
    const originalUsers = [...users];
    setUsers(
      users.filter((user) => {
        return user.id !== id;
      })
    );
    userService.delete(id).catch((err) => {
      setError(err);
      setUsers(originalUsers);
    });
  };

  const addUser = (user: User) => {
    const originalUsers = [...users];
    setUsers([user, ...users]);
    userService
      .create(user)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err);
        setUsers([...originalUsers]);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((err) => {
      setError(err);
      setUsers([...originalUsers]);
    });
  };

  return (
    <div className="App">
      {loader && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error.message}</p>}
      <button
        className="btn btn-primary mb-3"
        onClick={() => addUser(example_user)}
      >
        Add
      </button>
      <ul className="list-group w-25">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            {"  "}
            <div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
