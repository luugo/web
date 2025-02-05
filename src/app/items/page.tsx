// app/items/page.js
"use client";
import React, {Suspense} from 'react';
import Items from './Items';

export default function ItemsPage() {
  return (
    <Suspense fallback={<div>Loading search parameters...</div>}>
      <Items/>
    </Suspense>
  );
}