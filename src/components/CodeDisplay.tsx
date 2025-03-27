"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChevronDown, ChevronUp, Code as CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CodeSnippet {
  title: string;
  code: string;
  language: string;
  description: string;
}

interface CodeDisplayProps {
  codeSnippets: CodeSnippet[];
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ codeSnippets }) => {
  const [showCode, setShowCode] = useState(false);

  const getLanguage = (language: string) => {
    if (language === "typescript") return "tsx";
    return language;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={codeSnippets[0].title} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            {codeSnippets.map((snippet) => (
              <TabsTrigger key={snippet.title} value={snippet.title}>
                {snippet.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1"
          >
            <CodeIcon className="h-4 w-4" />
            {showCode ? (
              <>
                <span>Hide Code</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show Code</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {codeSnippets.map((snippet) => (
          <TabsContent key={snippet.title} value={snippet.title}>
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">
                {snippet.description}
              </p>
            </div>

            {showCode && (
              <div className="rounded-md overflow-hidden transition-all">
                <SyntaxHighlighter
                  language={getLanguage(snippet.language)}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    maxHeight: "400px",
                    overflow: "auto",
                  }}
                  wrapLines={true}
                  wrapLongLines={false}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeDisplay;
