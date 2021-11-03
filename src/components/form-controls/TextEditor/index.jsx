import React, { Fragment } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditor(props) {
  const handleEditorChange = (state) => {
    props.onChange(state);
  };

  return (
    <Fragment>
      <label>{props.label}</label>
      <Editor
        editorState={props.state}
        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        onEditorStateChange={handleEditorChange}
        editorStyle={{ borderRadius: '7px', border: '1px solid #e2e3e4' }}
      />
    </Fragment>
  );
}

export default TextEditor;
