import { useState, useEffect } from "react";
import userService, { User} from "../services/user-service";
import { CanceledError } from '../services/api-client';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<any>();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoader(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err);
        setLoader(false);
      });

    return () => cancel();
  }, []);

  return { users, error, loader, setUsers, setError };
}

export default useUsers;