'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';


type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">My Blog</h1>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-4xl font-bold text-center text-gray-900 my-8">Latest Posts</h1>

  {loading ? (
    <p className="text-center text-gray-600">Loading...</p>
  ) : posts.length === 0 ? (
    <p className="text-center text-gray-600">No posts available.</p>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`} passHref>
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 hover:underline">{post.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
            <p className="text-gray-700 mt-3 line-clamp-3">{post.content.substring(0, 120)}...</p>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>

        {/* Footer */}
        <footer className="bg-white shadow-md mt-10 p-4 text-center text-gray-600">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </footer>
      </div>
    </>
  );
}
