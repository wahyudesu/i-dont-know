import Image from "next/image";
import Link from "next/link";
import { posts } from "#site/content";
import { PostCard } from "@/components/post-card";
import { QueryPagination } from "@/components/query-pagination";
import { formatDate, cn } from "@/lib/utils";

// Import Tag
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const revalidate = 120;

export const metadata: Metadata = {
  title: "My blog",
  description: "This is a description",
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className={cn("inline-block font-black text-4xl lg:text-5xl", "font-heading")}>
            Blog
          </h1>
          <p className="text-muted-foreground text-xl">
          A blog built using Velite. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {displayPosts.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-2">
          {displayPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="bg-muted rounded-md border transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className={`${inter.className} text-2xl font-extrabold`}>{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(post.date)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      )}
      <QueryPagination
        totalPages={totalPages}
        className="justify-end mt-4"
      />
    </div>
  );
}

