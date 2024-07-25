const API_URL = 'https://www.reddit.com/r/popular.json';

export const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API response:', data); // Log the response
    // Extract posts from the data structure
    const posts = data.data.children.map(child => {
      const { id, title, url, selftext, thumbnail } = child.data;
      return {
        id,
        title,
        url,
        selftext,
        thumbnail: thumbnail === 'self' || thumbnail === 'default' ? null : thumbnail
      };
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
