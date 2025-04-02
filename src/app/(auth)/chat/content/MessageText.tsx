import React, { useCallback, useMemo } from 'react';

interface Props {
  text: string;
}

export default function MessageText({ text }: Props) {
  const isUrl = useMemo((): boolean => {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlPattern.test(text);
  }, [text]);

  const openInNewTab = useCallback((): void => {
    const formattedUrl = text.startsWith('http') ? text : `https://${text}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  }, [text]);

  if (isUrl) {
    return (
      <span className="cursor-pointer text-blue-500 underline" onClick={openInNewTab} role="link" tabIndex={0}>
        {text}
      </span>
    );
  }

  return <span>{text}</span>;
}
