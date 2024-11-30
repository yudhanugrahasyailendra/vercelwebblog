import Link from "next/link";

Link

export default function Home() {
  return (
    <>
      <h1>Halo</h1>
      <br />
      <Link href="/homepage">Home</Link>
      <br />
      <Link href="/postlist">Post List</Link>
      <br />
      <Link href="/detail-post">Detail Post</Link>
      <br />
      <Link href="/create-post">Create Post</Link>
      <br />
      <Link href="/update-post">Update Post</Link>
      <br />
      <Link href="/delete-post">Delete Post</Link>
    </>
  );
}
