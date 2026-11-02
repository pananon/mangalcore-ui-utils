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
  GradientText,
  Marquee,
  RippleButton,
  ReadingProgress,
  SpotlightCard,
  FadeIn,
  useDebounce,
  useThrottle,
  useLocalStorage,
  useSessionStorage,
  useOutsideClick,
  useMediaQuery,
  useWindowSize,
  useIntersectionObserver,
  useScrollLock,
  usePrevious,
  StreamingText,
  JsonLd,
  useAutoScroll,
  useAutoResizeTextarea,
  useCopyToClipboard,
} from '@mangalcore/ui-utils';
import { useState, useRef, useEffect } from 'react';

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
      <p>
        Now showing <strong>25</strong> components and <strong>14</strong> hooks.
      </p>

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
        <SafeImage
          src="invalid"
          fallback="https://via.placeholder.com/150"
          alt="Fallback"
          width={100}
        />
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
          <div style={{ position: 'fixed', bottom: 10, right: 10, fontSize: 10 }}>
            Portal Active
          </div>
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
            <div
              key={i}
              style={{
                padding: '10px 20px',
                background: '#e5e7eb',
                borderRadius: 6,
              }}
            >
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
              fontSize: 16,
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
          <SpotlightCard
            style={{ padding: 24, color: 'white', aspectRatio: '16/9' }}
            spotlightColor="rgba(59, 130, 246, 0.2)"
          >
            <h2>Feature B</h2>
            <p>This one has a blue spotlight accent.</p>
          </SpotlightCard>
        </div>
      </section>

      <section>
        <h2>22. FadeIn</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <FadeIn delay={100}>
            <div style={{ height: 100, background: '#ddd' }} />
            100ms
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ height: 100, background: '#ccc' }} />
            300ms
          </FadeIn>
          <FadeIn delay={500}>
            <div style={{ height: 100, background: '#bbb' }} />
            500ms
          </FadeIn>
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
          <button onClick={() => setThrottledCount((c) => c + 1)}>Increment Fast!</button>
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
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Toggle Dropdown</button>
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'white',
                  border: '1px solid #ccc',
                  padding: 10,
                  borderRadius: 4,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  width: 200,
                  zIndex: 10,
                  color: 'black',
                }}
              >
                Click outside this box to close it!
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2>28. useMediaQuery</h2>
        <div className="demo-row">
          <div>
            Is Mobile (max-width: 768px)? <strong>{isMobile ? 'Yes' : 'No'}</strong>
          </div>
          <div>
            Is Dark Mode? <strong>{isDarkMode ? 'Yes' : 'No'}</strong>
          </div>
        </div>
      </section>

      <section>
        <h2>29. useWindowSize</h2>
        <div className="demo-row">
          <div>
            Width: <strong>{width}px</strong>
          </div>
          <div>
            Height: <strong>{height}px</strong>
          </div>
        </div>
      </section>

      <section>
        <h2>30. useIntersectionObserver</h2>
        <div className="demo-row">
          <div
            style={{
              height: 100,
              overflow: 'auto',
              border: '1px solid #ccc',
              padding: 10,
            }}
          >
            <div style={{ height: 300, background: 'linear-gradient(#fff, #eee)' }}>
              Scroll down...
            </div>
            <div
              ref={intersectionRef}
              style={{
                padding: 20,
                background: intersectionEntry?.isIntersecting ? '#4ade80' : '#f87171',
                transition: 'background 0.3s',
              }}
            >
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
          <button onClick={() => setCount((c) => c + 1)}>Increment: {count}</button>
          <div style={{ marginTop: 10 }}>
            Previous value was: <strong>{prevCount ?? 'undefined'}</strong>
          </div>
        </div>
      </section>
      <h1 style={{ marginTop: 60 }}>AI chat UI &amp; SEO</h1>
      <AiChatDemo />

      <section>
        <h2>38. JsonLd</h2>
        <div className="demo-row">
          <JsonLd
            id="demo-jsonld"
            data={{
              '@context': 'https://schema.org',
              '@type': 'SoftwareSourceCode',
              name: '@mangalcore/ui-utils',
            }}
          />
          <p>
            Renders an invisible <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code>.
            Inspect the page to see it.
          </p>
        </div>
      </section>
    </div>
  );
}

const REPLY =
  'Sure! Streaming responses arrive in uneven chunks, so useSmoothText reveals them at a steady pace. ' +
  'Scroll up while this types and auto-scroll will stop following until you jump back down.\n\n' +
  'This sentence is here to make the reply long enough to overflow the chat box.';

function AiChatDemo() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const { ref, isAtBottom, scrollToBottom } = useAutoScroll<HTMLDivElement>();
  const inputRef = useAutoResizeTextarea(input, { maxHeight: 120 });
  const { copied, copy } = useCopyToClipboard();

  // Fake an LLM stream: append a few words every 150ms
  useEffect(() => {
    if (!streaming) return;
    const words = REPLY.split(/(?<= )/);
    let i = 0;
    const timer = setInterval(() => {
      const chunk = words.slice(i, i + 3).join('');
      i += 3;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...last, text: last.text + chunk }];
      });
      if (i >= words.length) {
        clearInterval(timer);
        setStreaming(false);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [streaming]);

  const send = () => {
    if (!input.trim() || streaming) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: input },
      { role: 'assistant', text: '' },
    ]);
    setInput('');
    setStreaming(true);
  };

  const lastReply = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <section>
      <h2>
        33–37. StreamingText, useSmoothText, useAutoScroll, useAutoResizeTextarea,
        useCopyToClipboard
      </h2>
      <div className="demo-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div
          ref={ref}
          style={{
            height: 180,
            overflowY: 'auto',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 12,
          }}
        >
          {messages.length === 0 && (
            <p style={{ color: '#9ca3af' }}>Send a message to see a simulated streaming reply.</p>
          )}
          {messages.map((m, i) => (
            <p key={i} style={{ margin: '0 0 12px' }}>
              <strong>{m.role === 'user' ? 'You' : 'AI'}: </strong>
              {m.role === 'assistant' ? (
                <StreamingText text={m.text} isStreaming={streaming && i === messages.length - 1} />
              ) : (
                m.text
              )}
            </p>
          ))}
        </div>
        {!isAtBottom && <button onClick={() => scrollToBottom()}>Jump to latest ↓</button>}
        <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            placeholder="Type a message (Shift+Enter for a new line)"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            style={{ flex: 1, resize: 'none', padding: 8, font: 'inherit' }}
          />
          <button onClick={send} disabled={streaming}>
            Send
          </button>
          <button onClick={() => lastReply && copy(lastReply.text)} disabled={!lastReply}>
            {copied ? 'Copied!' : 'Copy reply'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
