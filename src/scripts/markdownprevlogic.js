import React, { useState, useEffect } from 'react';
import { marked } from "https://esm.sh/marked";

marked.setOptions({
  breaks: true,
});

const MarkdownLogic = ({ setPreview }) => {
  const [markdown, setMarkdown] = useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here is some code of mine, \`<div></div>\`, between 2 backticks. Important for later #React!

**bold**... whoa! is fabulous!
Or _italic_. _Forza Italia!_
Or... wait for it... **_both!_**
**Errors?** ~~cross them out~~.

[links](https://www.freecodecamp.org), and
> Block Quotes! are provided too!

tables, here they are:

Header1 | Header2 | Header3?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course, there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

\`\`\`
Some code block
\`\`\`
`);

  useEffect(() => {
    setPreview(marked(markdown));
  }, [markdown, setPreview]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <textarea
      id="editor"
      value={markdown}
      onChange={handleChange}
      style={{ height: '150px', width: '100%' }}
    />
  );
};

export default MarkdownLogic;
