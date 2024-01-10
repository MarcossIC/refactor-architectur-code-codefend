import React from 'react';
import ReactDOM from 'react-dom/client';
import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/tauri';

import './app/views/styles/index.scss';
import './app/views/styles/card.scss';
import './app/views/styles/buttons.scss';
import './app/views/styles/forms.scss';
import './app/views/styles/modal.scss';

import { App } from './app/App';

// Tauri
const RUNNING_IN_TAURI = window.__TAURI__ !== undefined;
const startInstall = () => {
	installUpdate().then(relaunch);
};

const checkTauriUpdates = async () => {
	if (RUNNING_IN_TAURI) {
		try {
			listen('tauri://update-available', (res) =>
				console.log('New version available: ', res),
			);

			const { shouldUpdate } = await checkUpdate();

			console.log(shouldUpdate);
			if (shouldUpdate) {
				await installUpdate();
				await relaunch();
			}
		} catch (e) {
			alert(e);
		}
	}
};

await checkTauriUpdates();

const preRender = () => {
	return (
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(preRender());
