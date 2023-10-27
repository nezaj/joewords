import { Fragment } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsLight";

export default function Fence({ code, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={code.trimEnd()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <code>
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                {"\n"}
              </Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
