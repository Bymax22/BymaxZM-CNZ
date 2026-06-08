type SSEPayload = {
  resource: 'content' | 'project' | 'event' | 'user' | 'submission' | 'notification';
  action: 'created' | 'updated' | 'deleted';
  id?: string;
  data?: any;
  timestamp?: string;
};

type Subscriber = (payload: SSEPayload) => void;

const subscribers = new Set<Subscriber>();

export function emitUpdate(payload: SSEPayload) {
  const eventPayload = {
    timestamp: new Date().toISOString(),
    ...payload,
  };
  subscribers.forEach((subscriber) => subscriber(eventPayload));
}

export function createSSEStream(): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (payload: SSEPayload) => {
        controller.enqueue(encoder.encode(`event: update\ndata: ${JSON.stringify(payload)}\n\n`));
      };

      subscribers.add(send);
      controller.enqueue(encoder.encode('retry: 5000\n\n'));

      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(': ping\n\n'));
      }, 15000);

      const cleanup = () => {
        clearInterval(keepAlive);
        subscribers.delete(send);
      };

      controller.signal.addEventListener('abort', cleanup);
    },
    cancel() {
      // The abort listener above will handle cleanup
    },
  });
}
