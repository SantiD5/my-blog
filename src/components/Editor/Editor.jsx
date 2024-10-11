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
import React, { useState } from 'react';
import './Editor.css'; // Custom CSS file

const Tiptap = ({ onContentChange }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [alignment, setAlignment] = useState('left');
  const [isReadingMode, setIsReadingMode] = useState(false);

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
        HTMLAttributes: {
          class: 'flex items-center space-x-2 ',
        },
      }),
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'notion-paragraph',
          style: `text-align: ${alignment}`,
        },
      }),
      Text,
      Image,
      Link,
      Table,
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: '<p>Start writing like in Notion!</p>',
    autofocus: true,
    onUpdate({ editor }) {
      if (!isReadingMode) {
        const text = editor.getText(); 
        const words = text.split(/\s+/).filter(Boolean);
        setWordCount(words.length);
        setCharCount(text.length);
      }
    },
    editable: !isReadingMode,
  });

  const getEditorContent = () => {
    const content = editor.getJSON();  // Get content as JSON
    onContentChange(content);  // Send content to parent or other component
    console.log(content); // Log the JSON content
  };

  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);
  };

  // Function to insert an image
  const insertImage = () => {
    const imageUrl = prompt('Enter the image URL:');
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="toolbar flex flex-wrap">
        {/* Text styling buttons */}
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          className={editor.isActive('bold') ? 'active' : ''} 
          disabled={isReadingMode}>
          Bold
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          className={editor.isActive('italic') ? 'active' : ''} 
          disabled={isReadingMode}>
          Italic
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleUnderline().run()} 
          className={editor.isActive('underline') ? 'active' : ''} 
          disabled={isReadingMode}>
          Underline
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleStrike().run()} 
          className={editor.isActive('strike') ? 'active' : ''} 
          disabled={isReadingMode}>
          Strikethrough
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          className={editor.isActive('heading', { level: 1 }) ? 'active' : ''} 
          disabled={isReadingMode}>
          H1
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''} 
          disabled={isReadingMode}>
          H2
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          className={editor.isActive('heading', { level: 3 }) ? 'active' : ''} 
          disabled={isReadingMode}>
          H3
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          className={editor.isActive('bulletList') ? 'active' : ''} 
          disabled={isReadingMode}>
          Bullet List
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          className={editor.isActive('orderedList') ? 'active' : ''} 
          disabled={isReadingMode}>
          Ordered List
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleTaskList().run()} 
          className={editor.isActive('taskList') ? 'active' : ''} 
          disabled={isReadingMode}>
          Task List
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          className={editor.isActive('blockquote') ? 'active' : ''} 
          disabled={isReadingMode}>
          Blockquote
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
          className={editor.isActive('codeBlock') ? 'active' : ''} 
          disabled={isReadingMode}>
          Code Block
        </button>
        
        {/* Insert image button */}
        <button 
          onClick={insertImage} 
          disabled={isReadingMode}>
          Insert Image
        </button>
        
        {/* Reading mode toggle */}
        <button 
          onClick={toggleReadingMode} 
          className={isReadingMode ? 'active' : ''}>
          {isReadingMode ? 'Exit Reading Mode' : 'Enter Reading Mode'}
        </button>
      </div>

      <div className="stats">
        <p>Word Count: {wordCount}</p>
        <p>Character Count: {charCount}</p>
      </div>

      <EditorContent editor={editor} />

      {/* Get the content on button click */}
      <button 
  className="bg-blue-500 mt-20 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150"
  onClick={getEditorContent}>
  Save Content
    </button>
    </div>
  );
};

export default Tiptap;
