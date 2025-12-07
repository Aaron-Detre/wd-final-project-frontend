"use client";
import { useSearchParams } from "next/navigation";
import SearchResultsPage from "./SearchResultsPage";
import DefaultSearchPage from "./DefaultSearchPage";
import "./searchStyles.css";

export default function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("criteria");

  return search ? <SearchResultsPage /> : <DefaultSearchPage />;
}
