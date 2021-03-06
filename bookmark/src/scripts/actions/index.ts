import actionCreatorFactory from 'typescript-fsa';
import {Action} from 'typescript-fsa';
import {Hosts, Host, Bookmark, Page} from '../reducers';

const actionCreator = actionCreatorFactory();

export const nop = actionCreator<{}>('NOP');

export const initialize = actionCreator<{}>('INITIALIZE');
export const setHosts = actionCreator<Hosts>('SET_HOSTS');

export const exportHosts = actionCreator<{}>('EXPORT_HOSTS');
export const importHosts = actionCreator<{hosts: Hosts}>('IMPORT_HOSTS');
export const importHostsWorker = actionCreator<Action<{hosts: Hosts}>>('IMPORT_HOSTS_WORKER');

export const addBookmark = actionCreator<{page: Page}>('ADD_BOOKMARK');
export const addBookmarkWorker = actionCreator.async<Action<{page: Page}>, void, any>('ADD_BOOKMARK_WORKER');

export const removeBookmark = actionCreator<{host: Host, bookmark: Bookmark}>('REMOVE_BOOKMARK');
export const removeBookmarkWorker = actionCreator.async<Action<{host: Host, bookmark: Bookmark}>, void, any>('REMOVE_BOOKMARK_WORKER');

export const removeHost = actionCreator<{host: Host}>('REMOVE_HOST');
export const removeHostWorker = actionCreator.async<Action<{host: Host}>, void, any>('REMOVE_HOST_WORKER');

export const sortBookmark = actionCreator<{host: Host, bookmarks: Bookmark[]}>('SORT_BOOKMARK');
export const sortBookmarkWorker = actionCreator.async<Action<{host: Host, bookmarks: Bookmark[]}>, void, any>('SORT_BOOKMARK_WORKER');

export const openBookmark = actionCreator<{host: Host, bookmark: Bookmark, openInNew: boolean}>('OPEN_BOOKMARK');

export const pageChanged = actionCreator<{page: Page}>('PAGE_CHANGED');
