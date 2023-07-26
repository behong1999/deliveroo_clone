import SanityClient, { createClient } from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'ln904m6v',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;

// sanity cors add http://localhost:3000
