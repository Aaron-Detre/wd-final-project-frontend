import { redirect } from "next/dist/client/components/navigation";
import "./styles.css";

export default function Site() {
  redirect("/home");
}
