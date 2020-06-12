import { observable } from 'mobx';

export class Strings {
    @observable Posts: string = "Posts";
    @observable Games: string = "Games";
    @observable Users: string = "Users";
    @observable About: string = "About";
    @observable FAQ: string = "FAQ";

    @observable LanguageName: string = "Language";
    @observable Language: ILanguage = new ILanguage();
    @observable Options: IOptions = new IOptions();
}

export class IOptions {
    @observable ShowSearchOptions: string = "Search Options";
    @observable SelectGame: string = "Select Game";
    @observable GameTitle: string = "Game Title";
    @observable Close: string = "Close";
    @observable GameId: string = "GameId";
    @observable NintendoNetworkId: string = "Nintendo Network ID (Case Sensitive)";
    @observable SortByYeahs: string = `Sort by # of "Yeahs"`;
    @observable SortByReplies: string = `Sort by # of "Replies"`;
    @observable StartDate: string = "Start Date";
    @observable EndDate: string = "End Date";
    @observable DrawingOnly: string = "Drawing Only";
    @observable ScreenshotOnly: string = "Screenshot Only";
    @observable OrderByDateDescending: string = "Order By Date Descending";
    @observable Search: string = "Search";
}

export class ILanguage {
    @observable English: string = "English";
    @observable Japanese: string = "Japanese";
}

export class LanguageManager {
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

        strings.Options = new IOptions();
        strings.Options.ShowSearchOptions = "検索オプション";
        strings.Options.SelectGame = "ゲームコミュニティーを選ぶ";
        strings.Options.GameTitle = "ゲームコミュニティー";
        strings.Options.Close = "閉じる";
        strings.Options.GameId = "ゲームID";
        strings.Options.NintendoNetworkId = "ニンテンドーネットワークID (NNID)";
        strings.Options.SortByYeahs = `「そうだね」数ソート`;
        strings.Options.SortByReplies = `コメント数ソート`;
        strings.Options.StartDate = "Start Date";
        strings.Options.EndDate = "End Date";
        strings.Options.DrawingOnly = "Drawing Only";
        strings.Options.ScreenshotOnly = "Screenshot Only";
        strings.Options.OrderByDateDescending = "Order By Date Descending";
        strings.Options.Search = "検索";
    }
}