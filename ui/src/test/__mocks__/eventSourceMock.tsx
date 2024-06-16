/* eslint-disable @typescript-eslint/no-explicit-any */
class MockEventSource extends EventTarget {
  url: string;
  withCredentials: boolean;
  readyState: number;
  onopen: ((event: Event) => void) | null;
  onmessage: ((event: MessageEvent) => void) | null;
  onerror: ((error: any) => void) | null;
  //   addEventListener: ((name: string, listener: (arg: any) => void) => void) | null;
  //   removeEventListener: ((name: string, listener: (arg: any) => void) => void) | null;

  static CONNECTING: number;
  static OPEN: number;
  static CLOSED: number;

  constructor(url: string, eventSourceInitDict?: EventSourceInit) {
    super();
    this.url = url;
    this.withCredentials = eventSourceInitDict?.withCredentials || false;
    this.readyState = MockEventSource.CONNECTING;
    this.onopen = null;
    this.onmessage = null;
    this.onerror = null;

    // this.addEventListener = null;
    // this.removeEventListener = null;
  }

  simulateOpen() {
    this.readyState = MockEventSource.OPEN;
    if (this.onopen) {
      const event = new Event('open');
      this.onopen(event);
    }
  }

  simulateMessage(data: any) {
    if (this.onmessage) {
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify(data),
        lastEventId: '',
        origin: '',
        ports: undefined,
        source: null,
        bubbles: false,
        cancelable: false,
        composed: false,
      });
      this.onmessage(messageEvent);
    }
  }

  simulateError(error: any) {
    if (this.onerror) {
      this.onerror(error);
    }
  }

  close() {
    this.readyState = MockEventSource.CLOSED;
  }
}

MockEventSource.CONNECTING = 0;
MockEventSource.OPEN = 1;
MockEventSource.CLOSED = 2;

export default MockEventSource;
