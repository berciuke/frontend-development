"use client";

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="header  ">
      <h3>Pokeapp</h3>
      <Link href="/">Home</Link>
      <Link href="/pokemon">Pokemons</Link>
      <Link href="/favorites">Favorites</Link>
    </nav>
  );
}
