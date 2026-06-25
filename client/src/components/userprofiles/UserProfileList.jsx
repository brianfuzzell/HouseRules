import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getUserProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export const UserProfileList = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getUserProfiles().then(setUserProfiles);
  }, []);

  return (
    <>
      <h2>User Profiles</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((up) => (
            <tr key={up.id}>
              <td scope="row">{`${up.firstName} ${up.lastName}`}</td>
              <td>{up.email}</td>
              <td>{up.address}</td>
              <td>
                <Link to={`/userprofiles/${up.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
