import React from 'react';
import CatalogClient from '../_components/CatalogClient';

/**
 * Props for the CatalogPage component.
 * Next.js 15 requires 'params' and 'searchParams' to be asynchronous.
 */
interface Props {
  params: Promise<{ slug?: string[] }>;
}

/**
 * CatalogPage (Server Component)
 * Handles the unwrapping of dynamic route parameters (Optional Catch-all).
 * 
 * @param {Props} props - The component props containing the async params.
 * @returns {Promise<JSX.Element>} The rendered catalog client view.
 */
export default async function CatalogPage({ params }: Props) {
  // Unwrap the slug array from the asynchronous params according to Next.js 15 spec.
  const { slug } = await params;

  return (
    <CatalogClient slug={slug} />
  );
}
