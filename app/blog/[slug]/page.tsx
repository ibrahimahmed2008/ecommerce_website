import { client } from '@/lib/sanity'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    author->{
      name,
      image,
      bio
    }
  }`

  return await client.fetch(query, { slug })
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">Post not found</h1>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-5 py-10 md:py-20 animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 mb-8">
          {post.author?.image && (
            <Image
              src={urlFor(post.author.image).width(48).height(48).url()}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-900">{post.author?.name}</span>
            <div className="flex items-center text-gray-500 space-x-1">
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span className="text-green-600">5 min read</span>
            </div>
          </div>
        </div>

        {post.mainImage && (
          <div className="w-full relative h-[300px] md:h-[450px] mb-10">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover rounded-sm"
              priority
            />
          </div>
        )}
      </header>

      <section className="prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed text-gray-800">
        <PortableText 
            value={post.body} 
            components={{
                block: {
                    h1: ({children}) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
                    h2: ({children}) => <h2 className="text-3xl font-bold my-6">{children}</h2>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-black pl-4 italic my-8 text-gray-600">{children}</blockquote>,
                },
                types: {
                    image: ({value}) => (
                        <div className="my-10 relative h-[400px]">
                            <Image 
                                src={urlFor(value).url()} 
                                alt="article image" 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                    )
                }
            }}
        />
      </section>

      <footer className="mt-20 pt-10 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {post.author?.image && (
                <Image
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                />
            )}
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Written by {post.author?.name}</h3>
                <p className="text-gray-500 text-sm md:text-base mb-4 italic">
                    {post.author?.bio}
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">Follow</button>
            </div>
        </div>
      </footer>
    </article>
  )
}
