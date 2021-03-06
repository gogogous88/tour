import axios from "axios";

/**
 * feed apis
 */
export const fetchDiscussions = (forum_id, sortingMethod) => {
  return axios.get(
    `/api/forum/${forum_id}/discussions?sorting_method=${sortingMethod}`
  );
};

export const fetchPinnedDiscussions = forum_id => {
  return axios.get(`/api/forum/${forum_id}/pinned_discussions`);
};

//5a2f313e0a0b184f99ab4b54

//localhost:8080/api/forum/5a319a5c10cea7360a06287d/discussions?sorting_method=date
