import React from "react";
import { Button, Input } from "@material-tailwind/react";
const SearchBar = () => {
  const [search, setSearch] = React.useState("");
  const onChange = ({ target }) => setSearch(target.value);

  return (
    <div className="relative flex w-auto sm:w-full md:w-full my-2">
      <Input
        type="text"
        label="Search"
        // placeholder="Search Blogs"
        value={search}
        onChange={onChange}
        className="pr-20"
        color="light-blue"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={search ? "indigo" : "blue-gray"}
        disabled={!search}
        className="!absolute right-1 top-1 rounded"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
