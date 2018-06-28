import { observable } from 'mobx';
import { LanguageManager, Strings } from './strings';

export class AppState {
    @observable currentCount: number = 0;
    @observable currentLanguage: Language = Language.en;
    @observable strings: Strings = new Strings();
    LanguageManager: LanguageManager = new LanguageManager();
}

export enum Language {
    en,
    ja
}

export class CommunitySearchViewState {
    @observable isLoading: boolean = false;
    @observable isError: boolean = false;
    @observable isEmpty: boolean = false;
    @observable isDone: boolean = false;
    @observable games: CommunityGame[] = [];
}

export class UsersSearchViewState {
    @observable isLoading: boolean = false;
    @observable isError: boolean = false;
    @observable isEmpty: boolean = false;
    @observable isDone: boolean = false;
    @observable users: User[] = [];
}

export class UserViewState {
    @observable isLoading: boolean = false;
    @observable isError: boolean = false;
    @observable isEmpty: boolean = false;
    @observable isDone: boolean = false;
    @observable userDoesNotExist: boolean = false;
    @observable user: User = new User();
    @observable userStats: UserStats = new UserStats();
}

export class GameViewState {
    @observable isLoading: boolean = false;
    @observable isError: boolean = false;
    @observable isEmpty: boolean = false;
    @observable isDone: boolean = false;
    @observable gameDoesNotExist: boolean = false;
    @observable game: CommunityGame = new CommunityGame();
    @observable relatedGame: CommunityGame[] = [];
    @observable gameStats: GameStats = new GameStats();
}

export class HomeViewState {
    @observable popularUsers: User[] = [];
    @observable popularPosts: Post[] = [];
    @observable popularGames: CommunityGame[] = [];
}

export class PostsViewState {
    @observable isLoading: boolean = false;
    @observable isError: boolean = false;
    @observable isEmpty: boolean = false;
    @observable isDone: boolean = false;
    @observable posts: Post[] = [];
}

export class UserStats {
    popularPosts: Post[] = [];
}

export class GameStats {
    popularPosts: Post[] = [];
}

export class PagedResults {
    currentPage: number = 1;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
    results: any[];
}

export class GameSearch {
    @observable title: string = "";
    @observable type: string = "";
    @observable titleId: string = "";
    @observable searchJapan: boolean = false;
    @observable searchEurope: boolean = false;
    @observable searchAmerica: boolean = false;
    @observable searchWorld: boolean = false;
    @observable orderDesc: boolean = false;
    @observable sortPosts: SortPosts = SortPosts.None;
    @observable sortReplies: SortPosts = SortPosts.None;
    @observable sortDeletedPosts: SortPosts = SortPosts.None;
    @observable sortTitle: SortTitle = SortTitle.Asc;
    page: number = 1;
}

export class UserSearch {
    @observable name: string = "";
    @observable screenName: string = "";
    @observable country: string = "";
    @observable sortPosts: SortPosts = SortPosts.None;
    @observable sortReplies: SortPosts = SortPosts.None;
    @observable sortDeletedPosts: SortPosts = SortPosts.None;
    @observable sortFollowing: SortPosts = SortPosts.None;
    @observable sortFollowers: SortPosts = SortPosts.None;
    @observable sortFriends: SortPosts = SortPosts.None;
    @observable sortGameSkill: SortGameSkill = SortGameSkill.None;
    @observable sortName: SortTitle = SortTitle.Asc;
    page: number = 1;
}

export class PostSearch {
    @observable textSearch: string = "";
    @observable gameId: string = "";
    @observable titleId: string = "";
    @observable name: string = "";
    @observable screenName: string = "";
    @observable isDrawingOnly: boolean = false;
    @observable isScreenshotOnly: boolean = false;
    @observable orderByDateDescending: boolean = false;
    @observable reverse: boolean = false;
    @observable startDate: string = "2012-11-16T12:00:00.000Z";
    @observable endDate: string = "2017-11-08T12:00:00.000Z";
    @observable sortEmpathy: SortPosts = SortPosts.None;
    @observable sortReplyCount: SortPosts = SortPosts.None;
    page: number = 1;
}

export enum SortGameSkill {
    Expert,
    Intermediate,
    Casual,
    Beginner,
    Hidden,
    None
}

export enum SortPosts {
    None,
    Most,
    Least
}

export enum SortTitle {
    Asc,
    Desc
}

export class CommunityGame {
    id: number;
    gameId: string;
    titleId: string;
    communityBadge: string;
    title: string;
    titleUrl: string;
    iconUri: string;
    communityListIcon: string;
    platform: number;
    type: string;
    viewRegion: string;
    totalPosts: number;
    totalReplies: number;
    totalDeletedPosts: number;
}

export class User {
    id: number;
    screenName: string;
    name: string;
    iconUri: string;
    country: string;
    birthday: string;
    gameSkill: number;
    gameSystem: string;
    favoriteGameGenres: string;
    isHidden: boolean;
    isBirthdayHidden: boolean;
    isError: boolean;
    bio: string;
    empathyCount: string;
    totalPosts: number;
    totalReplies: number;
    totalDeletedPosts: number;
    friendsCount: number;
    followingCount: number;
    followerCount: number;
    sidebarCoverUrl: string;
}

export class Post {
    id: string;
    text: string;
    title: string;
    postedDate: number;
    imageUri: string;
    replyCount: number;
    empathyCount: number;
    isPlayed: boolean;
    isSpoiler: boolean;
    isAcceptingResponse: boolean;
    discussionType: number;
    screenShotUri: string;
    screenName: string;
    name: string;
    iconUri: string;
    feeling: number;
    inReplyToId: string;
    gameId: string;
    titleId: string;
    gameCommunityTitle: string;
    gameCommunityIconUri: string;
    videoUrl: string;
    warcLocation: string;
}

export class Constants {
    countryList: string[] = ["", "-----", "Anguilla", "Antigua and Barbuda", "Argentina", "Aruba", "Australia", "Austria", "Bahamas", "Barbados", "Belgium", "Belize", "Bermuda", "Bolivia", "Brazil", "British Virgin Islands", "Bulgaria", "Canada", "Cayman Islands", "Chile", "Colombia", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark (Kingdom of)", "Dominica", "Dominican Republic", "Ecuador", "El Salvador", "Estonia", "Finland", "France", "French Guiana", "Germany", "Greece", "Grenada", "Guadeloupe", "Guatemala", "Guyana", "Haiti", "Honduras", "Hungary", "Ireland", "Italy", "Jamaica", "Japan", "Latvia", "Lithuania", "Luxembourg", "Malta", "Martinique", "Mexico", "Montserrat", "Netherlands", "Netherlands Antilles", "New Zealand", "Nicaragua", "Norway", "Panama", "Paraguay", "Peru", "Poland", "Portugal", "Romania", "Russia", "Slovakia", "Slovenia", "South Africa", "Spain", "St. Kitts and Nevis", "St. Lucia", "St. Vincent and the Grenadines", "Suriname", "Sweden", "Switzerland", "Trinidad and Tobago", "Turkey", "Turks and Caicos Islands", "United Kingdom", "United States", "Uruguay", "US Virgin Islands", "Venezuela"];
}