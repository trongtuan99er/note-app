import React, {useState, useEffect} from 'react'
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useSubmit, useLocation} from 'react-router-dom'
import { debounce } from '@mui/material'

const NoteDetail = () => {
  const { note } = useLoaderData()
  const submit = useSubmit()
  const location = useLocation()
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
  
  React.useEffect(() => {
    deboundedMemorized(rawHtml, note, location.pathname)
  }, [rawHtml, location.pathname])
  
  const deboundedMemorized = React.useMemo(() => {
    return debounce((rawHtml, note, pathname) => {
      if(rawHtml === note.content) return;

      submit({...note, content: rawHtml}, {
        method: 'post',
        action: pathname
      })
    }, 1000)
  }, [])
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