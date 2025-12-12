import { Image } from "react-bootstrap";
import { GiKnifeFork } from "react-icons/gi";
import "./infoCardStyles.css";

export default function ReviewInfoCard({
  title,
  img,
  vertical,
  text,
}: {
  title: string;
  img?: string;
  vertical?: boolean;
  text: string;
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
        <p className="wdf-color-black">{text}</p>
      </div>
    </div>
  );
}
