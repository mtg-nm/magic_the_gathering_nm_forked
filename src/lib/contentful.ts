import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

// ===== QUERIES =====

export async function getNavigation() {
  try {
    const entries = await client.getEntries({
      content_type: 'navigationItem',
      order: ['fields.order'],
    });
    console.log("✅ getNavigation() returnerer:", entries.items.length, "nav items");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getNavigation():", error);
    return [];
  }
}

export async function getPages() {
  try {
    const entries = await client.getEntries({
      content_type: 'page',
      order: ['fields.order'],
    });

    console.log("✅ getPages() returnerer:", entries.items.length, "sider");
    console.log("📄 Sider:", entries.items.map((p: any) => ({
      id: p.sys.id,
      title: p.fields?.title,
      slug: p.fields?.slug,
      hasHeroSection: !!p.fields?.heroSection,
      hasDescription: !!p.fields?.description,
      hasContent: !!p.fields?.content
    })));

    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getPages():", error);
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
    });
    console.log("✅ getPageBySlug(", slug, ") returnerer:", entries.items.length, "sider");
    return entries.items[0];
  } catch (error) {
    console.error("❌ Feil i getPageBySlug():", error);
    return null;
  }
}

export async function getHeroSection(id: string) {
  try {
    const entry = await client.getEntry(id);
    console.log("✅ getHeroSection() returnerer entry");
    return entry;
  } catch (error) {
    console.error("❌ Feil i getHeroSection():", error);
    return null;
  }
}

export async function getInfoCards() {
  try {
    const entries = await client.getEntries({
      content_type: 'infoCard',
      order: ['fields.order'],
    });
    console.log("✅ getInfoCards() returnerer:", entries.items.length, "kort");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getInfoCards():", error);
    return [];
  }
}

export async function getEvents() {
  try {
    const entries = await client.getEntries({
      content_type: 'dupeEvent',
      order: ['fields.order'],
    });
    console.log("✅ getEvents() returnerer:", entries.items.length, "events");
    // ✅ Log entryFeeText for debugging
    entries.items.forEach((item: any) => {
      if (item.fields?.entryFeeText) {
        console.log(`  📝 Event "${item.fields?.title}" har entryFeeText: "${item.fields.entryFeeText}"`);
      }
    });
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getEvents():", error);
    return [];
  }
}

export async function getEventsByDay(day: string) {
  try {
    const entries = await client.getEntries({
      content_type: 'dupeEvent',
      'fields.day': day,
      order: ['fields.order'],
    });
    console.log("✅ getEventsByDay(", day, ") returnerer:", entries.items.length, "events");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getEventsByDay():", error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: 'dupeEvent',
      'fields.slug': slug,
    });
    console.log("✅ getEventBySlug(", slug, ") returnerer:", entries.items.length, "events");
    return entries.items[0];
  } catch (error) {
    console.error("❌ Feil i getEventBySlug():", error);
    return null;
  }
}

export async function getFeaturedEvent() {
  try {
    const entries = await client.getEntries({
      content_type: 'dupeEvent',
      'fields.isFeatured': true,
    });
    console.log("✅ getFeaturedEvent() returnerer:", entries.items.length, "featured events");
    return entries.items[0];
  } catch (error) {
    console.error("❌ Feil i getFeaturedEvent():", error);
    return null;
  }
}

export async function getVendors() {
  try {
    const entries = await client.getEntries({
      content_type: 'vendor',
      order: ['fields.order'],
    });
    console.log("✅ getVendors() returnerer:", entries.items.length, "vendors");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getVendors():", error);
    return [];
  }
}

export async function getInfoSections() {
  try {
    const entries = await client.getEntries({
      content_type: 'infoSection',
      order: ['fields.order'],
    });
    console.log("✅ getInfoSections() returnerer:", entries.items.length, "info sections");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getInfoSections():", error);
    return [];
  }
}

export async function getPracticalInfoItems() {
  try {
    const entries = await client.getEntries({
      content_type: 'practicalInfoItem',
      order: ['fields.order'],
    });
    console.log("✅ getPracticalInfoItems() returnerer:", entries.items.length, "praktiske info items");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getPracticalInfoItems():", error);
    return [];
  }
}

export async function getByeTournamentInfoSection() {
  try {
    const entries = await client.getEntries({
      content_type: 'byeTornamentInfoSection',
      order: ['fields.order'],
    });
    console.log("✅ getByeTournamentInfoSection() returnerer:", entries.items.length, "bye tournament sections");
    return entries.items;
  } catch (error: any) {
    if (error?.statusText === 'Bad Request' || error?.details?.errors?.[0]?.name === 'unknownContentType') {
      console.warn('⚠️ Content type "byeTornamentInfoSection" eksisterer ikke i Contentful - returnerer tom array');
      return [];
    }
    console.error("❌ Feil i getByeTournamentInfoSection():", error);
    return [];
  }
}

export async function getByeEvemt() {
  try {
    const entries = await client.getEntries({
      content_type: 'byeEvemt',
    });
    console.log("✅ getByeEvemt() returnerer:", entries.items.length, "bye events");
    return entries.items;
  } catch (error: any) {
    if (error?.statusText === 'Bad Request' || error?.details?.errors?.[0]?.name === 'unknownContentType') {
      console.warn('⚠️ Content type "byeEvemt" eksisterer ikke i Contentful - returnerer tom array');
      return [];
    }
    console.error("❌ Feil i getByeEvemt():", error);
    return [];
  }
}

export async function getFulltProgramInfoSection() {
  try {
    const entries = await client.getEntries({
      content_type: 'fulltProgramInfoSection',
      order: ['fields.order'],
    });
    console.log("✅ getFulltProgramInfoSection() returnerer:", entries.items.length, "fullt program sections");
    return entries.items;
  } catch (error: any) {
    if (error?.statusText === 'Bad Request' || error?.details?.errors?.[0]?.name === 'unknownContentType') {
      console.warn('⚠️ Content type "fulltProgramInfoSection" eksisterer ikke i Contentful - returnerer tom array');
      return [];
    }
    console.error("❌ Feil i getFulltProgramInfoSection():", error);
    return [];
  }
}

export async function getFAQItems() {
  try {
    const entries = await client.getEntries({
      content_type: 'faqItem',
      order: ['fields.order'],
    });
    console.log("✅ getFAQItems() returnerer:", entries.items.length, "FAQ items");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getFAQItems():", error);
    return [];
  }
}

export async function getFAQItemsByCategory(category: string) {
  try {
    const entries = await client.getEntries({
      content_type: 'faqItem',
      'fields.category': category,
      order: ['fields.order'],
    });
    console.log("✅ getFAQItemsByCategory(", category, ") returnerer:", entries.items.length, "FAQ items");
    return entries.items;
  } catch (error) {
    console.error("❌ Feil i getFAQItemsByCategory():", error);
    return [];
  }
}

export async function getCountdownData() {
  try {
    const entries = await client.getEntries({
      content_type: 'countdownData',
    });
    console.log("✅ getCountdownData() returnerer:", entries.items.length, "countdown data");
    return entries.items[0];
  } catch (error) {
    console.error("❌ Feil i getCountdownData():", error);
    return null;
  }
}