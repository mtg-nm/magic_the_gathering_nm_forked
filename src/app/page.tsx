import React from 'react';
import {
  getNavigation,
  getEvents,
  getVendors,
  getSupporters,
  getPracticalInfoItems,
} from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ✅ ISR - Regenerer siden hver 60. sekund
export const revalidate = 60;

export default async function Home() {
  try {
    const navigation = await getNavigation();
    const events = await getEvents();
    const vendors = await getVendors();
    const supporters = await getSupporters();
    const practicalInfoItems = await getPracticalInfoItems();

    console.log('practicalInfoItems:', practicalInfoItems);
    console.log('practicalInfoItems length:', practicalInfoItems?.length);
    console.log('supporters:', supporters);
    console.log('supporters length:', supporters?.length);

    const mainEvent = Array.isArray(events)
      ? events.find(
          (e: any) =>
            e.fields?.title?.includes('Norgesmesterskapet') &&
            e.fields?.day?.includes('8')
        )
      : null;

    return (
      <>
        <Header navigation={navigation} normalizedSlug="/" />

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* HERO SECTION */}
          <section className="page-section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '60px' }} />
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
                  <p
                    style={{
                      marginBottom: '20px',
                      color: 'var(--text-muted)',
                      lineHeight: '1.8',
                    }}
                  >
                    Dette er Norges største Magic-turnering der Norges beste
                    spillere konkurrerer om å bli Norgesmester 2026.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>
                        📅 Dato & Tid
                      </h4>
                      <p style={{ color: 'var(--text-muted)' }}>8. august, 09:00</p>
                    </div>

                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>
                        📋 Format
                      </h4>
                      <p style={{ color: 'var(--text-muted)' }}>Modern + Draft</p>
                    </div>

                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>
                        👥 Maks Antall Deltakere
                      </h4>
                      <p style={{ color: 'var(--text-muted)' }}>128</p>
                    </div>

                    <div>
                      <h4 style={{ color: '#7bc4f0', marginBottom: '8px' }}>
                        💰 Påmeldingspris
                      </h4>
                      <p style={{ color: 'var(--text-muted)' }}>
                        600 kr Early Bird - 750 kr Vanlig
                      </p>
                    </div>
                  </div>

                  <a href="/fullt-program" className="btn btn-primary">
                    Påmelding Main Event
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* VELKOMMEN TIL NM */}
          <section className="page-section" id="velkommen-nm">
            <div className="container">
              <div className="section-header">
                <h1>Velkommen til Norges største Magic-turnering</h1>
                <p
                  style={{
                    fontSize: '1.2em',
                    color: 'var(--text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 40px',
                  }}
                >
                  Blir du vår neste Norgesmester?
                </p>
              </div>

              <div
                className="content-box-blue"
                style={{ marginTop: '30px', marginBottom: '40px' }}
              >
                <h3
                  style={{
                    color: '#7bc4f0',
                    marginBottom: '15px',
                    fontSize: '1.3em',
                  }}
                >
                  🎯 Konkurrer om å bli Norgesmester i 2026
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: '0',
                        color: '#9effc0',
                        fontWeight: '600',
                        fontSize: '0.9em',
                      }}
                    >
                      📅 DAG
                    </p>
                    <p
                      style={{
                        margin: '5px 0 0 0',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Lørdag 8. august
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        margin: '0',
                        color: '#9effc0',
                        fontWeight: '600',
                        fontSize: '0.9em',
                      }}
                    >
                      🕐 TID
                    </p>
                    <p
                      style={{
                        margin: '5px 0 0 0',
                        color: 'var(--text-muted)',
                      }}
                    >
                      09:00
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        margin: '0',
                        color: '#9effc0',
                        fontWeight: '600',
                        fontSize: '0.9em',
                      }}
                    >
                      📋 FORMAT
                    </p>
                    <p
                      style={{
                        margin: '5px 0 0 0',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Draft + Modern
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        margin: '0',
                        color: '#9effc0',
                        fontWeight: '600',
                        fontSize: '0.9em',
                      }}
                    >
                      👥 MAKS DELTAKERE
                    </p>
                    <p
                      style={{
                        margin: '5px 0 0 0',
                        color: 'var(--text-muted)',
                      }}
                    >
                      128
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: '15px',
                    backgroundColor: 'rgba(94, 179, 230, 0.1)',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    borderLeft: '3px solid #7bc4f0',
                  }}
                >
                  <p style={{ margin: '0', color: 'var(--text-muted)' }}>
                    <strong>Format:</strong> 3 Runder Draft → Swiss → Top 8
                  </p>
                </div>

                <a
                  href="/fullt-program"
                  className="btn btn-primary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  📅 Se fullt program
                </a>
              </div>
            </div>
          </section>

          {/* PRAKTISK INFORMASJON BOLK */}
          {Array.isArray(practicalInfoItems) && practicalInfoItems.length > 0 ? (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>🏠 Praktisk Informasjon</h2>
                  <p>
                    Reise, overnatting, mat og andre praktiske detaljer for
                    turneringshelgen
                  </p>
                </div>

                <div className="grid-2">
                  {practicalInfoItems.map((item: any) => {
                    const content = item.fields?.content;

                    const renderRichText = (richText: any): React.ReactElement => {
                      if (!richText || !richText.content) return <></>;

                      return (
                        <>
                          {richText.content.map((block: any, idx: number) => {
                            if (block.nodeType === 'paragraph') {
                              return (
                                <p
                                  key={idx}
                                  style={{
                                    margin: '8px 0',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95em',
                                    lineHeight: '1.6',
                                  }}
                                >
                                  {block.content?.map(
                                    (text: any, textIdx: number) => (
                                      <span key={textIdx}>
                                        {text.marks?.some(
                                          (m: any) => m.type === 'bold'
                                        ) ? (
                                          <strong>{text.value}</strong>
                                        ) : text.marks?.some(
                                            (m: any) => m.type === 'italic'
                                          ) ? (
                                          <em>{text.value}</em>
                                        ) : (
                                          text.value
                                        )}
                                      </span>
                                    )
                                  )}
                                </p>
                              );
                            }

                            if (
                              block.nodeType === 'unordered-list' ||
                              block.nodeType === 'ordered-list'
                            ) {
                              return (
                                <ul
                                  key={idx}
                                  style={{
                                    margin: '8px 0',
                                    paddingLeft: '20px',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95em',
                                    lineHeight: '1.6',
                                  }}
                                >
                                  {block.content?.map(
                                    (listItem: any, listIdx: number) => (
                                      <li
                                        key={listIdx}
                                        style={{ margin: '4px 0' }}
                                      >
                                        {
                                          listItem.content?.[0]?.content?.[0]
                                            ?.value
                                        }
                                      </li>
                                    )
                                  )}
                                </ul>
                              );
                            }

                            if (
                              block.nodeType === 'heading-1' ||
                              block.nodeType === 'heading-2' ||
                              block.nodeType === 'heading-3'
                            ) {
                              const HeadingTag =
                                block.nodeType === 'heading-1'
                                  ? 'h4'
                                  : block.nodeType === 'heading-2'
                                    ? 'h5'
                                    : 'h6';

                              return (
                                <HeadingTag
                                  key={idx}
                                  style={{
                                    margin: '12px 0 8px 0',
                                    color: '#9effc0',
                                    fontSize: '0.95em',
                                    fontWeight: '600',
                                  }}
                                >
                                  {block.content?.[0]?.value}
                                </HeadingTag>
                              );
                            }

                            return null;
                          })}
                        </>
                      );
                    };

                    let contentElement = null;

                    if (typeof content === 'string') {
                      contentElement = (
                        <p
                          style={{
                            margin: '8px 0',
                            color: 'var(--text-muted)',
                            fontSize: '0.95em',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {content}
                        </p>
                      );
                    } else if (content?.content) {
                      contentElement = renderRichText(content);
                    }

                    return (
                      <div key={item.sys.id} className="content-box-green">
                        <h3 style={{ color: '#9effc0', marginBottom: '15px' }}>
                          {item.fields?.icon || '📌'}{' '}
                          {String(item.fields?.title || 'Praktisk Info')}
                        </h3>
                        {contentElement}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            <section className="page-section">
              <div className="container">
                <div className="content-box-blue" style={{ textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)' }}>
                    ⚠️ Ingen praktisk informasjon tilgjengelig fra Contentful
                  </p>
                </div>
              </div>
            </section>
          )}
{/* VENDORS BOLK */}
{Array.isArray(vendors) && vendors.length > 0 && (
  <section className="page-section">
    <div className="container">
      <div className="section-header">
        <h2>🛍️ Vendors</h2>
        <p>
          Se hvilke vendors som kommer og hvilke kort og produkter som
          vil være tilgjengelig
        </p>
      </div>

      <div className="grid-3">
        {vendors.map((vendor: any) => {
          const vendorIcon = vendor.fields?.icon || '🎯';
          const vendorWebsite = vendor.fields?.website;

          return (
            <div
              key={vendor.sys.id}
              className="content-box-purple"
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '2.5em', marginBottom: '15px' }}>
                {vendorIcon}
              </div>

              <h3 style={{ color: '#dd99ff', marginBottom: '10px' }}>
                {String(vendor.fields?.name || 'Unavngitt leverandør')}
              </h3>

              {vendor.fields?.description &&
                typeof vendor.fields.description === 'string' && (
                  <p
                    style={{
                      margin: '0 0 15px 0',
                      color: 'var(--text-muted)',
                      fontSize: '0.95em',
                      lineHeight: '1.6',
                    }}
                  >
                    {vendor.fields.description}
                  </p>
                )}

              {/* ✅ Website-knapp */}
              {vendorWebsite && (
                <a
                  href={vendorWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '10px' }}
                >
                  🛍️ Besøk nettbutikk
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
)}

          {/* STØTTESPILLERE BOLK */}
          {Array.isArray(supporters) && supporters.length > 0 && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>🤝 Støttespillere</h2>
                  <p>Se de forskjellige samarbeidspartnerne vi jobber med i år</p>
                </div>

                <div className="grid-3">
                  {supporters.map((supporter: any) => {
                    const iconToUse = supporter.fields?.icon || '🤝';

                    return (
                      <div
                        key={supporter.sys.id}
                        className="content-box-purple"
                        style={{ textAlign: 'center' }}
                      >
                        <div style={{ fontSize: '2.5em', marginBottom: '15px' }}>
                          {iconToUse}
                        </div>

                        <h3 style={{ color: '#dd99ff', marginBottom: '10px' }}>
                          {supporter.fields?.url ? (
                            <a
                              href={supporter.fields.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#dd99ff',
                                textDecoration: 'none',
                              }}
                            >
                              {String(
                                supporter.fields?.name ||
                                  'Unavngitt støttespiller'
                              )}
                            </a>
                          ) : (
                            String(
                              supporter.fields?.name ||
                                'Unavngitt støttespiller'
                            )
                          )}
                        </h3>

                        {supporter.fields?.description &&
                          typeof supporter.fields.description === 'string' && (
                            <p
                              style={{
                                margin: '0',
                                color: 'var(--text-muted)',
                                fontSize: '0.95em',
                                lineHeight: '1.6',
                              }}
                            >
                              {supporter.fields.description}
                            </p>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* KONTAKT & SPØRSMÅL */}
          <section className="page-section">
            <div className="container">
              <div className="section-header">
                <h2>❓ Spørsmål?</h2>
              </div>

              <div className="content-box-teal" style={{ textAlign: 'center' }}>
                <p
                  style={{
                    margin: '10px 0',
                    color: 'var(--text-muted)',
                    fontSize: '0.95em',
                  }}
                >
                  Kontakt oss på Discord • E-post:{' '}
                  <strong>mtgnm.styret@gmail.com</strong>
                </p>

                <a
                  href="https://discord.com/invite/7UtayJsGBB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '15px' }}
                >
                  🎮 Join Discord
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading content:', error);

    return (
      <>
        <Header navigation={[]} normalizedSlug="/" />
        <main className="main-content">
          <section className="page-section">
            <div className="container">
              <div style={{ 
                padding: '40px', 
                backgroundColor: 'var(--box-primary)',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <h1 style={{ fontSize: '2em', color: 'var(--accent-red)', marginBottom: '20px' }}>
                  ❌ Feil ved lasting av innhold
                </h1>
                <p>Kunne ikke laste data fra Contentful. Sjekk at environment-variabler er riktig satt.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}