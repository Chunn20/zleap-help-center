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

function verifyAdmin(request: NextRequest) {
  const pw = request.headers.get('x-admin-password');
  const correctPassword = process.env.CHANGELOG_ADMIN_PASSWORD || 'zleap2024';
  return pw === correctPassword;
}

export async function DELETE(request: NextRequest) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const url = new URL(request.url);
    let version = url.searchParams.get('version');

    if (!version) {
      try {
        const body = await request.json();
        version = body.version;
      } catch (error) {
        // ignore
      }
    }

    if (!version) {
      return NextResponse.json({ error: '缺少 version 参数' }, { status: 400 });
    }

    let changelog: ChangelogEntry[] = [];
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      changelog = JSON.parse(data);
    } catch (error) {
      changelog = [];
    }

    const idx = changelog.findIndex((e) => e.version === version);
    if (idx === -1) {
      return NextResponse.json({ error: '未找到对应版本' }, { status: 404 });
    }

    changelog.splice(idx, 1);

    fs.writeFileSync(DATA_FILE, JSON.stringify(changelog, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
