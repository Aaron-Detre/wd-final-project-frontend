import { FaRegUser } from "react-icons/fa";
import "./infoCardStyles.css";

export default function UserInfoCard({
  username,
  role,
}: {
  username: string;
  role: string;
}) {
  return (
    <div className="wdf-info-card">
      <div className="wdf-info-card-image">
        <FaRegUser className="wdf-info-card-image-icon" />
      </div>
      <div className="wdf-info-card-body">
        <div>
          <span className="wdf-info-card-body-header">{username}</span>
        </div>
        <div>
          <span className="wdf-info-card-body-text">{role}</span>
        </div>
      </div>
    </div>
  );
}
