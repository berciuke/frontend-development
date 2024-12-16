import Link from 'next/link';

export default function HomePage() {
  return (
    <section id="home-content">
      <h1>Welcome to PokeApp!</h1>
      <Link href="/pokemon">Pokemon list</Link>
    </section>
  );
}
