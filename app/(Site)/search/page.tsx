"use client";
import { useSearchParams } from "next/navigation";
import SearchResultsPage from "./SearchResultsPage";
import DefaultSearchPage from "./DefaultSearchPage";
import "./searchStyles.css";
import { useDispatch } from "react-redux";
import { setTitle } from "../reducer";
import { useEffect } from "react";

export default function Search() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Search"));
  }, [dispatch]);

  const searchParams = useSearchParams();
  const search = searchParams.get("criteria");

  return search ? <SearchResultsPage /> : <DefaultSearchPage />;
}
