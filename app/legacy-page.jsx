'use client';

import { useEffect, useRef } from 'react';

export default function LegacyPage({ markup, scripts }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const scriptNodes = scripts.map((content) => {
      const script = document.createElement('script');
      script.text = content;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      scriptNodes.forEach((script) => script.remove());
    };
  }, [scripts]);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: markup }}
      suppressHydrationWarning
    />
  );
}
