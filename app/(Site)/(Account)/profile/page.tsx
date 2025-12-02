"use client";
import Link from "next/link";
import { HiCog } from "react-icons/hi2";
import FlexGap from "../../UtilClasses/FlexGap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.account);
  const username = currentUser?.username ?? "Sign in to see your profile";
  const role = currentUser?.role ?? "";
  return (
    <div>
      <div className="wdf-profile-header d-flex">
        <h1 className="me-2">{username}</h1>
        <h4>{role}</h4>
        <FlexGap />
        <Link
          href="/profile/settings"
          className="d-flex wdf-text-decoration-none text-black align-items-center me-3"
        >
          <HiCog className="fs-1" /> <h4>Settings</h4>
        </Link>
      </div>
      <div className="wdf-profile-body"></div>
    </div>
  );
}
