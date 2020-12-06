import collect from './collector';

const exists = (selector: string) => Boolean(document.querySelector(selector));

export const is404 = (): boolean => exists('[src="/images/404.png"]');

export const isFileNotFound = (): boolean => document.body.innerHTML === 'File not found.\n';

export const isHome = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site') || Boolean(getCleanPathname(url) === '');
collect.set('isHome', [
	'https://www.adventuregamestudio.co.uk/',
	'https://www.adventuregamestudio.co.uk/site/',
]);

export const isAGS = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url).startsWith('site/ags'));
collect.set('isAGS', [
	'https://www.adventuregamestudio.co.uk/site/ags/',
	'https://www.adventuregamestudio.co.uk/site/ags/tutorial/',
	'https://www.adventuregamestudio.co.uk/site/ags/plugins/engine/',
]);

export const isGames = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games');
collect.set('isGames', [
	'https://www.adventuregamestudio.co.uk/site/games/',
]);

export const isGamesAll = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/allgames');
collect.set('isGamesAll', [
	'https://www.adventuregamestudio.co.uk/site/games/allgames/',
]);

export const isGamesMonthlyPicks = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/picks');
collect.set('isGamesMonthlyPicks', [
	'https://www.adventuregamestudio.co.uk/site/games/picks/',
]);

export const isGamesAwardWinners = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/awards');
collect.set('isGamesAwardWinners', [
	'https://www.adventuregamestudio.co.uk/site/games/awards/',
]);

export const isGamesSearch = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url).startsWith('site/games/search'));
collect.set('isGamesSearch', [
	'https://www.adventuregamestudio.co.uk/site/games/search/',
	'https://www.adventuregamestudio.co.uk/site/games/search/title:test;creator:john/1/name/asc/',
	'https://www.adventuregamestudio.co.uk/site/games/search/game_lengths:1,6,0,2,3,7,4,5,15;genres:1,2,3,4,5,0;game_types:1,2,3,4,5,0;story_types:3;commercial:1/1/name/asc/',
]);

export const isGamesLuckyDip = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/random');
collect.set('isGamesLuckyDip', [
	'https://www.adventuregamestudio.co.uk/site/games/random',
]);

export const isGamesRecentPanelRatings = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/recentpanelratings');
collect.set('isGamesRecentPanelRatings', [
	'https://www.adventuregamestudio.co.uk/site/games/recentpanelratings',
]);

export const isGamesUnrated = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/unrated');
collect.set('isGamesUnrated', [
	'https://www.adventuregamestudio.co.uk/site/games/unrated',
]);

export const isGamesNotVeryRated = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/notveryrated');
collect.set('isGamesNotVeryRated', [
	'https://www.adventuregamestudio.co.uk/site/games/notveryrated',
]);

export const isGamesYouRated = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/yourated');
collect.set('isGamesYouRated', [
	'https://www.adventuregamestudio.co.uk/site/games/yourated',
]);

export const isGamesAdd = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url) === 'site/games/add');
collect.set('isGamesAdd', [
	'https://www.adventuregamestudio.co.uk/site/games/add',
]);

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

export const isGameVote = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getGame(url)?.path.startsWith('vote'));
collect.set('isGameVote', [
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/vote',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/vote',
]);

export const isGameAddComment = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getGame(url)?.path.startsWith('addcomment'));
collect.set('isGameAddComment', [
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/addcomment',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/addcomment',
]);

export const isGameEdit = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getGame(url)?.path.startsWith('edit'));
collect.set('isGameEdit', [
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/edit',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/edit',
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
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/vote',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/vote',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/addcomment',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/addcomment',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488/edit',
	'https://www.adventuregamestudio.co.uk/site/games/game/2488-zniw-adventure/edit',
]);

export const isCommunity = (url: URL | HTMLAnchorElement | Location = location): boolean => Boolean(getCleanPathname(url).startsWith('site/community'));
collect.set('isCommunity', [
	'https://www.adventuregamestudio.co.uk/site/community/',
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

export interface GameInfo {
	owner: string;
	name: string;

	/** A games's subpage
	@example '/site/games/game/gameId/download/downloadId' -> 'download'
	@example '/site/games/game/gameId/mirror/mirrorId' -> 'mirror'
	@example '/site/games/game/gameId/' -> ''
	@example '/site/community/' -> undefined */
	path: string;
}

const getGame = (url: URL | HTMLAnchorElement | string | Location = location): GameInfo | undefined => {
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
