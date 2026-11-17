
(() => {
  'use strict';

  // --- Visuals: all of the chat interface is generated from JavaScript, this is ai made i'm ant this good
  const css = `
    :root { color-scheme: dark; font-family: system-ui, -apple-system, Segoe UI, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: radial-gradient(circle at 0 0, #202a56 0, #10162b 44%, #090e1d 100%); color: #eef2ff; }
    .game-chat { width: min(960px, calc(100% - 32px)); margin: 40px auto; }
    .gc-heading { margin: 0 0 8px; font-size: clamp(26px, 4vw, 40px); letter-spacing: -.035em; }
    .gc-subtitle { margin: 0 0 22px; color: #b4bfd9; }
    .gc-grid { display: grid; grid-template-columns: minmax(250px, 310px) 1fr; gap: 18px; }
    .gc-panel { background: #151d34; border: 1px solid #35415e; border-radius: 18px; padding: 20px; box-shadow: 0 12px 35px #06091755; }
    .gc-panel h2 { font-size: 17px; margin: 0 0 18px; }
    .gc-label { display: block; margin: 14px 0 7px; color: #c6d0eb; font-weight: 600; font-size: 13px; }
    .gc-input { display: block; width: 100%; min-width: 0; padding: 12px 13px; border-radius: 10px; background: #0b1226; border: 1px solid #445171; color: #fff; font: inherit; outline: 0; }
    .gc-input:focus { border-color: #7f9fff; box-shadow: 0 0 0 2px #7f9fff33; }
    .gc-input::placeholder { color: #7e8aa8; }
    .gc-muted { color: #afbbd8; font-size: 12px; line-height: 1.55; }
    .gc-row { display: flex; gap: 9px; align-items: center; }
    .gc-row .gc-input { flex: 1; }
    .gc-button { border: 0; border-radius: 10px; padding: 11px 14px; background: #6b88ff; color: #09132c; font-weight: 750; cursor: pointer; white-space: nowrap; font: inherit; font-weight: 700; }
    .gc-button:hover:not(:disabled) { filter: brightness(1.12); }
    .gc-button:disabled { opacity: .45; cursor: not-allowed; }
    .gc-button.gc-quiet { color: #dce5ff; border: 1px solid #465576; background: #263453; }
    .gc-button.gc-danger { background: #402b42; border: 1px solid #80576c; color: #ffd8e1; }
    .gc-stack { display: grid; gap: 10px; }
    .gc-status { margin: 16px 0 0; font-size: 13px; display: flex; gap: 8px; align-items: flex-start; color: #cbd5ed; min-height: 38px; }
    .gc-dot { flex: 0 0 9px; height: 9px; margin-top: 5px; border-radius: 100px; background: #f3bc67; }
    .gc-dot.connected { background: #63dfaa; }
    .gc-dot.error { background: #fc7888; }
    .gc-chat { display: flex; flex-direction: column; min-height: 515px; }
    .gc-chathead { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #35415e; padding-bottom: 14px; gap: 12px; }
    .gc-chathead h2 { margin: 0; }
    .gc-chathead small { color: #9aaaca; }
    .gc-messages { flex: 1; height: 340px; min-height: 340px; max-height: 480px; overflow: auto; padding: 17px 0; display: flex; flex-direction: column; gap: 12px; }
    .gc-system { align-self: center; max-width: 92%; color: #aab8d5; font-size: 12px; text-align: center; }
    .gc-message { align-self: flex-start; max-width: min(82%, 420px); background: #293957; border: 1px solid #3f5276; border-radius: 13px 13px 13px 4px; padding: 10px 13px; overflow-wrap: anywhere; }
    .gc-message.mine { align-self: flex-end; border-color: #526fe5; background: #394f9c; border-radius: 13px 13px 4px 13px; }
    .gc-message-meta { display: block; font-size: 11px; margin-bottom: 5px; color: #c1cef0; }
    .gc-message-text { font-size: 14px; white-space: pre-wrap; }
    .gc-compose { display: flex; gap: 9px; padding-top: 15px; border-top: 1px solid #35415e; }
    .gc-compose .gc-input { flex: 1; }
    .gc-footer { color: #b6c1dc; font-size: 12px; line-height: 1.55; margin: 15px 0; }
    @media(max-width: 720px) { .game-chat { margin: 20px auto; } .gc-grid { grid-template-columns: 1fr; } .gc-chat { min-height: 430px; } .gc-messages { height: 270px; min-height: 270px; } }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const root = document.createElement('main');
  root.className = 'game-chat';
  root.innerHTML = `
    <h1 class="gc-heading">Chessmate chat</h1>
    <p class="gc-subtitle">A simple live chat for two players no account needed and no encryption for now might be added with WebRTC.</p>
    <div class="gc-grid">
      <section class="gc-panel" aria-label="Connection settings">
        <h2>Connect to a player</h2>
        <label class="gc-label" for="gc-name">Your player name</label>
        <input class="gc-input" id="gc-name" maxlength="24" value="Player" autocomplete="nickname" />
        <label class="gc-label" for="gc-id">Your player ID (send this to a friend)</label>
        <div class="gc-row">
          <input class="gc-input" id="gc-id" readonly value="Loading..." aria-label="Your player ID" />
          <button type="button" class="gc-button gc-quiet" id="gc-copy">Copy</button>
        </div>
        <label class="gc-label" for="gc-friend">Friend's player ID</label>
        <input class="gc-input" id="gc-friend" autocomplete="off" spellcheck="false" placeholder="Paste your friend's ID" />
        <div class="gc-stack" style="margin-top:10px">
          <button type="button" class="gc-button" id="gc-connect" disabled>Connect</button>
          <button type="button" class="gc-button gc-danger" id="gc-disconnect" disabled>Disconnect</button>
        </div>
        <div class="gc-status" aria-live="polite"><span id="gc-dot" class="gc-dot"></span><span id="gc-status-text">Loading connection library...</span></div>
        <p class="gc-muted">chat player 1 shares their ID. Player 2 pastes it and presses Connect. Both leave this page open while chatting. If one page is closed or reloded it will end chat and must start a new one.</p>
      </section>
      <section class="gc-panel gc-chat" aria-label="Chat room">
        <div class="gc-chathead"><h2>Chat no bad words Nick Eh 30 would not like it.</h2><small id="gc-with">No other player connected</small></div>
        <div id="gc-messages" class="gc-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
        <form id="gc-form" class="gc-compose">
          <input class="gc-input" id="gc-message" autocomplete="off" maxlength="500" placeholder="Connect to send a message..." disabled aria-label="Message" />
          <button type="submit" class="gc-button" id="gc-send" disabled>Send</button>
        </form>
      </section>
    </div>
    <p class="gc-footer">somthig</p>
  `;
  document.body.appendChild(root);

  const el = (id) => document.getElementById(id);
  const nameInput = el('gc-name');
  const idInput = el('gc-id');
  const friendInput = el('gc-friend');
  const connectButton = el('gc-connect');
  const disconnectButton = el('gc-disconnect');
  const statusText = el('gc-status-text');
  const dot = el('gc-dot');
  const messageInput = el('gc-message');
  const sendButton = el('gc-send');
  const messages = el('gc-messages');
  const otherPlayer = el('gc-with');

  let peer = null;
  let connection = null;
  let friendName = 'Other player';

  function myName() { return nameInput.value.trim().slice(0, 24) || 'Player'; }
  function setStatus(message, type = 'waiting') {
    statusText.textContent = message;
    dot.className = `gc-dot ${type === 'connected' ? 'connected' : type === 'error' ? 'error' : ''}`;
  }
  function connected() { return Boolean(connection && connection.open); }
  function updateButtons() {
    const hasId = Boolean(peer && peer.id && !peer.destroyed);
    connectButton.disabled = !hasId || Boolean(connection);
    disconnectButton.disabled = !connection;
    sendButton.disabled = !connected();
    messageInput.disabled = !connected();
    messageInput.placeholder = connected() ? 'Say something to your teammate...' : 'Connect to send a message...';
  }
  function systemMessage(text) {
    const node = document.createElement('div');
    node.className = 'gc-system';
    node.textContent = text;
    messages.append(node);
    messages.scrollTop = messages.scrollHeight;
  }
  function addMessage(text, sender, mine) {
    const bubble = document.createElement('div');
    bubble.className = `gc-message${mine ? ' mine' : ''}`;
    const meta = document.createElement('span');
    meta.className = 'gc-message-meta';
    meta.textContent = `${sender} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const body = document.createElement('div');
    body.className = 'gc-message-text';
    body.textContent = text; // Safe: displays text, never injects messages as HTML.
    bubble.append(meta, body);
    messages.append(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function clearConnection(conn, note) {
    if (connection !== conn) return; // Ignore late callbacks from an old connection.
    connection = null;
    friendName = 'Other player';
    otherPlayer.textContent = 'No other player connected';
    if (conn.open) conn.close();
    setStatus(note, 'waiting');
    systemMessage(note);
    updateButtons();
  }

  function attachConnection(conn) {
    if (connection && connection !== conn) {
      conn.close(); // Only one other player can join this chat.
      return;
    }
    connection = conn;
    friendName = 'Other player';
    setStatus('Connecting...', 'waiting');
    updateButtons();

    conn.on('open', () => {
      if (connection !== conn) return;
      setStatus('Connected! You can chat now.', 'connected');
      otherPlayer.textContent = 'Connected to a player';
      systemMessage('Player connected. Say hello!');
      conn.send({ type: 'hello', name: myName() });
      updateButtons();
      messageInput.focus();
    });
    conn.on('data', (data) => {
      if (connection !== conn || !data || typeof data !== 'object') return;
      if (data.type === 'hello' && typeof data.name === 'string') {
        friendName = data.name.trim().slice(0, 24) || 'Other player';
        otherPlayer.textContent = `Talking with ${friendName}`;
      } else if (data.type === 'chat' && typeof data.text === 'string') {
        const text = data.text.trim().slice(0, 500);
        if (text) addMessage(text, friendName, false);
      }
    });
    conn.on('close', () => clearConnection(conn, 'Player disconnected.'));
    conn.on('error', (err) => {
      if (connection !== conn) return;
      setStatus(`Chat connection failed: ${err?.message || 'Unknown error'}`, 'error');
      clearConnection(conn, 'Connection ended. Try again using the player ID.');
    });
  }

  el('gc-copy').addEventListener('click', async () => {
    if (!peer?.id) return;
    try {
      await navigator.clipboard.writeText(peer.id);
      setStatus('Player ID copied! Send it to your friend.');
    } catch (_) {
      idInput.focus();
      idInput.select();
      setStatus('Select/copy the highlighted ID and send it to your friend.');
    }
  });
  connectButton.addEventListener('click', () => {
    const id = friendInput.value.trim();
    if (!id) return setStatus('Paste your friend\'s player ID first.', 'error');
    if (id === peer?.id) return setStatus('Enter your friend\'s ID, not your own.', 'error');
    if (!peer || peer.destroyed) return setStatus('Cannot connect yet. Reload and try again.', 'error');
    try {
      const conn = peer.connect(id, { reliable: true, serialization: 'json' });
      if (!conn) throw new Error('Could not start connection');
      attachConnection(conn);
    } catch (error) {
      setStatus(`Could not connect: ${error.message}`, 'error');
    }
  });
  disconnectButton.addEventListener('click', () => {
    if (!connection) return;
    const conn = connection;
    conn.close();
    clearConnection(conn, 'You disconnected.');
  });
  el('gc-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = messageInput.value.trim();
    if (!text || !connected()) return;
    try {
      connection.send({ type: 'chat', text });
      addMessage(text, myName(), true);
      messageInput.value = '';
      messageInput.focus();
    } catch (error) {
      setStatus(`Could not send message: ${error.message}`, 'error');
    }
  });
  nameInput.addEventListener('change', () => {
    if (connected()) connection.send({ type: 'hello', name: myName() });
  });
  systemMessage('Share your player ID or connect using a friend\'s ID to begin.');

  // PeerJS is loaded from a public CDN; no install, npm or local server code needed.
  function loadPeerJS() {
    return new Promise((resolve, reject) => {
      if (typeof window.Peer === 'function') return resolve();
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/peerjs@1.5.5/dist/peerjs.min.js';
      script.onload = () => typeof window.Peer === 'function' ? resolve() : reject(new Error('PeerJS did not load'));
      script.onerror = () => reject(new Error('Could not load PeerJS; check your internet connection'));
      document.head.appendChild(script);
    });
  }
  loadPeerJS().then(() => {
    peer = new window.Peer(); // Uses PeerJS free cloud service for finding other players.
    setStatus('Getting your player ID...');
    peer.on('open', (id) => {
      idInput.value = id;
      setStatus('Ready. Send your player ID to your friend.');
      updateButtons();
    });
    peer.on('connection', (conn) => attachConnection(conn));
    peer.on('error', (error) => {
      if (error?.type === 'peer-unavailable') {
        if (connection) clearConnection(connection, 'Player ID not found. Check the ID and try again.');
        setStatus('Player not found. Ask your friend for their current ID.', 'error');
      } else {
        setStatus(`Network error: ${error?.message || 'Unknown error'}`, 'error');
        if (connection && !connection.open) clearConnection(connection, 'Unable to connect.');
      }
      updateButtons();
    });
    peer.on('disconnected', () => setStatus('Signaling disconnected. Refresh if you cannot connect.', 'error'));
  }).catch((error) => {
    idInput.value = 'Unavailable';
    setStatus(`${error.message}. Reload to retry.`, 'error');
  });
})();
