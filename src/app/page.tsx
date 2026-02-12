import { getPages, getNavigation, getEvents, getVendors, getLocation } from '@/lib/contentful';

export default async function Home() {
  try {
    const navigation = await getNavigation();
    const pages = await getPages();
    const events = await getEvents();
    const vendors = await getVendors();
    const location = await getLocation();

    // Finn hovedturneringen (featured event)
    const mainEvent = events.find((e: any) => e.fields?.title?.includes('Norgesmesterskapet') && e.fields?.day?.includes('8'));

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
                  <a href="/fullt-program" className="btn btn-primary">📅 Alle Events</a>
                  <a href="#om-nm" className="btn btn-secondary">📖 Les mer</a>
                </div>
              </div>
            </div>
          </section>

          {/* INFO CARDS - Om NM 2026 */}
          <section className="page-section" id="om-nm">
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
                  <p>7-9 August 2025</p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">🏆</div>
                  <h3>Premier</h3>
                  <p>Store Premier!</p>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED EVENT - Hovedturneringen */}
          {mainEvent && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>🎯 Norgesmesterskapet i Magic: The Gathering</h2>
                  <p>Hovedturneringen arrangeres lørdag 8. august 2026</p>
                </div>
                <div className="content-box-blue" style={{ marginTop: '40px' }}>
                  <p style={{ marginBottom: '20px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    Dette er Norges største Magic-turnering der Norges beste spillere konkurrerer om å bli Norgesmester 2026.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>📅 Dato & Tid</h4>
                      <p style={{ color: 'var(--text-muted)' }}>8. august, 09:00</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>📋 Format</h4>
                      <p style={{ color: 'var(--text-muted)' }}>Modern + Draft</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>👥 Deltakere</h4>
                      <p style={{ color: 'var(--text-muted)' }}>Opp til 128</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>💰 Påmeldingspris</h4>
                      <p style={{ color: 'var(--text-muted)' }}>600 kr Early Bird - 750 kr Vanlig</p>
                    </div>
                  </div>
                  <a href="/fullt-program" className="btn btn-primary">Påmelding Main Event</a>
                </div>
              </div>
            </section>
          )}

          {/* ALT SOM SKJER I HELGEN */}
          <section className="page-section">
            <div className="container">
              <div className="section-header">
                <h2>Alt som skjer i helgen</h2>
                <p>Hovedturneringen, side events og mer</p>
              </div>
              <div className="grid-2">
                <div className="content-box-teal">
                  <h3 style={{ color: '#6ee8dd', marginBottom: '12px' }}>
                    🎯 Norgesmesterskapet - Magic: The Gathering
                  </h3>
                  <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                    Lørdag 8. august 09:00. Slåss om tittelen som Norgesmester 2026. Draft + Modern. 128 deltakere, 3 Runder Draft → Swiss → Top 8.
                  </p>
                  <a href="/fullt-program" className="btn btn-primary">Les mer →</a>
                </div>

                <div className="content-box-teal">
                  <h3 style={{ color: '#6ee8dd', marginBottom: '12px' }}>
                    📋 Standard Grand Challenge
                  </h3>
                  <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                    Søndag 09:00. Storstilt Standard-turnering begrenset til 64 deltakere. Høyt konkurransenivå og attraktive premier.
                  </p>
                  <a href="/fullt-program" className="btn btn-primary">Les mer →</a>
                </div>

                <div className="content-box-teal">
                  <h3 style={{ color: '#6ee8dd', marginBottom: '12px' }}>
                    🃏 Chaos Draft
                  </h3>
                  <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                    Fredag 16:30. Bli med på Norges største Chaos Draft med pakker fra 30 forskjellige sett! Dritartig og avslappet event.
                  </p>
                  <a href="/fullt-program" className="btn btn-primary">Les mer →</a>
                </div>

                <div className="content-box-teal">
                  <h3 style={{ color: '#6ee8dd', marginBottom: '12px' }}>
                    🎲 Last Chance Bye-Turnering
                  </h3>
                  <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                    Fredag 16:30. Siste sjanse til å vinne bye til hovedturneringen! Modern format.
                  </p>
                  <a href="/bye-turneringer" className="btn btn-primary">Les mer →</a>
                </div>
              </div>
              <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--box-primary)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p><strong>Side-Events:</strong> Flere turneringer i Legacy, Pauper, og mer. Mange runder med Draft. Mer info kommer…</p>
              </div>
            </div>
          </section>

          {/* PAGES/INFO SECTION */}
          {Array.isArray(pages) && pages.length > 0 && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>💡 Info</h2>
                  <p>Praktisk informasjon og annet du trenger å vite</p>
                </div>
                <div className="grid-2">
                  <div className="content-box-purple">
                    <h3 style={{ color: '#dd99ff', marginBottom: '12px' }}>
                      🏠 Praktisk Informasjon
                    </h3>
                    <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                      Reise, overnatting, mat og andre praktiske detaljer for turneringshelgen.
                    </p>
                    <a href="/praktisk-info" className="btn btn-primary">Les mer →</a>
                  </div>

                  <div className="content-box-purple">
                    <h3 style={{ color: '#dd99ff', marginBottom: '12px' }}>
                      🛍️ Vendors & Handlestedier
                    </h3>
                    <p style={{ margin: '0', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                      Se hvilke vendors som kommer og hvilke kort og produkter som vil være tilgjengelig.
                    </p>
                    <a href="/vendors" className="btn btn-primary">Les mer →</a>
                  </div>
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
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">NM Magic 2025</div>
              <div>Pilestredet 52 - Studenthuset, OsloMet • 7-9 august 2025</div>
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
          </div>
        </div>
      </div>
    );
  }
}