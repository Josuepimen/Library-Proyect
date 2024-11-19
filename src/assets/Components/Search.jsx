import React, { useState } from "react";
import { GiBookmarklet } from "react-icons/gi";
import './styles.css'; 

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
    <div className="max-w-2xl mx-auto p-6 bg-slate-400  rounded-lg shadow-lg relative top-10">
      <GiBookmarklet className="w-8 h-8 text-black" />
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Search for Books</h1>
      <form className="flex mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          className="flex-1 p-3 border border-gray-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          required
        />
        <button
          type="submit"
          className="px-6 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {results.length > 0 && (
        <div className="max-h-80 overflow-y-auto">
          <ul className="space-y-4">
            {results.map((book) => (
              <li
                key={book.key}
                className="p-4 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 hover:scale-90 transition duration-300 transform"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {book.title}
                </h2>
                <p className="text-gray-600">
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