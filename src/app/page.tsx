import { getPages, getNavigation, getEvents, getVendors, getLocation } from '@/lib/contentful';

export default async function Home() {
  try {
    const navigation = await getNavigation();
    const pages = await getPages();
    const events = await getEvents();
    const vendors = await getVendors();
    const location = await getLocation();

    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '40px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '2.5em', margin: '0 0 10px 0' }}>⚔️ Magic the Gathering Turnering</h1>
          <p style={{ color: '#666', margin: '0' }}>Den ultimate MTG-turneringen i Norge</p>
        </header>

        {/* Navigation */}
        {navigation && (
          <nav style={{ marginBottom: '40px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
                🏠 Hjem
              </a>
              {Array.isArray(navigation?.fields?.items) &&
                navigation.fields.items.map((item: any) => (
                  <a
                    key={item.sys.id}
                    href={`/${String(item.fields.slug)}`}
                    style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}
                  >
                    {String(item.fields.title)}
                  </a>
                ))}
            </div>
          </nav>
        )}

        {/* Events Section */}
        {Array.isArray(events) && events.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8em', borderBottom: '2px solid #0066cc', paddingBottom: '10px' }}>
              📅 Arrangementer ({events.length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {events.map((event: any) => (
                <div
                  key={event.sys.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {String(event.fields?.title || 'Unavngitt arrangement')}
                  </h3>
                  {event.fields?.day && (
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Dag:</strong> {String(event.fields.day)}
                    </p>
                  )}
                  {event.fields?.time && (
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Tid:</strong> {String(event.fields.time)}
                    </p>
                  )}
                  {event.fields?.description && typeof event.fields.description === 'string' && (
                    <p style={{ margin: '10px 0 0 0', color: '#555' }}>{event.fields.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pages Section */}
        {Array.isArray(pages) && pages.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8em', borderBottom: '2px solid #0066cc', paddingBottom: '10px' }}>
              📄 Informasjon ({pages.length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {pages.map((page: any) => (
                <div
                  key={page.sys.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {String(page.fields?.title || 'Unavngitt side')}
                  </h3>
                  {page.fields?.description && typeof page.fields.description === 'string' && (
                    <p style={{ margin: '0', color: '#666' }}>{page.fields.description}</p>
                  )}
                  {page.fields?.slug && (
                    <a
                      href={`/${String(page.fields.slug)}`}
                      style={{
                        display: 'inline-block',
                        marginTop: '10px',
                        padding: '8px 12px',
                        backgroundColor: '#0066cc',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '0.9em',
                      }}
                    >
                      Les mer →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vendors Section */}
        {Array.isArray(vendors) && vendors.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8em', borderBottom: '2px solid #0066cc', paddingBottom: '10px' }}>
              🛍️ Leverandører ({vendors.length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {vendors.map((vendor: any) => (
                <div
                  key={vendor.sys.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#fafafa',
                    textAlign: 'center',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {String(vendor.fields?.name || 'Unavngitt leverandør')}
                  </h3>
                  {vendor.fields?.description && typeof vendor.fields.description === 'string' && (
                    <p style={{ margin: '0', color: '#666', fontSize: '0.95em' }}>
                      {vendor.fields.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location Section */}
        {location && location.fields && (
          <section style={{ marginBottom: '40px', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.8em', color: '#333', margin: '0 0 15px 0' }}>📍 Lokasjon</h2>
            {location.fields.name && (
              <p style={{ margin: '5px 0', fontSize: '1.1em' }}>
                <strong>{String(location.fields.name)}</strong>
              </p>
            )}
            {location.fields.address && (
              <p style={{ margin: '5px 0', color: '#666' }}>{String(location.fields.address)}</p>
            )}
            {(location.fields.city || location.fields.postalCode) && (
              <p style={{ margin: '5px 0', color: '#666' }}>
                {location.fields.city ? String(location.fields.city) : ''}{' '}
                {location.fields.postalCode ? String(location.fields.postalCode) : ''}
              </p>
            )}
          </section>
        )}

        {/* Footer */}
        <footer style={{ marginTop: '60px', borderTop: '2px solid #333', paddingTop: '20px', textAlign: 'center', color: '#666' }}>
          <p>&copy; 2024 Magic the Gathering Turnering. Alle rettigheter reservert.</p>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error loading content:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>❌ Feil ved lasting av innhold</h1>
        <p>Kunne ikke laste data fra Contentful. Sjekk at environment-variabler er riktig satt.</p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', textAlign: 'left', overflowX: 'auto' }}>
          {error instanceof Error ? error.message : 'Ukjent feil'}
        </pre>
      </div>
    );
  }
}