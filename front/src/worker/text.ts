export const saveFile = (contents: string, filename: string) => {
  const blob = new Blob([contents], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);

  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
};
