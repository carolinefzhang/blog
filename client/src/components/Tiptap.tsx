import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState } from 'react'

const Tiptap = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
    const [, forceUpdate] = useState({})
    
    const editor = useEditor({
        extensions: [
            StarterKit, 
            Image.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'max-w-full h-auto',
                },
            })
        ], // define your extension array
        content: content, // your content string
        onUpdate: ({ editor }) => {
            forceUpdate({})
            onChange(editor.getHTML())
        },
        onSelectionUpdate: () => {
            forceUpdate({})
        }
    })

    const addImage = () => {
        const url = window.prompt('Enter image URL:')

        if (url) {
            console.log('Adding image with URL:', url)
            editor?.chain().focus().setImage({ 
                src: url,
                alt: 'Image',
                title: 'Image'
            }).run()
            console.log('Image added, current HTML:', editor?.getHTML())
        }
    }

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="border border-gray-300 rounded-t p-2 bg-gray-50 flex gap-2 flex-wrap">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 border rounded ${editor.isActive('bold') ? 'bg-slate-700 text-white' : 'bg-white'}`}
                    type="button"
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 border rounded ${editor.isActive('italic') ? 'bg-slate-700 text-white' : 'bg-white'}`}
                    type="button"
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1 border rounded ${editor.isActive('strike') ? 'bg-slate-700 text-white' : 'bg-white'}`}
                    type="button"
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-700 text-white' : 'bg-white'}`}
                    type="button"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-700 text-white' : 'bg-white'}`}
                    type="button"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-slate-700 text-white' : 'bg-white'}`}
                    type="button"
                >
                    • List
                </button>
                <button
                    onClick={addImage}
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
                    type="button"
                >
                    🖼️ Image
                </button>
            </div>
            <div className="border border-t-0 border-gray-300 rounded-b p-4">
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export default Tiptap