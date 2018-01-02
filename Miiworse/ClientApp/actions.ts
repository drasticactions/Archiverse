import { AppState, User, UserSearch, GameSearch, PostSearch, UserViewState, GameViewState, SortPosts } from './appState'

export class Actions {
    translateSortPosts(sortPosts: SortPosts) {
        switch (sortPosts) {
            case SortPosts.None:
                return "None";
            case SortPosts.Least:
                return "Least";
            case SortPosts.Most:
                return "Most";
        }
    }

    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    async setCurrentUser(viewState: UserViewState, search: PostSearch, stats?: boolean) {
        try {
            viewState.user = await actions.returnPagedResults(`api/users/getuser`, JSON.stringify(search));
            if (viewState.user == null) {
                viewState.userDoesNotExist = true;
                return;
            }
            if (stats) {
                viewState.userStats = await actions.returnPagedResults(`api/users/poststats`, JSON.stringify(search));
            }
        } catch (e) {
            viewState.isEmpty = true;
        }
    }

    async setCurrentGame(viewState: GameViewState, search: PostSearch, stats?: boolean) {
        try {
            viewState.game = await actions.returnPagedResults(`api/community/getgame`, JSON.stringify(search));
            if (viewState.game == null) {
                viewState.gameDoesNotExist = true;
                return;
            }
            if (stats) {
                search.titleId = viewState.game.titleId;
                viewState.gameStats = await actions.returnPagedResults(`api/community/poststats`, JSON.stringify(search));
                viewState.relatedGame = await actions.returnPagedResults(`api/community/getrelatedgames`, JSON.stringify(search));
            }
        } catch (e) {
            viewState.isEmpty = true;
        }
    }

    async returnPagedResults(api: string, body: string) {
        let method = 'POST';
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        //console.log(body);
        return await (await fetch(api, { method, headers, body })).json();
    }
}

const actions = new Actions();

export default actions;