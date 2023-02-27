import React, {useState, useEffect} from 'react'
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData } from 'react-router-dom'

const NoteDetail = () => {
  const { note } = useLoaderData()
  const [editorState, setEditorState] = useState(()=>{
    return EditorState.createEmpty()
  })

  const [rawHtml, setRawHtml] = useState(note.content)
  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);
  
  useEffect(() => {
    setRawHtml(note.content)
  }, [note.content])
  
  const handleChange = (e) => {
    setEditorState(e)
    setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
  }
  return (
    <Editor 
      editorState={editorState}
      onEditorStateChange={handleChange}
      placeholder="Viết gì đó!"
    />
  )
}

export default NoteDetail