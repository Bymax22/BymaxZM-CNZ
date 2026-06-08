import { createSSEStream } from '../../../../lib/sse';

export async function GET() {
  return new Response(createSSEStream(), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
