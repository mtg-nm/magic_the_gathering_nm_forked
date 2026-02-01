import { getPages, getNavigation } from '@/lib/contentful';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  try {
    const pages = await getPages();
    const navigation = await getNavigation();

    // Finn siden basert på slug
    const page = pages.find((p: any) => p.fields.slug === params.slug);

    if (!page) {
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
                  navigation.map((item: any) => (
                    <a
                      key={item.sys.id}
                      href={`/${String(item.fields?.slug || item.fields?.url || '')}`}
                      target={item.fields?.isExternal ? '_blank' : undefined}
                      className={item.fields?.slug === '' || item.fields?.url === '' ? 'active' : ''}
                    >
                      {String(item.fields?.title || item.fields?.label || 'Link')}
                    </a>
                  ))}
              </nav>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <section className="page-section">
            <div className="container">
              {/* TITTEL */}
              <h1 style={{ 
                fontSize: '2.5em', 
                fontWeight: '700', 
                marginBottom: '20px',
                color: 'var(--text-light)'
              }}>
                {String(page.fields?.title || 'Unavngitt side')}
              </h1>

              {/* BESKRIVELSE */}
              {page.fields?.description && (
                <div style={{ 
                  fontSize: '1.1em', 
                  color: 'var(--text-muted)', 
                  marginBottom: '40px', 
                  lineHeight: '1.8' 
                }}>
                  {String(page.fields.description)}
                </div>
              )}

              {/* HOVEDINNHOLD */}
              {page.fields?.content && (
                <div style={{ 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  fontSize: '1.05em'
                }}>
                  {String(page.fields.content)}
                </div>
              )}

              {/* HVIS INGEN INNHOLD */}
              {!page.fields?.description && !page.fields?.content && (
                <div style={{ 
                  padding: '40px', 
                  backgroundColor: 'var(--box-primary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>Denne siden har ikke noe innhold ennå.</p>
                </div>
              )}
            </div>
          </section>
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