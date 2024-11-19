import React, { useState } from "react";
import { GiBookmarklet } from "react-icons/gi";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&fields=key,title,author_name,editions`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setResults(data.docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-300 rounded-lg shadow-md relative top-10">
      <GiBookmarklet className="w-8 h-8" />
      <h1 className="text-2xl font-bold text-center mb-4">Search for Books</h1>
      <form className="flex mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          required
        />

        <button
          type="submit"
          className="px-6 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {results.length > 0 && (
        <div className="max-h-80 overflow-y-auto">
          {" "}
          {/* Contenedor para habilitar scroll */}
          <ul className="space-y-4">
            {results.map((book) => (
              <li
                key={book.key}
                className="p-4 border border-gray-300 rounded-md bg-gray-50 hover:bg-slate-200 hover:scale-105 transition duration-200 transform cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-blue-600">
                  {book.title}
                </h2>
                <p className="text-gray-700">
                  Author:{" "}
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Unknown Author"}
                </p>
                {book.editions && book.editions.docs.length > 0 && (
                  <div className="mt-2">
                    <h3 className="font-medium">Available Editions:</h3>
                    <ul className="list-disc list-inside">
                      {book.editions.docs.map((edition) => (
                        <li key={edition.key} className="text-gray-600">
                          {edition.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
