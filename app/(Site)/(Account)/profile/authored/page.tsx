"use client";
import { setTitle } from "@/app/(Site)/reducer";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import * as userClient from "../../../Clients/userClient";
import { useEffect, useState } from "react";

export default function AuthoredRecipes() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const authorId = searchParams.get("id");
  const [author, setAuthor] = useState<any>(null);

  const fetchAuthor = async () => {
    if (authorId !== null) {
      const user = await userClient.getUserById(authorId);
      setAuthor(user);
      dispatch(setTitle(`Recipes by ${user.username}`));
    } else {
      dispatch(setTitle("Recipes"));
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  return <h1>TODO</h1>;
}
