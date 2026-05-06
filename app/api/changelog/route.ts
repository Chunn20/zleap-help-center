import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'changelog.json');

interface ChangelogEntry {
  version: string;
  date: string;
  features: string[];
  optimizations: string[];
}

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const changelog = JSON.parse(data);
    return NextResponse.json(changelog);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newEntry: ChangelogEntry = await request.json();

    let changelog: ChangelogEntry[] = [];
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      changelog = JSON.parse(data);
    } catch (error) {
      changelog = [];
    }

    changelog.unshift(newEntry);

    fs.writeFileSync(DATA_FILE, JSON.stringify(changelog, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '保存失败' },
      { status: 500 }
    );
  }
}
