import { useEffect, useState } from 'react';
import './AnimatedBox.css';

const codeLines = [
  "const user = {",
  "  name: 'Santhosh',",
  "  availability: 'Full-time',",
  "  values: [",
  "      'Integrity',",
  "      'Creativity',",
  "      'Collaboration',",
  "  ],",
  "  lookingFor: 'Innovative Challenges'",
  "};",
  "",
  "deploy(user);"
];

const AnimatedBox = () => {
  const [typedLines, setTypedLines] = useState([]);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let lineBuffer = '';

    const typeNextChar = () => {
      if (currentLine >= codeLines.length) {
        setShowCursor(true);
        return;
      }

      const fullLine = codeLines[currentLine];

      if (currentChar < fullLine.length) {
        setShowCursor(true);
        lineBuffer += fullLine[currentChar];
        setTypedLines((prevLines) => {
            const updatedLines = [...prevLines];
            updatedLines[currentLine] = lineBuffer;
            return updatedLines;
        });
        currentChar++;
      } else {
        currentLine++;
        currentChar = 0;
        lineBuffer = '';
        setShowCursor(false);
      }

      setTimeout(typeNextChar, 75);
    };

    setTypedLines(['']);
    typeNextChar();
  }, []);

  return (
    <div className="animated-box">
      {typedLines.map((line, index) => (
        <pre className="code-line" key={index}>
          {line}
          {index === typedLines.length - 1 && showCursor && (
            <span className="cursor">|</span>
          )}
        </pre>
      ))}
    </div>
  );
};

export default AnimatedBox;