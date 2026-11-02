import type { ApiResponse, HealthStatus } from '@asta/contracts';
import { isDatabaseReachable } from '@asta/database';
import { NextResponse } from 'next/server';

import { getDatabase } from '@/lib/database';

async function databaseIsUp(): Promise<boolean> {
  try {
    return await isDatabaseReachable(getDatabase());
  } catch (error) {
    // Invalid configuration. Log the cause here; the public response stays generic.
    console.error('Health check could not create the database client', error);
    return false;
  }
}

export async function GET(): Promise<NextResponse<ApiResponse<HealthStatus>>> {
  if (await databaseIsUp()) {
    return NextResponse.json({ success: true, data: { status: 'ok', database: 'up' } });
  }
  return NextResponse.json(
    {
      success: false,
      error: { code: 'SERVICE_UNAVAILABLE', message: 'The service is temporarily unavailable.' },
    },
    { status: 503 },
  );
}
