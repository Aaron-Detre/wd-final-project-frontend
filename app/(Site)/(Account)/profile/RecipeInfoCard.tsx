import { Image } from "react-bootstrap";
import "./infoCardStyles.css";
import { GiKnifeFork } from "react-icons/gi";

export default function RecipeInfoCard({
  title,
  img,
  vertical,
}: {
  title: string;
  img?: string;
  vertical?: boolean;
}) {
  return (
    <div className={`wdf-info-card ${vertical && "wdf-vertical"}`}>
      <div className="wdf-info-card-image">
        {img ? (
          <Image src={img} className="wdf-info-card-image-thumbnail" />
        ) : (
          <GiKnifeFork className="wdf-info-card-image-thumbnail" />
        )}
      </div>
      <div className="wdf-info-card-body">
        <div className="wdf-info-card-body-header wdf-text-decoration-none">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}
