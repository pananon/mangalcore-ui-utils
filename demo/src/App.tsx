import {
    CopyToClipboard, TimeAgo, AvatarFromName, MaskedText, FileSize, LatencyBadge,
    ProgressRing, JsonViewer, QRCodeWrapper, SafeImage, TruncatedText, StatusDot,
    KeyboardShortcut, SkeletonLoader, ClickOutside, Portal, CountUp,
    GradientText, Marquee, RippleButton, ReadingProgress, SpotlightCard, FadeIn
} from '@mangalcore/ui-utils';
import { useState } from 'react';

function App() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container" style={{ paddingBottom: 200 }}>
            {/* 4. ReadingProgress */}
            <ReadingProgress color="#8b5cf6" />

            <h1>@mangalcore/ui-utils</h1>
            <p>Now showing <strong>23</strong> production-ready utility components.</p>

            {/* Previous 17 components */}
            <section>
                <h2>1. CopyToClipboard</h2>
                <div className="demo-row">
                    <CopyToClipboard text="Hello from Mangal Core!" />
                </div>
            </section>

            <section>
                <h2>2. TimeAgo</h2>
                <div className="demo-row">
                    <TimeAgo date={new Date()} />
                </div>
            </section>

            <section>
                <h2>3. AvatarFromName</h2>
                <div className="demo-row">
                    <AvatarFromName name="Mangal Core" />
                </div>
            </section>

            <section>
                <h2>4. MaskedText</h2>
                <div className="demo-row">
                    <MaskedText value="sk_live_51MzX...12345" visibleChars={8} />
                </div>
            </section>

            <section>
                <h2>5. FileSize</h2>
                <div className="demo-row">
                    <FileSize bytes={1234567} />
                </div>
            </section>

            <section>
                <h2>6. LatencyBadge</h2>
                <div className="demo-row">
                    <LatencyBadge ms={250} />
                </div>
            </section>

            <section>
                <h2>7. ProgressRing</h2>
                <div className="demo-row">
                    <ProgressRing percent={75} />
                </div>
            </section>

            <section>
                <h2>8. JsonViewer</h2>
                <JsonViewer data={{ foo: 'bar' }} initialExpanded />
            </section>

            <section>
                <h2>9. QRCodeWrapper</h2>
                <QRCodeWrapper value="https://mangalcore.com" size={100} />
            </section>

            <section>
                <h2>10. SafeImage</h2>
                <SafeImage src="invalid" fallback="https://via.placeholder.com/150" alt="Fallback" width={100} />
            </section>

            <section>
                <h2>11. TruncatedText</h2>
                <TruncatedText text="Very long text example..." charLimit={10} />
            </section>

            <section>
                <h2>12. StatusDot</h2>
                <StatusDot status="online" />
            </section>

            <section>
                <h2>13. KeyboardShortcut</h2>
                <KeyboardShortcut keys={['⌘', 'K']} />
            </section>

            <section>
                <h2>14. SkeletonLoader</h2>
                <SkeletonLoader width={200} height={20} />
            </section>

            <section>
                <h2>15. ClickOutside</h2>
                <ClickOutside onClickOutside={() => setModalOpen(false)}>
                    <button onClick={() => setModalOpen(!modalOpen)}>
                        {modalOpen ? 'Open (Click outside to close)' : 'Closed'}
                    </button>
                </ClickOutside>
            </section>

            <section>
                <h2>16. Portal</h2>
                <Portal>
                    <div style={{ position: 'fixed', bottom: 10, right: 10, fontSize: 10 }}>Portal Active</div>
                </Portal>
            </section>

            <section>
                <h2>17. CountUp</h2>
                <CountUp end={100} />
            </section>

            {/* NEW COOL UTILS */}

            <section>
                <h2>18. GradientText</h2>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    <GradientText animate>Mangal Core UI Utils</GradientText>
                </div>
            </section>

            <section>
                <h2>19. Marquee</h2>
                <Marquee pauseOnHover gap={40}>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} style={{
                            padding: '10px 20px',
                            background: '#e5e7eb',
                            borderRadius: 6
                        }}>
                            Brand {i + 1}
                        </div>
                    ))}
                </Marquee>
            </section>

            <section>
                <h2>20. RippleButton</h2>
                <div className="demo-row">
                    <RippleButton
                        style={{
                            padding: '12px 24px',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: 16
                        }}
                    >
                        Click Me for Ripple
                    </RippleButton>
                </div>
            </section>

            <section>
                <h2>21. SpotlightCard</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <SpotlightCard style={{ padding: 24, color: 'white', aspectRatio: '16/9' }}>
                        <h2>Feature A</h2>
                        <p>Hover over this card to see the spotlight effect tracing your mouse cursor.</p>
                    </SpotlightCard>
                    <SpotlightCard style={{ padding: 24, color: 'white', aspectRatio: '16/9' }} spotlightColor="rgba(59, 130, 246, 0.2)">
                        <h2>Feature B</h2>
                        <p>This one has a blue spotlight accent.</p>
                    </SpotlightCard>
                </div>
            </section>

            <section>
                <h2>22. FadeIn</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    <FadeIn delay={100}><div style={{ height: 100, background: '#ddd' }} />100ms</FadeIn>
                    <FadeIn delay={300}><div style={{ height: 100, background: '#ccc' }} />300ms</FadeIn>
                    <FadeIn delay={500}><div style={{ height: 100, background: '#bbb' }} />500ms</FadeIn>
                </div>
            </section>
        </div>
    );
}

export default App;
