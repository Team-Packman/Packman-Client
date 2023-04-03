import React, { useEffect, useState } from 'react';
import { Utility } from '../Utility';

interface InstallGuide {
  standAlone: boolean;
  open: boolean;
  agent: 'ios' | 'and';
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function useInstallGuide(): [InstallGuide, () => void, () => void] {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>();
  const [installGuide, setInstallGuide] = useState<InstallGuide>({
    agent: 'ios',
    standAlone: false,
    open: false,
  });

  const isRunningStandalone = () => {
    return window.matchMedia('(display-mode: standalone)').matches;
  };

  const installHandler = () => {
    if (deferredPrompt !== undefined) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // installed
        }
        setDeferredPrompt(undefined);
      });
    } else {
      //  'already installed or not android'
    }
  };

  const closeGuide = () => setInstallGuide((prev) => ({ ...prev, open: false }));

  useEffect(() => {
    if (!isRunningStandalone()) {
      if (Utility.isIos()) {
        setInstallGuide((prev) => ({ ...prev, agent: 'ios', open: true }));
      } else {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          setDeferredPrompt(e as BeforeInstallPromptEvent);
          setInstallGuide((prev) => ({ ...prev, agent: 'and', open: true }));

          return false;
        });
      }
    } else {
      setInstallGuide((prev) => ({ ...prev, standAlone: true, open: false }));
    }
  }, []);

  return [installGuide, installHandler, closeGuide];
}

export default useInstallGuide;
