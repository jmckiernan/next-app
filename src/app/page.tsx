'use client'; // Important: Declare as a client component

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (error) {
          console.error("Error fetching posts:", error.message, error.details);
        } else {
          setPosts(Array.isArray(data) ? data : []); // ✅ Ensures `data` is an array
        }        
      } catch (error) {
        console.error("An unexpected error occurred:", error.message, error.details);
        // Handle unexpected errors
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
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}