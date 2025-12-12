"use client";
import { setTitle } from "@/app/(Site)/reducer";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as userClient from "../../../Clients/userClient";
import { useEffect, useState } from "react";
import RecipeListCard from "../RecipeListCard";
import { RootState } from "@/app/(Site)/store";
import Link from "next/link";

export default function AuthoredRecipes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.account);
  const searchParams = useSearchParams();
  const authorId = searchParams.get("id");
  const [author, setAuthor] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchAuthor = async () => {
    if (authorId !== null) {
      const user = await userClient.getUserById(authorId);
      setRecipes(user.authored);
      setAuthor(user);
      dispatch(setTitle(`Recipes by ${user.username}`));
    } else {
      dispatch(setTitle("Recipes"));
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  const addSIfNotOneItemInArray = (array: any[]): string =>
    array.length !== 1 ? "s" : "";
  const getAuthoredCardTitle = () =>
    `${recipes.length ?? 0} Recipe${addSIfNotOneItemInArray(recipes)} Authored`;

  return (
    <div>
      <h1 className="mb-4">
        <Link href={`/profile/${authorId}`} className="wdf-breadcrumb-link">
          Profile
        </Link>
        {" > Authored Recipes"}
      </h1>
      <RecipeListCard
        title={getAuthoredCardTitle()}
        recipes={recipes}
        setRecipes={setRecipes}
        isYourProfile={currentUser && author && currentUser._id === author._id}
      />
    </div>
  );
}
