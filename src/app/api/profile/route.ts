// D:\SkillNova\tempapp\src\app\api\profile\route.ts
import { NextResponse } from 'next/server';
import { initialStudentProfile, StudentProfile } from '@/lib/dataStore';

// In-memory runtime cache for server-side persistence during dev session
let serverProfile: StudentProfile = { ...initialStudentProfile };

export async function GET() {
  return NextResponse.json({
    success: true,
    profile: serverProfile,
    storage: 'server-memory-synced'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server validation
    if (!body.fullName || typeof body.fullName !== 'string') {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }

    if (body.cgpa && (body.cgpa < 0 || body.cgpa > 10)) {
      return NextResponse.json({ success: false, error: 'CGPA must be between 0.0 and 10.0' }, { status: 400 });
    }

    serverProfile = {
      ...serverProfile,
      ...body
    };

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: serverProfile
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process profile update' },
      { status: 500 }
    );
  }
}
