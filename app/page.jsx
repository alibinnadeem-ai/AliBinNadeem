import { readFileSync } from 'node:fs';
import path from 'node:path';
import LegacyPage from './legacy-page';

function extractFirst(source, pattern) {
  return source.match(pattern)?.[1] ?? '';
}

function getLegacyPage() {
  const htmlPath = path.join(process.cwd(), 'frontend', 'index.html');
  const html = readFileSync(htmlPath, 'utf8');
  const styles = extractFirst(html, /<style>([\s\S]*?)<\/style>/i);
  const body = extractFirst(html, /<body[^>]*>([\s\S]*?)<\/body>/i);
  const scripts = [...body.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1],
  );
  const markup = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  return { styles, markup, scripts };
}

export default function Page() {
  const { styles, markup, scripts } = getLegacyPage();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <LegacyPage markup={markup} scripts={scripts} />
    </>
  );
}
