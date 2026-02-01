import { getPages, getNavigation } from '@/lib/contentful';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    // AWAIT params først!
    const { slug } = await params;

    const pages = await getPages();
    const navigation = await getNavigation();

    // Normalize slug for case-insensitive matching
    const normalizedSlug = slug.toLowerCase().trim();

    console.log("📍 Looking for slug:", normalizedSlug);
    console.log("🔍 Available pages:", pages.map((p: any) => ({
      title: p.fields?.title,
      slug: p.fields?.slug
    })));

    // Finn siden basert på slug (case-insensitive)
    const page = pages.find((p: any) => 
      p.fields?.slug?.toLowerCase().trim() === normalizedSlug
    ) as any;

    console.log("📦 Found page:", page ? page?.fields?.title : "NOT FOUND");

    if (!page) {
      console.log("❌ No page found for slug:", normalizedSlug);
      notFound();
    }

    return (
      <>
        {/* HEADER & NAVIGATION */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="header-left">
                <div className="header-title">
                  <h1>NM Magic 2025</h1>
                  <p>Norgesmesterskapet i Magic: The Gathering</p>
                </div>
              </div>
              <nav className="nav-menu">
                {Array.isArray(navigation) &&
                  navigation.map((item: any) => {
                    const href = item.fields?.url || item.fields?.slug || '/';

                    return (
                      <a
                        key={item.sys.id}
                        href={href}
                        target={item.fields?.isExternal ? '_blank' : undefined}
                        className={href === '/' ? 'active' : ''}
                      >
                        {String(item.fields?.label || item.fields?.title || 'Link')}
                      </a>
                    );
                  })}
              </nav>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* HERO SECTION */}
          {page?.fields?.heroSection && (
            <section className="page-section">
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                  <h1 style={{ 
                    fontSize: '3em', 
                    fontWeight: '700', 
                    color: 'var(--text-light)', 
                    marginBottom: '20px', 
                    lineHeight: '1.1' 
                  }}>
                    {String(page?.fields?.heroSection?.fields?.title || page?.fields?.title)}
                  </h1>
                  {page?.fields?.heroSection?.fields?.subtitle && (
                    <p style={{ 
                      fontSize: '1.2em', 
                      color: 'var(--text-muted)', 
                      maxWidth: '700px', 
                      margin: '0 auto 40px' 
                    }}>
                      {String(page?.fields?.heroSection?.fields?.subtitle)}
                    </p>
                  )}
                  {(page?.fields?.heroSection?.fields?.primaryButtonText || page?.fields?.heroSection?.fields?.secondaryButtonText) && (
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {page?.fields?.heroSection?.fields?.primaryButtonText && (
                        <a 
                          href={page?.fields?.heroSection?.fields?.primaryButtonLink || '#'} 
                          className="btn btn-primary"
                        >
                          {String(page?.fields?.heroSection?.fields?.primaryButtonText)}
                        </a>
                      )}
                      {page?.fields?.heroSection?.fields?.secondaryButtonText && (
                        <a 
                          href={page?.fields?.heroSection?.fields?.secondaryButtonLink || '#'} 
                          className="btn btn-secondary"
                        >
                          {String(page?.fields?.heroSection?.fields?.secondaryButtonText)}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* PAGE DESCRIPTION */}
          {page?.fields?.description && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  fontSize: '1.1em', 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {String(page?.fields?.description)}
                </div>
              </div>
            </section>
          )}

          {/* PAGE CONTENT */}
          {page?.fields?.content && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  fontSize: '1.05em',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {String(page?.fields?.content)}
                </div>
              </div>
            </section>
          )}

          {/* HVIS INGEN INNHOLD */}
          {!page?.fields?.heroSection && 
            !page?.fields?.description && 
            !page?.fields?.content && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  padding: '40px', 
                  backgroundColor: 'var(--box-primary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>Denne siden har ikke noe innhold ennå.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">Norgesmesterskapet i Magic: The Gathering 2025</div>
              <div>Pilestredet 52 - Studenthuset, OsloMet • 7-9 august 2025</div>
              <div className="footer-links">
                <a href="/">Hjem</a>
                <a href="/events">Events</a>
                <a href="/info">Info</a>
                <a href="https://discord.com/invite/7UtayJsGBB" target="_blank">Discord</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}