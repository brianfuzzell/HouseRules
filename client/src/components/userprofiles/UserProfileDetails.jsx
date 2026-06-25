import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getUserProfileById } from "../../managers/userProfileManager";
import { useParams } from "react-router-dom";

export const UserProfileDetails = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
  }, [id]);

  if (userProfile === null) return <p>User not found.</p>;

  return (
    <>
      <h2>User Details</h2>
      <Card>
        <CardBody>
          <CardTitle tag="h4">
            {userProfile.firstName} {userProfile.lastName}
          </CardTitle>
          <p>{userProfile.email}</p>
          <p>{userProfile.address}</p>
          <CardTitle tag="h6">Current Chores</CardTitle>
          <ul>
            {userProfile.choreNames.map((up, index) => (
              <li key={index}>{up}</li>
            ))}
          </ul>
          <CardTitle tag="h6">Completed Chores</CardTitle>
          <ul>
            {userProfile.completedChores.map((chore, index) =>
                <li key={index}>{chore.name} - Completed: {new Date(chore.completedOn).toLocaleDateString('en-US',
                    { 
                        month: '2-digit', 
                        day: '2-digit', 
                        year: 'numeric', 
                        timeZone: 'UTC'
                    }
                )}
                </li>
            )}
          </ul>
        </CardBody>
      </Card>
    </>
  );
};
