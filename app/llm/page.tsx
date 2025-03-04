"use client";

import { useEffect, useState } from "react";

export default function LLMPage() {
  // State for homepage data
  const [siteName, setSiteName] = useState("Manansh Shukla");
  const [homepageParagraphs, setHomepageParagraphs] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [xmlContent, setXmlContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Simple escaping for <, >, &
  function escapeXml(str: string) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  useEffect(() => {
    // Fetch both homepage data and blog posts
    Promise.all([
      fetch('/api/homepage').then(res => res.json()),
      fetch('/api/posts').then(res => res.json())
    ])
      .then(([homepageData, postsData]) => {
        // Update state with homepage data
        setSiteName(homepageData.name || "Manansh Shukla");
        setHomepageParagraphs(homepageData.paragraphs || []);
        
        // Update state with blog posts
        setBlogPosts(postsData);
        
        // Build XML with dynamic content
        const xml = `
<mySite>
  <homepage>
    <name>${escapeXml(homepageData.name || siteName)}</name>
${(homepageData.paragraphs || [])
  .map((paragraph) => `    <paragraph>${escapeXml(paragraph)}</paragraph>`)
  .join("\n")}
  </homepage>
  <posts>
${postsData.map((post) => {
  const { title, publishedAt, summary } = post.metadata;
  return `    <post>
      <slug>${post.slug}</slug>
      <title>${escapeXml(title || "")}</title>
      <published>${escapeXml(publishedAt || "")}</published>
      <summary>${escapeXml(summary || "")}</summary>
      <content>${escapeXml(post.content)}</content>
    </post>`;
}).join("\n")}
  </posts>
</mySite>
`.trim();
        
        setXmlContent(xml);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Copy button state
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(xmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to copy\!");
    }
  }

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tighter">LLM.txt</h1>
      
      <div className="w-full mb-8 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-800">
        <h2 className="mb-3 text-lg font-medium">How to use:</h2>
        <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
          <li>Below is an XML snippet containing homepage info and full blog posts</li>
          <li>Click "Copy XML" to copy to clipboard</li>
          <li>Paste into your LLM prompt or any environment that accepts XML</li>
        </ul>
      </div>
      
      {loading ? (
        <p className="my-4">Loading posts...</p>
      ) : (
        <div className="w-full">
          <div className="flex justify-end mb-3">
            <button
              onClick={handleCopy}
              className="text-sm font-medium py-2 px-4 bg-[var(--yinmn-blue)] text-[var(--white)] rounded hover:opacity-90 transition"
            >
              {copied ? "Copied!" : "Copy XML"}
            </button>
          </div>
          
          <div className="w-full rounded-md bg-neutral-800 p-4 text-neutral-200 text-sm overflow-x-auto border border-neutral-700">
            <pre>{xmlContent}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
