import {
    CopyToClipboard,
    TimeAgo,
    AvatarFromName,
    MaskedText,
    FileSize,
    LatencyBadge,
    ProgressRing,
    JsonViewer,
    QRCodeWrapper,
    SafeImage,
    TruncatedText,
    StatusDot,
    KeyboardShortcut,
    SkeletonLoader,
    ClickOutside,
    Portal,
    CountUp,
} from '@mangalcore/ui-utils';
import { useState } from 'react';

function App() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="container">
            <h1>@mangalcore/ui-utils</h1>

            <section>
                <h2>1. CopyToClipboard</h2>
                <div className="demo-row">
                    <span>Click to copy:</span>
                    <CopyToClipboard text="Hello from Mangal Core!" />
                </div>
            </section>

            <section>
                <h2>2. TimeAgo</h2>
                <div className="demo-row">
                    <div>
                        <strong>Now:</strong> <TimeAgo date={new Date()} />
                    </div>
                    <div>
                        <strong>10 mins ago:</strong> <TimeAgo date={new Date(Date.now() - 10 * 60 * 1000)} />
                    </div>
                    <div>
                        <strong>2 days ago:</strong> <TimeAgo date={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)} />
                    </div>
                </div>
            </section>

            <section>
                <h2>3. AvatarFromName</h2>
                <div className="demo-row">
                    <AvatarFromName name="Mangal Core" />
                    <AvatarFromName name="John Doe" size={50} />
                    <AvatarFromName name="Alice Smith" size={32} borderRadius="8px" />
                </div>
            </section>

            <section>
                <h2>4. MaskedText</h2>
                <div className="demo-row">
                    <MaskedText value="sk_live_51MzX...12345" visibleChars={8} />
                    <MaskedText value="+15550192834" visibleChars={4} maskChar="•" />
                </div>
            </section>

            <section>
                <h2>5. FileSize</h2>
                <div className="demo-row">
                    <FileSize bytes={1024} />
                    <FileSize bytes={1234567} />
                    <FileSize bytes={9876543210} />
                </div>
            </section>

            <section>
                <h2>6. LatencyBadge</h2>
                <div className="demo-row">
                    <LatencyBadge ms={45} />
                    <LatencyBadge ms={250} />
                    <LatencyBadge ms={800} />
                </div>
            </section>

            <section>
                <h2>7. ProgressRing</h2>
                <div className="demo-row">
                    <ProgressRing percent={25} />
                    <ProgressRing percent={50} color="#f59e0b" />
                    <ProgressRing percent={75} color="#ef4444" size={80} />
                </div>
            </section>

            <section>
                <h2>8. JsonViewer</h2>
                <JsonViewer
                    data={{
                        name: 'Mangal',
                        roles: ['admin', 'maintainer'],
                        stats: {
                            commits: 342,
                            rating: 4.9,
                        },
                    }}
                    initialExpanded={true}
                />
            </section>

            <section>
                <h2>9. QRCodeWrapper</h2>
                <div className="demo-row">
                    <QRCodeWrapper value="https://mangalcore.com" size={100} />
                    <QRCodeWrapper
                        value="https://github.com/mangalcore"
                        size={100}
                        renderAs="canvas"
                        level="H"
                        includeMargin
                    />
                </div>
            </section>

            <section>
                <h2>10. SafeImage</h2>
                <div className="demo-row">
                    <SafeImage
                        src="https://via.placeholder.com/150"
                        fallback="https://via.placeholder.com/150?text=Fallback"
                        alt="Valid Image"
                        width={100}
                        height={100}
                    />
                    <SafeImage
                        src="https://invalid-url.com/broken.jpg"
                        fallback="https://via.placeholder.com/150?text=Fallback"
                        alt="Broken Image"
                        width={100}
                        height={100}
                    />
                </div>
            </section>

            <section>
                <h2>11. TruncatedText</h2>
                <TruncatedText
                    text="This is a very long text that should probably be truncated because it takes up way too much space in the UI and we want to keep things clean. Users can click to expand if they really want to read the whole thing."
                    charLimit={50}
                />
            </section>

            <section>
                <h2>12. StatusDot</h2>
                <div className="demo-row">
                    <StatusDot status="online" title="Online" />
                    <StatusDot status="busy" pulse title="Busy (Standard)" />
                    <StatusDot status="away" title="Away" />
                    <StatusDot status="offline" title="Offline" />
                    <StatusDot status="custom" color="purple" pulse title="Streaming" />
                </div>
            </section>

            <section>
                <h2>13. KeyboardShortcut</h2>
                <div className="demo-row">
                    <KeyboardShortcut keys={['⌘', 'K']} />
                    <KeyboardShortcut keys={['Ctrl', 'Shift', 'F']} />
                </div>
            </section>

            <section>
                <h2>14. SkeletonLoader</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <SkeletonLoader height={40} width={40} borderRadius="50%" />
                    <SkeletonLoader width={200} height={20} />
                    <SkeletonLoader width={150} height={20} />
                </div>
            </section>

            <section>
                <h2>15. ClickOutside</h2>
                <div className="demo-row">
                    <ClickOutside onClickOutside={() => setModalOpen(false)}>
                        <button onClick={() => setModalOpen(!modalOpen)}>
                            {modalOpen ? 'Click outside to close me' : 'Click to open fake modal'}
                        </button>
                        {modalOpen && (
                            <div style={{ padding: 20, border: '1px solid #ccc', marginTop: 10 }}>
                                I am a modal/dropdown. Click outside this box to close me.
                            </div>
                        )}
                    </ClickOutside>
                </div>
            </section>

            <section>
                <h2>16. Portal</h2>
                <span>See the bottom of body for the portal content</span>
                <Portal>
                    <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#333', color: '#fff', padding: 8, borderRadius: 4, opacity: 0.8, fontSize: 12 }}>
                        I am rendered via &lt;Portal /&gt;
                    </div>
                </Portal>
            </section>

            <section>
                <h2>17. CountUp</h2>
                <div className="demo-row" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    <CountUp end={1000} prefix="$" duration={2500} />
                    <CountUp end={85.5} suffix="%" decimals={1} />
                </div>
            </section>
        </div>
    );
}

export default App;
