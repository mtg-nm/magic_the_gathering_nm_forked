import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

// ===== QUERIES =====

export async function getNavigation() {
  const entries = await client.getEntries({
    content_type: 'navigationItem',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getPages() {
  const entries = await client.getEntries({
    content_type: 'page',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getPageBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'page',
    'fields.slug': slug,
  });
  return entries.items[0];
}

export async function getHeroSection(id: string) {
  const entry = await client.getEntry(id);
  return entry;
}

export async function getInfoCards() {
  const entries = await client.getEntries({
    content_type: 'infoCard',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getEvents() {
  const entries = await client.getEntries({
    content_type: 'event',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getEventsByDay(day: string) {
  const entries = await client.getEntries({
    content_type: 'event',
    'fields.day': day,
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getEventBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'event',
    'fields.slug': slug,
  });
  return entries.items[0];
}

export async function getFeaturedEvent() {
  const entries = await client.getEntries({
    content_type: 'event',
    'fields.isFeatured': true,
  });
  return entries.items[0];
}

export async function getVendors() {
  const entries = await client.getEntries({
    content_type: 'vendor',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getLocation() {
  const entries = await client.getEntries({
    content_type: 'location',
  });
  return entries.items[0];
}

export async function getInfoSections() {
  const entries = await client.getEntries({
    content_type: 'infoSection',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getPracticalInfoItems() {
  const entries = await client.getEntries({
    content_type: 'practicalInfoItem',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getByeTournamentInfoSections() {
  const entries = await client.getEntries({
    content_type: 'byeTornamentInfoSection',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getFAQItems() {
  const entries = await client.getEntries({
    content_type: 'faqItem',
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getFAQItemsByCategory(category: string) {
  const entries = await client.getEntries({
    content_type: 'faqItem',
    'fields.category': category,
    order: ['fields.order'],
  });
  return entries.items;
}

export async function getCountdownData() {
  const entries = await client.getEntries({
    content_type: 'countdownData',
  });
  return entries.items[0];
}