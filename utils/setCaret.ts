export const setCaret = (ref: HTMLSpanElement | null) => {
  if (ref) {
    const newRange = document.createRange();
    if (ref.childNodes.length > 0) {
      newRange.setStart(ref.childNodes[0], ref.innerText.length);
      newRange.setEnd(ref.childNodes[0], ref.innerText.length);

      const selection = document.getSelection();
      if (selection) {
        selection?.removeAllRanges();
        selection?.addRange(newRange);
      }
    }
  }
};
