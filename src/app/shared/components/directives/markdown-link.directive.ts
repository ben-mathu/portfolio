import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[markdown-link]',
    standalone: false
})
export class MarkdownLinkDirective {
  constructor() {}

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    console.log('Pasting as markdown link');
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text/plain') || '';

    const textarea = event.target as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end, textarea.value.length);

    const highLightedText = textarea.value.substring(start, end);
    const markdownLink = `[${highLightedText}](${pastedText})`;

    textarea.value = textBefore + markdownLink + textAfter;
    const cursorPosition = start + markdownLink.length;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
    textarea.dispatchEvent(new Event('input'));
  }
}
