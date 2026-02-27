import { getByeTournamentInfoSection, getByeEvemt, getNavigation } from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ✅ ISR - Regenerer siden hver 60. sekund
export const revalidate = 60;

export default async function ByeTournamentPage() {
  try {
    const navigation = await getNavigation();
    const byeTournamentInfoSections = await getByeTournamentInfoSection();
    const byeEvemts = await getByeEvemt();

    const normalizedSlug = 'bye-turneringer';

    console.log('byeTournamentInfoSections:', byeTournamentInfoSections);
    console.log('byeEvemts:', byeEvemts);

    // Sorter events etter dato
    const sortedByeEvemts = Array.isArray(byeEvemts)
      ? [...byeEvemts].sort((a, b) => {
          const dateA = new Date(String(a.fields?.eventStartTime) || '0').getTime();
          const dateB = new Date(String(b.fields?.eventStartTime) || '0').getTime();
          return dateA - dateB;
        })
      : [];

    // 🎯 Hjelpefunksjon for å rendere rich text
    const renderRichText = (richText: any): React.ReactElement => {
      if (!richText || !richText.content) return <></>;

      return (
        <>
          {richText.content.map((block: any, idx: number) => {
            // 📝 Håndter paragraf blokker
            if (block.nodeType === 'paragraph') {
              return (
                <p
                  key={idx}
                  style={{
                    margin: '0 0 12px 0',
                    color: 'var(--text-muted)',
                    fontSize: '0.95em',
                    lineHeight: '1.6',
                  }}
                >
                  {block.content?.map((text: any, textIdx: number) => (
                    <span key={textIdx}>
                      {text.marks?.some((m: any) => m.type === 'bold') ? (
                        <strong>{text.value}</strong>
                      ) : text.marks?.some((m: any) => m.type === 'italic') ? (
                        <em>{text.value}</em>
                      ) : (
                        text.value
                      )}
                    </span>
                  ))}
                </p>
              );
            }

            // 📋 Håndter lister (uordnet og ordnet)
            if (block.nodeType === 'unordered-list' || block.nodeType === 'ordered-list') {
              const ListTag = block.nodeType === 'ordered-list' ? 'ol' : 'ul';
              return (
                <ListTag
                  key={idx}
                  style={{
                    margin: '0 0 12px 0',
                    paddingLeft: '20px',
                    color: 'var(--text-muted)',
                    fontSize: '0.95em',
                    lineHeight: '1.6',
                  }}
                >
                  {block.content?.map((listItem: any, listIdx: number) => (
                    <li key={listIdx} style={{ margin: '4px 0' }}>
                      {listItem.content?.[0]?.content?.map((text: any, textIdx: number) => (
                        <span key={textIdx}>
                          {text.marks?.some((m: any) => m.type === 'bold') ? (
                            <strong>{text.value}</strong>
                          ) : text.marks?.some((m: any) => m.type === 'italic') ? (
                            <em>{text.value}</em>
                          ) : (
                            text.value
                          )}
                        </span>
                      ))}
                    </li>
                  ))}
                </ListTag>
              );
            }

            // 🔤 Håndter headings
            if (block.nodeType === 'heading-1' || block.nodeType === 'heading-2' || block.nodeType === 'heading-3') {
              const HeadingTag = 
                block.nodeType === 'heading-1' ? 'h4' : 
                block.nodeType === 'heading-2' ? 'h5' : 
                'h6';
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

    return (
      <>
        <Header navigation={navigation} normalizedSlug={normalizedSlug} />

        <main className="main-content">
          {/* BYE TOURNAMENT INFO SECTIONS - Grønne bokser under hverandre */}
          {Array.isArray(byeTournamentInfoSections) && byeTournamentInfoSections.length > 0 && (
            <section className="page-section">
              <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                  {byeTournamentInfoSections.map((section: any) => {
                    const content = section.fields?.descriptionByes;

                    // Render innhold basert på format
                    let contentElement = null;
                    if (typeof content === 'string') {
                      // Plain string - bruker pre-wrap for å bevare linjeskift
                      contentElement = (
                        <p
                          style={{
                            margin: '0',
                            color: 'var(--text-muted)',
                            fontSize: '0.95em',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {content}
                        </p>
                      );
                    } else if (content?.content) {
                      // Rich text - bruker helper-funksjon
                      contentElement = renderRichText(content);
                    }

                    return (
                      <div key={section.sys.id} className="content-box-green">
                        <h3 style={{
                          color: '#9effc0',
                          marginBottom: '15px',
                          fontSize: '1.2em'
                        }}>
                          {section.fields?.icon || '📌'} {String(section.fields?.title || 'Info')}
                        </h3>

                        {contentElement && (
                          <div style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.95em',
                            lineHeight: '1.6'
                          }}>
                            {contentElement}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* BYE EVENTS - Blå bokser ved siden av hverandre */}
          {Array.isArray(byeEvemts) && byeEvemts.length > 0 ? (
            <section className="page-section">
              <div className="container">
                <div className="grid-2">
                  {sortedByeEvemts.map((event: any) => (
                    <ByeEventCard key={event.sys.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="page-section">
              <div className="container">
                <div style={{
                  padding: '40px',
                  backgroundColor: 'var(--box-primary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>❌ Ingen bye-turneringer funnet.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading bye-turneringer page:', error);

    return (
      <>
        <Header navigation={[]} normalizedSlug="bye-turneringer" />
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
                <p>Det oppstod en feil ved lasting av siden. Vennligst prøv igjen senere.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

// ✅ Separat komponent for bye event-kort (samme struktur som fullt-program EventCard)
function ByeEventCard({ event }: { event: any }) {
  const registrationUrl = event.fields?.url ? String(event.fields.url) : null;
  const eventName = event.fields?.eventName ? String(event.fields.eventName) : 'Unavngitt turnering';
  const eventDescription = event.fields?.eventDescription && typeof event.fields.eventDescription === 'string' 
    ? event.fields.eventDescription 
    : null;
  const eventStartTime = event.fields?.eventStartTime ? String(event.fields.eventStartTime) : null;
  const eventLocation = event.fields?.eventLocation ? String(event.fields.eventLocation) : null;
  const format = event.fields?.format ? String(event.fields.format) : null;
  const entryFeeText = event.fields?.entryFeeText ? String(event.fields.entryFeeText) : null;
  const regler = event.fields?.regler ? String(event.fields.regler) : null;

  return (
    <div className="card">
      <h3 className="card-title">
        {eventName}
      </h3>

      {eventDescription && (
        <p className="card-description">
          {eventDescription}
        </p>
      )}

      <div className="event-specs">
        {eventStartTime && (
          <div className="spec">
            <div className="spec-label">Dato & Tid</div>
            <div className="spec-value">
              {new Date(eventStartTime).toLocaleDateString('no-NO', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )}
        {eventLocation && (
          <div className="spec">
            <div className="spec-label">Lokasjon</div>
            <div className="spec-value">{eventLocation}</div>
          </div>
        )}
        {format && (
          <div className="spec">
            <div className="spec-label">Format</div>
            <div className="spec-value">{format}</div>
          </div>
        )}
        {entryFeeText && (
          <div className="spec">
            <div className="spec-label">Pris</div>
            <div className="spec-value">{entryFeeText}</div>
          </div>
        )}
        {regler && (
          <div className="spec">
            <div className="spec-label">Regler</div>
            <div className="spec-value">{regler}</div>
          </div>
        )}
      </div>

      {registrationUrl && (
        <a 
          href={registrationUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', textAlign: 'center', marginTop: '20px', display: 'block' }}
        >
          Påmelding
        </a>
      )}
    </div>
  );
}