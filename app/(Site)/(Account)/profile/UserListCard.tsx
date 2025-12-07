import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { User } from "../../UtilClasses/Types";
import UserInfoCard from "./UserInfoCard";

export default function UserListCard({
  title,
  users,
  linkToFullPage,
  getUserRole,
}: {
  title: string;
  users: User[];
  linkToFullPage: string;
  getUserRole: (user: User) => string;
}) {
  return (
    <Card className="w-25">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup>
          {users.map(
            (user: User, index: number) =>
              index < 5 && (
                <ListGroupItem
                  key={user._id}
                  action
                  href={`/profile/${user._id}`}
                >
                  <UserInfoCard
                    username={user.username}
                    role={getUserRole(user)}
                  />
                </ListGroupItem>
              )
          )}
        </ListGroup>
        {users.length > 5 && (
          <Button variant="primary" href={linkToFullPage}>
            See more
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
