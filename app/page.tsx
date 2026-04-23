import { client } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    }
  }`

  return await client.fetch(query)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-8 border-b border-gray-100 pb-4">Trending on Medium</h1>
          
          <div className="space-y-2">
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <p className="text-gray-500 py-10">No posts found. Add some content in Sanity Studio!</p>
            )}
          </div>
        </div>

        <div className="hidden md:block w-1/3">
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Discover more of what matters to you</h3>
              <div className="flex flex-wrap gap-2">
                {['Technology', 'Self Improvement', 'Design', 'Programming', 'Lifestyle'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <footer className="pt-10 border-t border-gray-100 text-xs text-gray-500 space-x-4">
              <Link href="/">Help</Link>
              <Link href="/">Status</Link>
              <Link href="/">Writers</Link>
              <Link href="/">Blog</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Privacy</Link>
              <Link href="/">Terms</Link>
              <Link href="/">About</Link>
              <Link href="/">Text to speech</Link>
              <Link href="/">Teams</Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
