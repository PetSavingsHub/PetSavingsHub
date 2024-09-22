"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPaw } from "react-icons/fa";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your search logic here
    if (searchQuery.trim()) {
      // Redirect to the /search page with the query parameter
      router.push(`/search?name=${encodeURIComponent(searchQuery)}`);
    }

  };
  return (
    <form onSubmit={handleSearch}>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FaPaw className="h-5 w-5 fill-slate-300"/>
        </span>
        <input 
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm" 
          placeholder="Search" 
          type="text" 
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
    </form>
  )
}