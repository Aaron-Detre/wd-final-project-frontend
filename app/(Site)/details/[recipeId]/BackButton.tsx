import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function BackButton() {
  const goBack = () => {
    console.log("HERE");
    history.back();
  };
  return (
    <IoChevronBackCircleOutline
      onClick={goBack}
      className="fs-1 me-2 wdf-cursor-pointer"
    />
  );
}
