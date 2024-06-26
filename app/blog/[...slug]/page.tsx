import { posts } from "#site/content"
import { MDXContent } from "@/components/mdx-components"
import { notFound } from "next/navigation"

import { cn, formatDate } from "@/lib/utils"
import "@/styles/mdx.css"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { Tag } from "@/components/tag"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  
  if (!post) {
    null
  }
  return post;
}

// SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl mx-auto py-12 lg:py-12 prose dark:prose-invert">
      {post.date && (
        <time
          dateTime={post.date}
          className="text-muted-foreground block text-sm"
        >
          Published on {formatDate(post.date)}
        </time>
      )}
      <h1 className="mb-1 mt-2 font-heading inline-block text-4xl leading tight lg:text-5xl">
        {post.title}
      </h1>
      <div className="-mt-2 flex items-center space-x-3 text-sm">
        <img
        src="https://tx.shadcn.com/_next/image?url=%2Fimages%2Favatars%2Fshadcn.png&w=48&q=75"
        alt="Author Image"
        width={42}
        height={42}
        className="rounded-full bg-white"
        />
        <div className="flex-shrink text-left leading-none">
          <p className="font-medium">{post.authors}</p>
          <p className="text-muted-foreground text-[12px] -mt-3">
            @{siteConfig.instagram}
           </p>
        </div>
      </div>
      {/* <div className="flex gap-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div> */}
      {post.image && (
        <Image
          src={post.image}
          alt="post.title"
          width={720}
          height={405}
          className="bg-muted rounded-md border transition-colors"
          priority 
        />
      )}
      <MDXContent code={post.body} />
      <hr className="mt-12" />
      {/* <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 size-4" />
          See all posts
        </Link>
      </div> */}
    </article>
  );
}
