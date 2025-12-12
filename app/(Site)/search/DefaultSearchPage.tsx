import SearchBar from "./SearchBar";

export default function DefaultSearchPage({
  placeholder,
}: {
  placeholder: string;
}) {
  return (
    <div className="wdf-search-default-page">
      <SearchBar placeholder={placeholder} />
    </div>
  );
}
