import { observable } from 'mobx';

export class Strings {
    @observable Posts: string = "Posts";
    @observable Games: string = "Games";
    @observable Users: string = "Users";
    @observable About: string = "About";
    @observable FAQ: string = "FAQ";

    @observable LanguageName: string = "Language";
    @observable Language: ILanguage;
}

export class Options {
    @observable ShowAdvanceSearchOptions: string = "Show Advance Search Options";
    @observable SelectGame: string = "Select Game";
    @observable GameTitle: string = "Game Title";
    @observable Close: string = "Close";
    @observable GameId: string = "GameId";
    @observable NintendoNetworkId: string = "Nintendo Network ID (Case Sensitive)";
    @observable SortByYeahs: string = `Sort by # of "Yeahs"`;
    @observable SortByReplies: string = `Sort by # of "Replies"`;
    @observable StartDate: string = "Start Date";
    @observable EndDate: string = "EndDate";
    @observable DrawingOnly: string = "Drawing Only";
    @observable ScreenshotOnly: string = "Screenshot Only";
    @observable OrderByDateDescending: string = "Order By Date Descending";
}

export class ILanguage {
    @observable English: string = "English";
    @observable Japanese: string = "Japanese";
}

export class LanguageManager {
    EnglishStrings(strings: Strings) {
        strings.Posts = "Posts";
        strings.Games = "Games";
        strings.Users = "Users";
        strings.About = "About";
        strings.FAQ = "FAQ";
        strings.Language = new ILanguage();
        strings.Language.English = "English";
        strings.Language.Japanese = "Japanese";
    }

    JapaneseStrings(strings: Strings) {
        strings.Posts = "ポスト";
        strings.Games = "ゲーム";
        strings.Users = "ユーザー";
        strings.About = "Archiverseについて";
        strings.FAQ = "よくある質問 (FAQ)";
        strings.LanguageName = "言葉";
        strings.Language = new ILanguage();
        strings.Language.English = "英語";
        strings.Language.Japanese = "日本語";
    }
}