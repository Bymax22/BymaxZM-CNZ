import { NextRequest } from 'next/server';

export function sanitizePayload(payload: any, allowedFields: string[]) {
  if (!payload || typeof payload !== 'object') return payload;
  const sanitized: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      sanitized[field] = payload[field];
    }
  }
  return sanitized;
}

export async function buildProxyInit(request: NextRequest, allowedFields?: string[], session?: any) {
  const init: any = {
    method: request.method,
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    credentials: 'include',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const bodyText = await request.text();
    if (bodyText) {
      if (allowedFields) {
        try {
          const parsed = JSON.parse(bodyText);
          const filtered = sanitizePayload(parsed, allowedFields);
          init.body = JSON.stringify(filtered);
        } catch {
          init.body = bodyText;
        }
      } else {
        init.body = bodyText;
      }
    }
  }

  return init;
}
