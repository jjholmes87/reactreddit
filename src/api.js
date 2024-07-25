const API_URL = 'https://www.reddit.com/r/popular.json';

export const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API response:', data);
    const posts = data.data.children.map(child => {
      const { id, title, url, selftext, thumbnail, ups } = child.data;
      return {
        id,
        title,
        url,
        selftext,
        thumbnail: thumbnail === 'self' || thumbnail === 'default' ? null : thumbnail,
        ups
      };
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch comments for a specific post
export const fetchComments = async (postId) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/popular/comments/${postId}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // The comments are in the second element of the array
    return data[1].data.children.map(child => child.data.body);
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

