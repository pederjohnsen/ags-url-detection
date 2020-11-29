import test from 'ava';
import {JSDOM} from 'jsdom';
import stripIndent from 'strip-indent';
import * as pageDetect from './index'; // `index` ensures that it loads the source, not what's specified in `package.json`
import collector from './collector';

const {window} = new JSDOM('…');

(global as any).document = window.document;
(global as any).location = new URL('https://www.adventuregamestudio.co.uk/');

const allUrls = new Set<string>([...collector.values()].flat());

for (const [detectName, detect] of Object.entries(pageDetect)) {
	if (typeof detect !== 'function') {
		continue;
	}

	const validURLs = collector.get(detectName);

	if (String(detect).startsWith('() =>')) {
		continue;
	}

	test(detectName + ' has tests', t => {
		t.true(
			Array.isArray(validURLs),
			`The function \`${detectName}\` doesn’t have any tests. Set them via \`collect.set()\``,
		);
	});

	if (!Array.isArray(validURLs)) {
		continue;
	}

	for (const url of validURLs) {
		test(`${detectName} ${url.replace('https://www.adventuregamestudio.co.uk', '')}`, t => {
			t.true(
				detect(new URL(url)),
				stripIndent(`
				Is this URL \`${detectName}\`?
					${url.replace('https://www.adventuregamestudio.co.uk', '')}

				• Yes? The \`${detectName}\` test is wrong and should be fixed.
				• No? Remove it from its \`collect.set()\` array.
			`),
			);
		});
	}

	for (const url of allUrls) {
		if (!validURLs.includes(url)) {
			test(`${detectName} NO ${url}`, t => {
				t.false(
					detect(new URL(url)),
					stripIndent(`
					Is this URL \`${detectName}\`?
						${url.replace('https://www.adventuregamestudio.co.uk', '')}

					• Yes? Add it to the \`collect.set()\` array.
					• No? The \`${detectName}\` test is wrong and should be fixed.
				`),
				);
			});
		}
	}
}

const getGameInfo = pageDetect.utils.getGameInfo;
test('getGameInfo', t => {
	const inputTypes = [
		getGameInfo, // Full URL
		(url: string) => getGameInfo(new URL(url).pathname), // Pathname only
		(url: string) => getGameInfo(new URL(url)), // URL object
	];
	for (const getGameInfoAdapter of inputTypes) {
		t.is(getGameInfoAdapter('https://www.adventuregamestudio.co.uk'), undefined);
		t.deepEqual(getGameInfoAdapter('https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots'), {
			owner: '',
			name: '',
			path: '',
		});
		t.deepEqual(getGameInfoAdapter('https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/download/1'), {
			owner: '',
			name: '',
			path: 'download/1',
		});
		t.deepEqual(getGameInfoAdapter('https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/mirror/1/'), {
			owner: '',
			name: '',
			path: 'mirror/1',
		});
		t.deepEqual(getGameInfoAdapter('https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/store/1'), {
			owner: '',
			name: '',
			path: 'store/1',
		});
	}
});
