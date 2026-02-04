import {
    CopyToClipboard, TimeAgo, AvatarFromName, MaskedText, FileSize, LatencyBadge,
    ProgressRing, JsonViewer, QRCodeWrapper, SafeImage, TruncatedText, StatusDot,
    KeyboardShortcut, SkeletonLoader, ClickOutside, Portal, CountUp,
    GradientText, Marquee, RippleButton, ReadingProgress, SpotlightCard, FadeIn,
    useDebounce, useThrottle, useLocalStorage, useSessionStorage,
    useOutsideClick, useMediaQuery, useWindowSize, useIntersectionObserver,
    useScrollLock, usePrevious
} from '@mangalcore/ui-utils';
import { useState, useRef } from 'react';

function App() {
    const [modalOpen, setModalOpen] = useState(false);

    // 23. useDebounce
    const [debouncedInput, setDebouncedInput] = useState('');
    const debouncedValue = useDebounce(debouncedInput, 500);

    // 24. useThrottle
    const [throttledCount, setThrottledCount] = useState(0);
    const throttledValue = useThrottle(throttledCount, 1000);

    // 25. useLocalStorage
    const [lsName, setLsName] = useLocalStorage('demo-ls-name', 'Guest');

    // 26. useSessionStorage
    const [ssName, setSsName] = useSessionStorage('demo-ss-name', 'Session Guest');

    // 27. useOutsideClick
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

    // 28. useMediaQuery
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // 29. useWindowSize
    const { width, height } = useWindowSize();

    // 30. useIntersectionObserver
    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersectionEntry = useIntersectionObserver(intersectionRef, { threshold: 0.5 });

    // 31. useScrollLock
    const [isLocked, setIsLocked] = useState(false);
    useScrollLock(isLocked);

    // 32. usePrevious
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

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
            <section>
                <h2>23. useDebounce</h2>
                <div className="demo-row" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input
                        type="text"
                        value={debouncedInput}
                        onChange={(e) => setDebouncedInput(e.target.value)}
                        placeholder="Type fast..."
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    <div>
                        <strong>Actual:</strong> {debouncedInput} <br />
                        <strong>Debounced (500ms):</strong> {debouncedValue}
                    </div>
                </div>
            </section>

            <section>
                <h2>24. useThrottle</h2>
                <div className="demo-row" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button onClick={() => setThrottledCount(c => c + 1)}>
                        Increment Fast!
                    </button>
                    <div>
                        <strong>Count:</strong> {throttledCount} <br />
                        <strong>Throttled (1s):</strong> {throttledValue}
                    </div>
                </div>
            </section>

            <section>
                <h2>25. useLocalStorage</h2>
                <div className="demo-row">
                    <input
                        type="text"
                        value={lsName}
                        onChange={(e) => setLsName(e.target.value)}
                        placeholder="Type to persist in LS..."
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
                    />
                    <small>Refresh the page to see this value persist.</small>
                </div>
            </section>

            <section>
                <h2>26. useSessionStorage</h2>
                <div className="demo-row">
                    <input
                        type="text"
                        value={ssName}
                        onChange={(e) => setSsName(e.target.value)}
                        placeholder="Type to persist in Session..."
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
                    />
                    <small>Visible in this tab session only.</small>
                </div>
            </section>

            <section>
                <h2>27. useOutsideClick</h2>
                <div className="demo-row">
                    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            Toggle Dropdown
                        </button>
                        {isDropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', left: 0,
                                background: 'white', border: '1px solid #ccc',
                                padding: 10, borderRadius: 4, boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                width: 200, zIndex: 10, color: 'black'
                            }}>
                                Click outside this box to close it!
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <h2>28. useMediaQuery</h2>
                <div className="demo-row">
                    <div>Is Mobile (max-width: 768px)? <strong>{isMobile ? 'Yes' : 'No'}</strong></div>
                    <div>Is Dark Mode? <strong>{isDarkMode ? 'Yes' : 'No'}</strong></div>
                </div>
            </section>

            <section>
                <h2>29. useWindowSize</h2>
                <div className="demo-row">
                    <div>Width: <strong>{width}px</strong></div>
                    <div>Height: <strong>{height}px</strong></div>
                </div>
            </section>

            <section>
                <h2>30. useIntersectionObserver</h2>
                <div className="demo-row">
                    <div style={{
                        height: 100, overflow: 'auto', border: '1px solid #ccc', padding: 10
                    }}>
                        <div style={{ height: 300, background: 'linear-gradient(#fff, #eee)' }}>
                            Scroll down...
                        </div>
                        <div ref={intersectionRef} style={{
                            padding: 20, background: intersectionEntry?.isIntersecting ? '#4ade80' : '#f87171',
                            transition: 'background 0.3s'
                        }}>
                            {intersectionEntry?.isIntersecting ? 'Visible!' : 'Not Visible'}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2>31. useScrollLock</h2>
                <div className="demo-row">
                    <button onClick={() => setIsLocked(!isLocked)}>
                        {isLocked ? 'Unlock Scroll' : 'Lock Scroll'}
                    </button>
                    {isLocked && <div style={{ marginTop: 10, color: 'red' }}>Scroll is locked!</div>}
                </div>
            </section>

            <section>
                <h2>32. usePrevious</h2>
                <div className="demo-row">
                    <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>
                    <div style={{ marginTop: 10 }}>
                        Previous value was: <strong>{prevCount ?? 'undefined'}</strong>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
