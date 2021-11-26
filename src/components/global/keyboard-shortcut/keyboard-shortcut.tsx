import Modal from '@/components/common/modal/modal';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useMemo, useState } from 'react';
import { fromEvent, Subscription } from 'rxjs';

interface KeyBinding {
  description: string;
  action: () => void;
}

const KeyboardShortcut = () => {
  const [helpModalState, setHelpModalState] = useState<'open' | 'closed'>(
    'closed'
  );

  const router = useRouter();

  const keyBindings: { [key: string]: KeyBinding } = useMemo(
    () => ({
      '?': {
        description: 'Show help',
        action: () => {
          setHelpModalState(helpModalState === 'closed' ? 'open' : 'closed');
        },
      },
      h: {
        description: 'Navigate to Homepage',
        action: () => {
          router.push('/');
        },
      },
    }),
    [helpModalState, router]
  );

  useEffect(() => {
    let keypressSubscription: Subscription;
    keypressSubscription = fromEvent(document, 'keydown').subscribe({
      next: ($event: Event) => {
        const key = ($event as KeyboardEvent).key;
        keyBindings[key]?.action();
      },
    });

    return () => {
      if (keypressSubscription) {
        keypressSubscription.unsubscribe();
      }
    };
  }, [keyBindings]);

  const closeHelpModal = () => {
    setHelpModalState('closed');
  };

  return (
    <Modal
      title="Keyboard Shortcuts"
      state={helpModalState}
      onClose={closeHelpModal}
    >
      {Object.keys(keyBindings).map((key) => (
        <div key={key} className="my-2 flex justify-between items-center">
          <span>{keyBindings[key].description}</span>
          <span className="p-2 rounded bg-background-300 inline-block mr-2">
            {key}
          </span>
        </div>
      ))}
    </Modal>
  );
};

export default KeyboardShortcut;
