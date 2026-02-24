import { getEvents, getNavigation, getFulltProgramInfoSection } from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ✅ ISR - Regenerer siden hver 60. sekund
export const revalidate = 60;

export default async function FulltProgramPage() {
  try {
    const navigation = await getNavigation();
    const events = await getEvents();
    const fulltProgramInfoSections = await getFulltProgramInfoSection();

    console.log('fulltProgramInfoSections:', fulltProgramInfoSections);

    const groupEventsByDay = (eventList: any[]) => {
      const dayMap: { [key: string]: { name: string; date: string } } = {
        'day one': { name: 'Fredag', date: '7. august' },
        'day two': { name: 'Lørdag', date: '8. august' },
        'day three': { name: 'Søndag', date: '9. august' }
      };

      const grouped: { [key: string]: any[] } = {
        'Fredag': [],
        'Lørdag': [],
        'Søndag': []
      };

      eventList.forEach((event: any) => {
        const dayKey = event.fields?.day?.toLowerCase().trim() || '';
        const dayInfo = dayMap[dayKey];
        const dayName = dayInfo?.name || 'Annen';

        if (grouped[dayName]) {
          grouped[dayName].push(event);
        }
      });

      // ✅ Sorter events innenfor hver dag etter startTime
      Object.keys(grouped).forEach((day) => {
        grouped[day].sort((a: any, b: any) => {
          const timeA = a.fields?.startTime ? String(a.fields.startTime) : '';
          const timeB = b.fields?.startTime ? String(b.fields.startTime) : '';

          // Hvis begge har tid, sorter etter tid
          if (timeA && timeB) {
            return timeA.localeCompare(timeB);
          }

          // Hvis bare en har tid, plasser den med tid først
          if (timeA) return -1;
          if (timeB) return 1;

          return 0;
        });
      });

      return grouped;
    };

    const eventsByDay = groupEventsByDay(events);

    const dayDates: { [key: string]: string } = {
      'Fredag': '7. august',
      'Lørdag': '8. august',
      'Søndag': '9. august'
    };

    const normalizedSlug = 'fullt-program';

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
          {Array.isArray(events) && events.length > 0 ? (
            <section className="page-section">
              <div className="container">
                {/* SECTION HEADER - H2 og P */}
                <div className="section-header">
                  <h2>Fullt Program</h2>
                  <p>Alt som skjer under Norgesmesterskapet vil bli postet her fortløpende</p>
                </div>

                {/* FULLT PROGRAM INFO SECTIONS - Grønne bokser under section-header */}
                {Array.isArray(fulltProgramInfoSections) && fulltProgramInfoSections.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                    {fulltProgramInfoSections.map((section: any) => {
                      const content = section.fields?.description;

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
                )}

                {/* EVENTS - gruppert etter dag */}
                {Object.entries(eventsByDay).map(([day, dayEvents]: [string, any[]]) => (
                  dayEvents.length > 0 && (
                    <div key={day} className="day-section">
                      <h3 className="day-title">🗓️ {day} {dayDates[day]}</h3>

                      <div className="grid-2">
                        {dayEvents.map((event: any) => {
                          const signupUrl = event.fields?.url ? String(event.fields.url) : null;
                          const schedule = event.fields?.schedule ? String(event.fields.schedule) : null;
                          const deltakere = event.fields?.deltakere ? String(event.fields.deltakere) : null;
                          const rulesv2 = event.fields?.rulesv2 ? String(event.fields.rulesv2) : null;
                          const startTime = event.fields?.startTime ? String(event.fields.startTime) : null;
                          const entryFee = event.fields?.entryFee ? String(event.fields.entryFee) : null;
                          const maxParticipants = event.fields?.maxParticipants ? String(event.fields.maxParticipants) : null;
                          const format = event.fields?.format ? String(event.fields.format) : null;
                          const title = event.fields?.title ? String(event.fields.title) : 'Unavngitt arrangement';
                          const description = event.fields?.description && typeof event.fields.description === 'string' ? event.fields.description : null;

                          return (
                            <div 
                              key={event.sys.id} 
                              className="card"
                            >
                              <h3 className="card-title">
                                {title}
                              </h3>

                              {description && (
                                <p className="card-description">
                                  {description}
                                </p>
                              )}

                              {schedule && (
                                <div className="event-schedule" style={{ 
                                  backgroundColor: 'rgba(123, 196, 240, 0.1)',
                                  padding: '12px',
                                  borderRadius: '6px',
                                  marginBottom: '15px',
                                  borderLeft: '3px solid #7bc4f0',
                                  color: 'var(--text-muted)',
                                  fontSize: '0.95em',
                                  lineHeight: '1.5'
                                }}>
                                  {schedule}
                                </div>
                              )}

                              <div className="event-specs">
                                {startTime && (
                                  <div className="spec">
                                    <div className="spec-label">Tid</div>
                                    <div className="spec-value">{startTime}</div>
                                  </div>
                                )}
                                {entryFee && (
                                  <div className="spec">
                                    <div className="spec-label">Pris</div>
                                    <div className="spec-value">{entryFee} kr</div>
                                  </div>
                                )}
                                {maxParticipants && (
                                  <div className="spec">
                                    <div className="spec-label">Max deltakere</div>
                                    <div className="spec-value">{maxParticipants}</div>
                                  </div>
                                )}
                                {deltakere && (
                                  <div className="spec">
                                    <div className="spec-label">Deltakere</div>
                                    <div className="spec-value">{deltakere}</div>
                                  </div>
                                )}
                                {format && (
                                  <div className="spec">
                                    <div className="spec-label">Format</div>
                                    <div className="spec-value">{format}</div>
                                  </div>
                                )}
                                {rulesv2 && (
                                  <div className="spec">
                                    <div className="spec-label">Regler</div>
                                    <div className="spec-value">{rulesv2}</div>
                                  </div>
                                )}
                              </div>

                              {signupUrl && (
                                <a 
                                  href={signupUrl} 
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
                        })}
                      </div>
                    </div>
                  )
                ))}
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
                  <p>Ingen arrangementer funnet.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading fullt-program page:', error);

    return (
      <>
        <Header navigation={[]} normalizedSlug="fullt-program" />
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