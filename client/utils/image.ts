import imageUrlBuilder from '@sanity/image-url'

import client from './client'

export const urlForThumbnail = (source: string) =>
  imageUrlBuilder(client).image(source).width(300).url()

export const urlFor = (source: string) =>
  imageUrlBuilder(client).image(source).width(580).url()

export const imageLoader = ({ src }: { src: string }) => src
