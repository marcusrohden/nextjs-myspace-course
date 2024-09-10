/**
 * Specifies the revalidation time in seconds for the blog page.
 *
 * The `revalidate` property is used in Next.js to control the caching behavior of the page.
 * By setting a revalidation time, Next.js will automatically regenerate the page after the specified time has passed.
 * This ensures that the page content stays up-to-date without the need for manual regeneration.
 *
 * In this case, the `revalidate` value is set to 420 seconds (7 minutes).
 * This means that the blog page will be regenerated every 7 minutes to fetch the latest data.
 *
 * @remarks
 * It's important to choose an appropriate revalidation time based on the frequency of data updates and the desired freshness of the page content.
 * Setting a very low revalidation time may result in excessive regeneration and increased server load, while setting a very high revalidation time may lead to stale content.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
 */
export const revalidate = 420;

interface Post {
  title: string;
  content: string;
  slug: string;
}

interface Props {
  params: { slug: string };
}

// This function generates static parameters for a static site generation framework like Next.js
export async function generateStaticParams() {
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );

  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

// This function fetches the posts, finds the one matching the slug, and renders the blog post page
export default async function BlogPostPage({ params }: Props) {
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );

  const post = posts.find((post) => post.slug === params.slug)!;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.slug}</p>
    </div>
  );
}
