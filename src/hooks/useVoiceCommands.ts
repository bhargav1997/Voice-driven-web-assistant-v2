import { useCallback } from 'react';

interface CommandHandlers {
  [key: string]: () => void;
}

interface FormField {
  id: string;
  label: string;
  value: string;
  type: string;
}

export const useVoiceCommands = () => {
  const getCustomFormFields = (): FormField[] => {
    const savedFields = localStorage.getItem('customFormFields');
    return savedFields ? JSON.parse(savedFields) : [];
  };

  const handleFormFill = (fieldId?: string) => {
    const customFields = getCustomFormFields();
    
    if (fieldId) {
      const field = customFields.find(f => f.id === fieldId);
      if (field) {
        const selectors = [
          `input[name*="${field.id}" i]`,
          `input[placeholder*="${field.label}" i]`,
          `input[id*="${field.id}" i]`,
          `textarea[name*="${field.id}" i]`,
          `textarea[placeholder*="${field.label}" i]`,
          `textarea[id*="${field.id}" i]`
        ];
        
        const input = document.querySelector(selectors.join(',')) as HTMLInputElement | HTMLTextAreaElement;
        if (input) {
          input.value = field.value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    } else {
      // Fill all fields
      customFields.forEach(field => handleFormFill(field.id));
    }
  };

  const handleNavigation = (direction: string) => {
    const sections = Array.from(document.querySelectorAll('section, article, div[class*="section"], div[class*="container"]'));
    const viewportHeight = window.innerHeight;
    const scrollAmount = direction === 'next' ? viewportHeight : -viewportHeight;
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  };

  const handleCommand = useCallback((command: string) => {
    const commands: CommandHandlers = {
      // Navigation Commands
      'scroll down': () => window.scrollBy({ top: 100, behavior: 'smooth' }),
      'scroll up': () => window.scrollBy({ top: -100, behavior: 'smooth' }),
      'go back': () => window.history.back(),
      'refresh page': () => window.location.reload(),
      'next section': () => handleNavigation('next'),
      'previous section': () => handleNavigation('previous'),
      'go to top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      'go to bottom': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),

      // Zoom Commands
      'zoom in': () => {
        const html = document.querySelector('html');
        if (html) {
          const currentZoom = parseFloat(html.style.zoom || '1');
          html.style.zoom = `${currentZoom + 0.1}`;
        }
      },
      'zoom out': () => {
        const html = document.querySelector('html');
        if (html) {
          const currentZoom = parseFloat(html.style.zoom || '1');
          html.style.zoom = `${Math.max(0.1, currentZoom - 0.1)}`;
        }
      },
      'reset zoom': () => {
        const html = document.querySelector('html');
        if (html) {
          html.style.zoom = '1';
        }
      },

      // Form Commands
      'fill form': () => handleFormFill(),

      // Tab Management
      'new tab': () => window.open('', '_blank'),
      'close tab': () => window.close(),

      // Reading Commands
      'read page': () => {
        const text = document.body.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      },
      'stop reading': () => window.speechSynthesis.cancel(),
    };

    // Handle fill commands for custom fields
    if (command.startsWith('fill ')) {
      const fieldId = command.slice(5).toLowerCase().replace(/\s+/g, '_');
      handleFormFill(fieldId);
      return;
    }

    // Handle click commands
    if (command.startsWith('click ')) {
      const target = command.slice(6).toLowerCase();
      const elements = Array.from(document.querySelectorAll('button, a, [role="button"], input[type="submit"], input[type="button"]'));
      
      let element = elements.find(el => 
        el.textContent?.toLowerCase().trim() === target ||
        el.getAttribute('aria-label')?.toLowerCase() === target
      );

      if (!element) {
        element = elements.find(el => 
          el.textContent?.toLowerCase().includes(target) ||
          el.getAttribute('aria-label')?.toLowerCase()?.includes(target)
        );
      }

      if (element instanceof HTMLElement) {
        element.click();
        return;
      }
    }

    // Handle focus commands
    if (command.startsWith('focus ')) {
      const target = command.slice(6).toLowerCase();
      const elements = Array.from(document.querySelectorAll('input, textarea, select, [contenteditable="true"]'));
      const element = elements.find(el => 
        el.getAttribute('placeholder')?.toLowerCase().includes(target) ||
        el.getAttribute('aria-label')?.toLowerCase().includes(target) ||
        el.getAttribute('name')?.toLowerCase().includes(target)
      );
      
      if (element instanceof HTMLElement) {
        element.focus();
        return;
      }
    }

    // Execute command if it exists
    const handler = commands[command];
    if (handler) {
      handler();
    }
  }, []);

  return { handleCommand };
};