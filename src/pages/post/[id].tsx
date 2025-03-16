import { GetServerSideProps } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import '@/app/globals.css';



type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function PostDetail({ post }: { post: Post | null }) {
  if (!post) {
    return <div className="text-center text-red-500 text-xl">Post not found.</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Back to Home Button */}
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
        <Link href="/" className="text-blue-500 hover:underline text-sm flex items-center">
          &larr; Back to Home
        </Link>
  
        {/* Post Content */}
        <article className="mt-6">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>
          <p className="text-gray-500 text-sm mt-2 italic">{new Date(post.created_at).toLocaleDateString()}</p>
  
          <div className="mt-6 text-lg leading-relaxed text-gray-800">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}

// Fetch post data at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params?.id)
    .single();

  if (error || !post) {
    return { props: { post: null } };
  }

  return { props: { post } };
};
