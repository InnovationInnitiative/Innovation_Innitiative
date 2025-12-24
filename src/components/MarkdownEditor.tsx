
import React, { useRef } from 'react';
import { Bold, Italic, Heading, List, Code, Quote, Type, Link as LinkIcon, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export function MarkdownEditor({ value, onChange, className, placeholder }: MarkdownEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertFormat = (prefix: string, suffix: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + prefix + selection + suffix + after;

        onChange(newText);

        // Restore focus and cursor
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                end + prefix.length
            );
        }, 0);
    };

    return (
        <div className={cn("border border-border rounded-lg bg-card flex flex-col overflow-hidden focus-within:ring-1 focus-within:ring-primary", className)}>
            <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30 overflow-x-auto">
                <ToolbarButton
                    icon={<Bold className="w-4 h-4" />}
                    onClick={() => insertFormat('**', '**')}
                    title="Bold (Ctrl+B)"
                />
                <ToolbarButton
                    icon={<Italic className="w-4 h-4" />}
                    onClick={() => insertFormat('*', '*')}
                    title="Italic (Ctrl+I)"
                />
                <div className="w-px h-4 bg-border mx-1" />
                <ToolbarButton
                    icon={<Heading className="w-4 h-4" />}
                    onClick={() => insertFormat('### ')}
                    title="Heading"
                />
                <ToolbarButton
                    icon={<Quote className="w-4 h-4" />}
                    onClick={() => insertFormat('> ')}
                    title="Quote"
                />
                <div className="w-px h-4 bg-border mx-1" />
                <ToolbarButton
                    icon={<List className="w-4 h-4" />}
                    onClick={() => insertFormat('- ')}
                    title="Bullet List"
                />
                <ToolbarButton
                    icon={<ListOrdered className="w-4 h-4" />}
                    onClick={() => insertFormat('1. ')}
                    title="Numbered List"
                />
                <div className="w-px h-4 bg-border mx-1" />
                <ToolbarButton
                    icon={<Code className="w-4 h-4" />}
                    onClick={() => insertFormat('```\n', '\n```')}
                    title="Code Block"
                />
                <ToolbarButton
                    icon={<LinkIcon className="w-4 h-4" />}
                    onClick={() => insertFormat('[', '](url)')}
                    title="Link"
                />
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 bg-transparent outline-none min-h-[400px] font-mono text-sm resize-y"
                placeholder={placeholder}
            />
            <div className="px-4 py-2 bg-muted/20 border-t border-border text-xs text-muted-foreground flex justify-between">
                <span>Markdown Supported</span>
                <span>{value.length} chars</span>
            </div>
        </div>
    );
}

function ToolbarButton({ icon, onClick, title }: { icon: React.ReactNode, onClick: () => void, title: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="p-2 rounded hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
            title={title}
        >
            {icon}
        </button>
    );
}
