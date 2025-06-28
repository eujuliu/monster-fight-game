function chunkArray<T>(items: T[], size = 10) {
  if (size < 1) throw new Error("Chunk size can't be less than 1");

  const chunks = [];

  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);

    chunks.push(chunk);
  }

  return chunks;
}

export { chunkArray };
