// src/services/redditApi.js
const BASE_URL = 'https://www.reddit.com';

// src/services/redditApi.js
const cache = new Map();

export const fetchPosts = async (query) => {
  if (cache.has(query)) {
    return cache.get(query);
  }

  try {
    const response = await fetch(`${BASE_URL}/search.json?q=${query}`);
    const data = await response.json();
    const posts = data.data.children.map(child => child.data);
    cache.set(query, posts);
    return posts;
  } catch (error) {
    if (cache.has(query)) {
      return cache.get(query);
    }
    throw new Error('Failed to fetch posts');
  }
};
