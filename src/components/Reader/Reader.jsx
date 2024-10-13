import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import './Reader.css'; // Custom CSS file

export const Reader = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Strike,
      Blockquote,
      CodeBlock,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Document,
      Paragraph,
      Text,
      Image,
      Link,
      Table,
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: content || '<h1>Error has ocurred!</h1>', // Fallback if no content is provided
    autofocus: true,
    editable: false, // This is a reader, not an editor
  });

  // Update editor content when the prop changes
  useEffect(() => {
    if (editor && content) {
      let parsedContent;

      // Check if the content is a string and needs parsing
      if (typeof content === 'string') {
        try {
          parsedContent = JSON.parse(content);
        } catch (error) {
          console.error('Error parsing content JSON:', error);
          return; // Exit if JSON parsing fails
        }
      } else {
        parsedContent = content; // Assume content is already a JS object
      }

      // Update editor content with parsed content
      editor.commands.setContent(parsedContent);
    }
  }, [content, editor]);

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  ); 
};
