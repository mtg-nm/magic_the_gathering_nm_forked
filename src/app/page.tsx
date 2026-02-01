import { getPages, getNavigation, getEvents, getVendors, getLocation } from '@/lib/contentful';

export default async function Home() {
  try {
    const navigation = await getNavigation();
    const pages = await getPages();
    const events = await getEvents();
    const vendors = await getVendors();
    const location = await getLocation();

    return (
      <>
        {/* HEADER & NAVIGATION */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="header-left">
                <div className="header-title">
                  <h1>NM Magic 2026</h1>
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
          <section className="page-section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '3em', fontWeight: '700', color: 'var(--text-light)', marginBottom: '20px', lineHeight: '1.1' }}>
                  ⚔️ Norgesmesterskapet i Magic: The Gathering
                </h1>
                <p style={{ fontSize: '1.2em', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 40px' }}>
                  Norges største Magic-turnering 7-9 august 2026. Slåss om tittelen som Norgesmester!
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="#events" className="btn btn-primary">📅 Alle Events</a>
                  <a href="#info" className="btn btn-secondary">📖 Les mer</a>
                </div>
              </div>
            </div>
          </section>

          {/* INFO CARDS */}
          <section className="page-section">
            <div className="container">
              <div className="section-header">
                <h2>Om NM 2026</h2>
                <p>Alt du trenger å vite om Norgesmesterskapet</p>
              </div>
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-card-icon">📍</div>
                  <h3>Lokasjon</h3>
                  <p>Pilestredet 52 - Studenthuset, OsloMet</p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">📅</div>
                  <h3>Dato</h3>
                  <p>7-9 august 2026</p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">🏆</div>
                  <h3>Premier</h3>
                  <p>Store premier + 10 000kr fra OMF</p>
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS SECTION */}
          {Array.isArray(events) && events.length > 0 && (
            <section className="page-section" id="events">
              <div className="container">
                <div className="section-header">
                  <h2>📅 Arrangementer ({events.length})</h2>
                  <p>Alt som skjer under Norgesmesterskapet</p>
                </div>
                <div className="grid-2">
                  {events.map((event: any) => (
                    <div
                      key={event.sys.id}
                      className="content-box-blue"
                    >
                      <h3 style={{ color: '#7bc4f0', marginBottom: '12px' }}>
                        {String(event.fields?.title || 'Unavngitt arrangement')}
                      </h3>
                      {event.fields?.day && (
                        <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                          <strong>📆 Dag:</strong> {String(event.fields.day)}
                        </p>
                      )}
                      {event.fields?.time && (
                        <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                          <strong>🕐 Tid:</strong> {String(event.fields.time)}
                        </p>
                      )}
                      {event.fields?.description && typeof event.fields.description === 'string' && (
                        <p style={{ margin: '12px 0 0 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                          {event.fields.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* PAGES SECTION */}
          {Array.isArray(pages) && pages.length > 0 && (
            <section className="page-section" id="info">
              <div className="container">
                <div className="section-header">
                  <h2>📄 Informasjon ({pages.length})</h2>
                  <p>Praktisk info og detaljer</p>
                </div>
                <div className="grid-2">
                  {pages.map((page: any) => (
                    <div
                      key={page.sys.id}
                      className="content-box-teal"
                    >
                      <h3 style={{ color: '#6ee8dd', marginBottom: '12px' }}>
                        {String(page.fields?.title || 'Unavngitt side')}
                      </h3>
                      {page.fields?.description && typeof page.fields.description === 'string' && (
                        <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                          {page.fields.description}
                        </p>
                      )}
                      {page.fields?.slug && (
                        <a
                          href={`/${String(page.fields.slug)}`}
                          className="btn btn-primary"
                        >
                          Les mer →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* VENDORS SECTION */}
          {Array.isArray(vendors) && vendors.length > 0 && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>🛍️ Leverandører ({vendors.length})</h2>
                  <p>Kort og produkter fra ledende forhandlere</p>
                </div>
                <div className="grid-3">
                  {vendors.map((vendor: any) => (
                    <div
                      key={vendor.sys.id}
                      className="content-box-purple"
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ fontSize: '2.5em', marginBottom: '15px' }}>🎯</div>
                      <h3 style={{ color: '#dd99ff', marginBottom: '10px' }}>
                        {String(vendor.fields?.name || 'Unavngitt leverandør')}
                      </h3>
                      {vendor.fields?.description && typeof vendor.fields.description === 'string' && (
                        <p style={{ margin: '0', color: 'var(--text-muted)', fontSize: '0.95em', lineHeight: '1.6' }}>
                          {vendor.fields.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* LOCATION SECTION */}
          {location && location.fields && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>📍 Hvor finner vi Studenthuset?</h2>
                  <p>Pilestredet 52, 0169 Oslo - 10 minutter fra Oslo Slott</p>
                </div>
                <div className="content-box-green" style={{ marginTop: '40px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                    <div>
                      <h3 style={{ color: '#9effc0', marginBottom: '12px' }}>📍 Adresse</h3>
                      {location.fields.name && (
                        <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                          <strong>{String(location.fields.name)}</strong>
                        </p>
                      )}
                      {location.fields.address && (
                        <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                          {String(location.fields.address)}
                        </p>
                      )}
                      {(location.fields.city || location.fields.postalCode) && (
                        <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                          {location.fields.city ? String(location.fields.city) : ''}{' '}
                          {location.fields.postalCode ? String(location.fields.postalCode) : ''}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 style={{ color: '#9effc0', marginBottom: '12px' }}>🚇 Kollektivtransport</h3>
                      <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                        T-banen: Hausmanns gate stasjon
                      </p>
                      <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                        Buss: Linjer 20, 21 og 32
                      </p>
                      <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                        ~10 min gange fra Slottet
                      </p>
                    </div>
                    <div>
                      <h3 style={{ color: '#9effc0', marginBottom: '12px' }}>🅿️ Parkering</h3>
                      <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                        Parkering tilgjengelig på området
                      </p>
                      <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
                        Innmarka og Ferner parkeringshus i nærheten
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">Norgesmesterskapet i Magic: The Gathering 2026</div>
              <div>Pilestredet 52 - Studenthuset, OsloMet • 7-9 august 2026</div>
              <div className="footer-links">
                <a href="https://discord.com/invite/7UtayJsGBB" target="_blank">Discord</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  } catch (error) {
    console.error('Error loading content:', error);
    return (
      <div className="page-section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1 style={{ fontSize: '2em', color: 'var(--accent-red)', marginBottom: '20px' }}>
              ❌ Feil ved lasting av innhold
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Kunne ikke laste data fra Contentful. Sjekk at environment-variabler er riktig satt.
            </p>
            <pre style={{
              backgroundColor: 'var(--box-primary)',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left',
              overflowX: 'auto',
              border: '2px solid var(--accent-red)',
              color: 'var(--text-muted)'
            }}>
              {error instanceof Error ? error.message : 'Ukjent feil'}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}