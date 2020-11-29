import collect from './collector';

const exists = (selector: string) => Boolean(document.querySelector(selector));

export const is404 = (): boolean => exists('[src="/images/404.png"]');

export const isGameDownload = (url: URL | HTMLAnchorElement | Location = location): boolean => /^download\/\d+/.test(getGame(url)?.path!);
collect.set('isGameDownload', [
	'https://www.adventuregamestudio.co.uk/site/games/game/1040/download/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/download/1',
]);

export const isGameMirror = (url: URL | HTMLAnchorElement | Location = location): boolean => /^mirror\/\d+/.test(getGame(url)?.path!);
collect.set('isGameMirror', [
	'https://www.adventuregamestudio.co.uk/site/games/game/1040/mirror/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/mirror/1',
]);

export const isGameStore = (url: URL | HTMLAnchorElement | Location = location): boolean => /^store\/\d+/.test(getGame(url)?.path!);
collect.set('isGameStore', [
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/store/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/store/1',
]);

export const isGame = (url: URL | HTMLAnchorElement | Location = location): boolean => /^site\/games\/game\/\d+/.test(getCleanPathname(url)) &&
	document.title !== 'Adventure Game Studio | Games | &lt;DELETED GAME&gt;'; // The title check excludes deleted games
collect.set('isGame', [
	'https://www.adventuregamestudio.co.uk/site/games/game/1040/',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040/download/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/download/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040/mirror/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/1040-nanobots/mirror/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/store/1',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/store/1',
]);

/** Get the logged-in user’s username */
const getUsername = () => {
	if (/\?(action=profile)+/.test(document.querySelector('#logindisplay a')?.getAttribute('href')!)) {
		return document.querySelector('#logindisplay a')!.innerHTML;
	}

	return document.querySelector('.user .reset .greeting')?.innerHTML;
};

/** Drop leading and trailing slashes */
const getCleanPathname = (url: URL | HTMLAnchorElement | Location = location): string => url.pathname.slice(1, url.pathname.endsWith('/') ? -1 : undefined);

export interface RepositoryInfo {
	owner: string;
	name: string;

	/** A games's subpage
	@example '/site/games/game/gameId/download/downloadId' -> 'download'
	@example '/site/games/game/gameId/mirror/mirrorId' -> 'mirror'
	@example '/site/games/game/gameId/' -> ''
	@example '/site/community/' -> undefined */
	path: string;
}

const getGame = (url: URL | HTMLAnchorElement | string | Location = location): RepositoryInfo | undefined => {
	if (typeof url === 'string') {
		url = new URL(url, location.origin);
	}

	if (!isGame(url)) {
		return;
	}

	const owner = document.querySelector('.gameAuthorTitle a')?.innerHTML ?? '';
	const name = document.querySelector('.gameName')?.innerHTML ?? '';

	const [
		, // This is /site/
		, // This is /games/
		, // This is /game/
		, // This is /gameId/
		...path
	] = getCleanPathname(url).split('/');
	return {
		owner,
		name,
		path: path.join('/'),
	};
};

export const utils = {
	getUsername,
	getCleanPathname,
	getGameInfo: getGame,
};
