'use client'; // Important: Declare as a client component

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Define Post type
type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // ✅ Use proper typing
  const [loading, setLoading] = useState<boolean>(true); // ✅ Explicit type for boolean state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (error) {
          console.error("Error fetching posts:", error.message, error.details);
        } else {
          setPosts(Array.isArray(data) ? (data as Post[]) : []); // ✅ Ensures `data` is correctly typed
        }        
      } catch (err) {
        console.error("An unexpected error occurred:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching (or error)
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <div>
      <h1>My Supabase Blog</h1>
      <ul>
        {posts.map((post: Post) => ( // ✅ Explicitly define `post` as `Post`
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
