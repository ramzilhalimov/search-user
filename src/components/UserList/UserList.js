import React, { useState } from "react";
import { UserDetails } from "../UserDetails/UserDetails";
import * as S from "./UserListStyle";

export function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (sortBy === "repositories") {
      return sortOrder === "asc"
        ? a.repositories - b.repositories
        : b.repositories - a.repositories;
    }

    return 0;
  });

  return (
    <div>
      <S.ContentPlaylist>
        <div>
          <button onClick={() => handleSort("repositories")}>
            Sort by Repositories{" "}
            {sortBy === "repositories" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
        </div>
        <ul>
          {sortedUsers.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.login}
            </li>
          ))}
        </ul>
      </S.ContentPlaylist>
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
