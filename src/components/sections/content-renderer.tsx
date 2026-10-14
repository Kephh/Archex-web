import { renderMarkdown } from "@/lib/content/loader";

export function ContentRenderer({ body }: { body: string }) {
  const blocks = renderMarkdown(body);

  return (
    <div className="prose-content">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc pl-5">
              {block.items?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
