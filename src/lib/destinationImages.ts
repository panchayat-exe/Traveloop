export function destinationImage(query: string) {
  // Pexels hotlinking usually works for demos; for production you may want to download assets.
  // Add cache-busting by width only.
  const q = encodeURIComponent(query)
  return `https://source.unsplash.com/1600x900/?${q},travel`
}
