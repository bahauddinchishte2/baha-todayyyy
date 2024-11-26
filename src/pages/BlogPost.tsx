import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../data';
import BlogNavbar from '../components/BlogNavbar';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link 
            to="/blog" 
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <BlogNavbar />
      
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-2.5 py-1 text-sm font-medium bg-blue-500/20 text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-blue max-w-none">
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="text-slate-300 leading-relaxed space-y-6">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}