"use client";
import Link from "next/link";
import { HiCog } from "react-icons/hi2";
import FlexGap from "../../UtilClasses/FlexGap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserListCard from "./UserListCard";
import { User } from "../../UtilClasses/Types";
import * as userClient from "../../Clients/userClient";
import { useEffect, useState } from "react";
import RecipeListCard from "./RecipeListCard";
import { redirect, usePathname } from "next/navigation";
import ReviewListCard from "./ReviewListCard";
import { Button } from "react-bootstrap";

const getUserRole = (user: User): string => {
  let displayRole: string;
  switch (user.role) {
    case "BOTH":
      displayRole = "Recipe Author and Reviewer";
      break;
    case "AUTHOR":
      displayRole = "Recipe Author";
      break;
    case "REVIEWER":
      displayRole = "Recipe Reviewer";
      break;
    default:
      displayRole = "";
  }
  return displayRole;
};
const getUserFollowing = (userId: string) =>
  userClient.getUserFollowing(userId);
const getUserFollowers = (userId: string) =>
  userClient.getUserFollowers(userId);
// const getUserSavedRecipes = (): Recipe[] => {
//
// }
const getUserAuthoredRecipes = (userId: string) =>
  userClient.getUserAuthoredRecipes(userId);
const getUserReviews = (userId: string) => userClient.getUserReviews(userId);

//TODO: duplication
const showAuthoredRecipes = (user: User | null): boolean =>
  user !== null && user.role !== "REVIEWER";
const showReviewedRecipes = (user: User | null): boolean =>
  user !== null && user.role !== "AUTHOR";

export default function ProfilePage() {
  const pathname = usePathname().split("/");
  const lastPathTerm = pathname.at(pathname.length - 1);
  const isYourProfile = lastPathTerm === "profile";
  const { currentUser } = useSelector((state: RootState) => state.account);
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [authored, setAuthored] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [doesCurrentUserFollowProfile, setDoesCurrentUserFollowProfile] =
    useState(false);

  const fetchUserById = async (userId: string) => {
    const user = await userClient.getUserById(userId);
    setUserDetails(user);
    if (currentUser) {
      updateFollowingProfile(currentUser._id, user._id);
    }
  };
  const setUserDetails = (user: any) => {
    setProfile(user);
    setUsername(user.username);
    setRole(getUserRole(user));
    getUserFollowing(user._id).then(setFollowing);
    getUserFollowers(user._id).then(setFollowers);
    getUserAuthoredRecipes(user._id).then(setAuthored);
    getUserReviews(user._id).then(setReviews);
  };

  useEffect(() => {
    if (isYourProfile && currentUser) {
      setUserDetails(currentUser);
    } else if (!isYourProfile) {
      if (currentUser?._id === lastPathTerm) {
        redirect("/profile");
      }
      fetchUserById(lastPathTerm as string);
    }
  }, [currentUser, isYourProfile]);

  const addSIfNotOneItemInArray = (array: any[]): string =>
    array.length !== 1 ? "s" : "";
  const addSIfOneItemInArray = (array: any[]): string =>
    array.length === 1 ? "s" : "";
  const usernameOrYou = () => (isYourProfile ? "You" : username);
  const getFollowingCardTitle = () =>
    `${usernameOrYou()} Follow${isYourProfile ? "" : "s"} ${
      following.length
    } User${addSIfNotOneItemInArray(following)}`;
  const getFollowersCardTitle = () =>
    `${followers.length} User${addSIfNotOneItemInArray(
      followers
    )} Follow${addSIfOneItemInArray(followers)} ${usernameOrYou()}`;
  const getAuthoredCardTitle = () =>
    `${authored.length} Recipe${addSIfNotOneItemInArray(authored)} Authored`;
  const getReviewsCardTitle = () =>
    `${reviews.length} Recipe${addSIfNotOneItemInArray(reviews)} Reviewed`;

  const updateFollowingProfile = async (userId: string, profileId: string) => {
    const followingProfiles = await userClient.getUserFollowing(userId);
    const followingIds = followingProfiles.map((profile: User) => profile._id);
    console.log(JSON.stringify(followingIds));
    setDoesCurrentUserFollowProfile(followingIds.includes(profileId));
  };
  const followProfile = async () => {
    if (currentUser && profile && !isYourProfile) {
      await userClient.followUser(currentUser._id, profile._id);
      updateFollowingProfile(currentUser._id, profile._id);
    }
  };
  const unfollowProfile = async () => {
    if (currentUser && profile && !isYourProfile) {
      await userClient.unfollowUser(currentUser._id, profile._id);
      updateFollowingProfile(currentUser._id, profile._id);
    }
  };

  return (
    <div className="ms-3">
      <div className="wdf-profile-header d-flex align-items-baseline">
        <h1 className="me-2">
          {username !== "" ? username : "Sign in to see your profile"}
        </h1>
        <h2 className="fs-5 wdf-text-decoration-none wdf-text-dark-gray">
          {role}
        </h2>
        {!isYourProfile &&
          (doesCurrentUserFollowProfile ? (
            <Button onClick={unfollowProfile}>Unfollow</Button>
          ) : (
            <Button onClick={followProfile} disabled={!currentUser}>
              Follow
            </Button>
          ))}
        <FlexGap />
        {isYourProfile && (
          <Link
            href="/settings"
            className="d-flex wdf-text-decoration-none text-black align-items-center me-3"
          >
            <HiCog className="fs-1" /> <h4>Settings</h4>
          </Link>
        )}
      </div>
      {profile && (
        <div className="wdf-profile-body">
          <UserListCard
            title={getFollowingCardTitle()}
            users={following}
            linkToFullPage="/profile/following"
            getUserRole={getUserRole}
          />
          <UserListCard
            title={getFollowersCardTitle()}
            users={followers}
            linkToFullPage="/profile/followers"
            getUserRole={getUserRole}
          />
          {showAuthoredRecipes(profile) && (
            <RecipeListCard
              title={getAuthoredCardTitle()}
              recipes={authored}
              linkToFullPage="/profile/authored"
            />
          )}
          {showReviewedRecipes(profile) && (
            <ReviewListCard
              title={getReviewsCardTitle()}
              reviews={reviews}
              linkToFullPage="/profile/reviewed"
            />
          )}
        </div>
      )}
    </div>
  );
}
