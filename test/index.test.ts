import * as fs from 'fs';
import path from 'path';
import { hexoIs, hexoIsDump } from '../src/index';

describe('hexoIs', () => {
  it('should return undefined if hexo is undefined', () => {
    expect(hexoIs(undefined as any)).toBeUndefined();
  });

  it('should call internalis if hexo.page is defined', () => {
    const fakeHexo = { page: { path: '/', title: 'test page' } };
    const result = hexoIs(fakeHexo as any);
    expect(result).toBeDefined();
  });

  it('should set type property to true if hexo.type is defined', () => {
    const fakeHexo = { type: 'home' };
    const result = hexoIs(fakeHexo as any);
    expect(result).toBeDefined();
    if (result) expect(result['home']).toBe(true);
  });
});

describe('hexoIsDump', () => {
  const tmpDir = path.join('tmp', 'hexo-is');
  const dumpFile = path.join(tmpDir, 'dump-test.txt');

  afterEach(() => {
    if (fs.existsSync(dumpFile)) {
      fs.unlinkSync(dumpFile);
    }
    if (fs.existsSync(tmpDir)) {
      fs.rmdirSync(tmpDir, { recursive: true });
    }
  });

  it('should dump variable to file', () => {
    const obj = { foo: 'bar' };
    hexoIsDump(obj, 'test');
    expect(fs.existsSync(dumpFile)).toBe(true);
    const content = fs.readFileSync(dumpFile, 'utf-8');
    expect(content).toContain('foo');
  });
});
