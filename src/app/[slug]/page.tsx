import { getPages, getNavigation, getEvents, getByeTournamentInfo } from '@/lib/contentful';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    // AWAIT params først!
    const { slug } = await params;

    const pages = await getPages();
    const navigation = await getNavigation();
    const events = await getEvents();
    const byeTournamentInfo = await getByeTournamentInfo();

    // Normalize slug for case-insensitive matching
    const normalizedSlug = slug.toLowerCase().trim();

    console.log("📍 Looking for slug:", normalizedSlug);
    console.log("🔍 Available pages:", pages.map((p: any) => ({
      title: p.fields?.title,
      slug: p.fields?.slug
    })));
    console.log("🔍 DEBUG events:", events.length, "events loaded");
    console.log("🔍 DEBUG normalizedSlug:", normalizedSlug);
    console.log("🔍 DEBUG should show events:", normalizedSlug === 'fullt-program' && Array.isArray(events) && events.length > 0);

    // Finn siden basert på slug (case-insensitive)
    const page = pages.find((p: any) => 
      p.fields?.slug?.toLowerCase().trim() === normalizedSlug
    ) as any;

    console.log("📦 Found page:", page ? page?.fields?.title : "NOT FOUND");

    if (!page) {
      console.log("❌ No page found for slug:", normalizedSlug);
      notFound();
    }

    // DEBUG: Log byeTournamentInfo data
    console.log("🔍 byeTournamentInfo data:", byeTournamentInfo.map((item: any) => ({
      id: item.sys.id,
      title: item.fields?.title,
      allFields: Object.keys(item.fields || {})
    })));

    // GRUPPÉR EVENTS ETTER DAG
    const groupEventsByDay = (eventList: any[]) => {
      const dayMap: { [key: string]: string } = {
        'day one': 'Fredag',
        'day two': 'Lørdag',
        'day three': 'Søndag'
      };

      const grouped: { [key: string]: any[] } = {
        'Fredag': [],
        'Lørdag': [],
        'Søndag': []
      };

      eventList.forEach((event: any) => {
        const dayKey = event.fields?.day?.toLowerCase().trim() || '';
        const dayName = dayMap[dayKey] || 'Annen';
        
        if (grouped[dayName]) {
          grouped[dayName].push(event);
        }
      });

      return grouped;
    };

    const eventsByDay = groupEventsByDay(events);

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
                    const isActive = normalizedSlug === (item.fields?.slug?.toLowerCase().trim() || '');

                    return (
                      <a
                        key={item.sys.id}
                        href={href}
                        target={item.fields?.isExternal ? '_blank' : undefined}
                        className={isActive ? 'active' : ''}
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
          {/* HERO SECTION - IKKE VIS PÅ FULLT-PROGRAM OG BYE-TURNERINGER */}
          {page?.fields?.heroSection && normalizedSlug !== 'fullt-program' && normalizedSlug !== 'bye-turneringer' && (
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

          {/* PAGE DESCRIPTION - IKKE VIS PÅ FULLT-PROGRAM OG BYE-TURNERINGER */}
          {page?.fields?.description && normalizedSlug !== 'fullt-program' && normalizedSlug !== 'bye-turneringer' && (
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

          {/* EVENTS SECTION - GRUPPERT ETTER DAG */}
          {normalizedSlug === 'fullt-program' && Array.isArray(events) && events.length > 0 && (
            <section className="page-section">
              <div className="container">
                {/* HEADER MED LITEN BOKS */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                  <h2 style={{ 
                    fontSize: '2.5em', 
                    fontWeight: '700', 
                    color: 'var(--text-light)', 
                    marginBottom: '20px' 
                  }}>
                    📅 Fullt Program
                  </h2>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--box-primary)',
                    border: '1px solid #7bc4f0',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    color: 'var(--text-muted)',
                    fontSize: '1em'
                  }}>
                    Alt som skjer under Norgesmesterskapet
                  </div>
                </div>

                {/* LOOP GJENNOM DAGER */}
                {Object.entries(eventsByDay).map(([day, dayEvents]: [string, any[]]) => (
                  dayEvents.length > 0 && (
                    <div key={day} style={{ marginBottom: '60px' }}>
                      {/* DAG-OVERSKRIFT */}
                      <h3 style={{ 
                        fontSize: '1.8em', 
                        fontWeight: '600', 
                        color: '#7bc4f0', 
                        marginBottom: '30px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #7bc4f0'
                      }}>
                        {day}
                      </h3>

                      {/* EVENTS FOR DENNE DAGEN */}
                      <div className="grid-2">
                        {dayEvents.map((event: any) => (
                          <div
                            key={event.sys.id}
                            className="content-box-blue"
                          >
                            <h4 style={{ color: '#7bc4f0', marginBottom: '12px' }}>
                              {String(event.fields?.title || 'Unavngitt arrangement')}
                            </h4>
                            {event.fields?.startTime && (
                              <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                                <strong>🕐 Tid:</strong> {String(event.fields.startTime)}
                              </p>
                            )}
                            {event.fields?.format && (
                              <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                                <strong>📋 Format:</strong> {String(event.fields.format)}
                              </p>
                            )}
                            {event.fields?.entryFee && (
                              <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                                <strong>💰 Pris:</strong> {String(event.fields.entryFee)} kr
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
                  )
                ))}
              </div>
            </section>
          )}

          {/* BYE TOURNAMENT INFO SECTION - VIS PÅ BYE-TURNERINGE */}
          {normalizedSlug === 'bye-turneringer' && Array.isArray(byeTournamentInfo) && byeTournamentInfo.length > 0 && (
            <section className="page-section">
              <div className="container">
                {/* HEADER MED LITEN BOKS */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                  <h2 style={{ 
                    fontSize: '2.5em', 
                    fontWeight: '700', 
                    color: 'var(--text-light)', 
                    marginBottom: '20px' 
                  }}>
                    🏆 Bye-turneringer
                  </h2>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--box-primary)',
                    border: '1px solid #7bc4f0',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    color: 'var(--text-muted)',
                    fontSize: '1em'
                  }}>
                    Siste sjanse til å vinne bye til Norgesmesterskapet
                  </div>
                </div>

                {/* BYE TOURNAMENTS GRID */}
                <div className="grid-2">
                  {byeTournamentInfo.map((item: any) => (
                    <div
                      key={item.sys.id}
                      className="content-box-blue"
                    >
                      <h3 style={{ color: '#7bc4f0', marginBottom: '12px' }}>
                        {String(item.fields?.title || 'Unavngitt turnering')}
                      </h3>
                      {item.fields?.description && (
                        <p style={{ margin: '12px 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                          {String(item.fields.description)}
                        </p>
                      )}
                      {item.fields?.format && (
                        <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                          <strong>Format:</strong> {String(item.fields.format)}
                        </p>
                      )}
                      {item.fields?.rounds && (
                        <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
                          <strong>Runder:</strong> {String(item.fields.rounds)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* HVIS INGEN INNHOLD */}
          {!page?.fields?.heroSection && 
            !page?.fields?.description && 
            !page?.fields?.content && 
            !(normalizedSlug === 'fullt-program' && Array.isArray(events) && events.length > 0) &&
            !(normalizedSlug === 'bye-turneringer' && Array.isArray(byeTournamentInfo) && byeTournamentInfo.length > 0) && (
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
              <div className="footer-brand">NM Magic 2025</div>
              <div>Pilestredet 52 - Studenthuset, OsloMet • 7-9 august 2025</div>
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