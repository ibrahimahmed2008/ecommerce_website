import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface PostProps {
  post: {
    _id: string
    title: string
    author: {
      name: string
      image: any
    }
    excerpt: string
    mainImage: any
    slug: {
      current: string
    }
    publishedAt: string
  }
}

export default function PostCard({ post }: PostProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-gray-100 group cursor-pointer">
        <div className="flex-1 md:pr-10">
          <div className="flex items-center space-x-2 mb-2">
            {post.author?.image && (
              <Image
                src={urlFor(post.author.image).width(24).height(24).url()}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-xs font-medium">{post.author?.name}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-500 text-sm md:text-base line-clamp-2 font-serif mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        {post.mainImage && (
          <div className="mt-4 md:mt-0 w-full md:w-32 h-32 relative">
            <Image
              src={urlFor(post.mainImage).width(128).height(128).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
