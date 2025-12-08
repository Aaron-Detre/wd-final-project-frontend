/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const onSearchQueryChanges = (e: any) => setQuery(e.target.value);
  const searchRoute = `/search?criteria=${query}`;
  const handleKeyDown = (e: any) =>
    e.key === "Enter" && router.push(searchRoute);

  return (
    <div className="wdf-search-bar">
      <InputGroup className="me-2">
        <InputGroupText>
          <FaMagnifyingGlass />
        </InputGroupText>
        <FormControl
          placeholder="Search For Recipes"
          onChange={onSearchQueryChanges}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      <Button
        className="wdf-search-button"
        onClick={async () => router.push(searchRoute)}
      >
        Search
      </Button>
    </div>
  );
}
