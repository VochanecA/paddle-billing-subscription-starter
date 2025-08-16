'use client';

import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Handle both synchronous and asynchronous parsing
    const parseMarkdown = async () => {
      try {
        const result = await marked.parse(content, {
          gfm: true,
          breaks: true,
          async: true, // Ensure consistent async behavior
        });
        setHtmlContent(result);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtmlContent('<p>Error loading content</p>');
      }
    };

    parseMarkdown();
  }, [content]);

  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
