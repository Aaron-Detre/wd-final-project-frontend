import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function Title() {
  const { title } = useSelector((state: RootState) => state.title);
  return <span className="wdf-header fs-1">{title}</span>;
}
