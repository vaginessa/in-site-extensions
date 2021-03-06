import ext from './ext';
import {Histories, History} from '../reducers';
import {getHostName, getPath} from '../utils/url';

const maxResults = 100;

const searchHistory = ({
  host,
  paths,
  items,
  endTime
}: Histories): Promise<Histories> => {
  return new Promise((resolve) => {
    ext.history.search({
      text: host,
      startTime: 0,
      endTime,
      maxResults
    }, (historyNodes) => {
      let nextEndTime = endTime;
      historyNodes = historyNodes.filter((node) => {
        if (node.lastVisitTime) {
          nextEndTime = Math.min(nextEndTime, node.lastVisitTime);
          return true;
        } else {
          return false;
        }
      });

      historyNodes.filter((node) => {
        return getHostName(node.url) === host;
      }).map((node) => {
        return {
          title: node.title || '',
          url: node.url || '',
          path: getPath(node.url),
          lastVisitTime: node.lastVisitTime
        };
      }).forEach((h) => {
        if (!paths[h.path]) {
          paths[h.path] = true;
          items.push(h);
        }
      });

      resolve({
        host,
        items,
        paths,
        endTime: nextEndTime - 1,
        completed: endTime === nextEndTime
      });
    });
  });
};

export const getHistory = (host: string): Promise<Histories> => {
  return searchHistory({
    host,
    paths: {},
    items: [],
    endTime: +new Date()
  });
};

export const getMoreHistory = (histories: Histories): Promise<Histories> => {
  return searchHistory(histories);
};

export const removeHistory = (history: History): Promise<void> => {
  return new Promise((resolve) => {
    ext.history.deleteUrl({url: history.url}, resolve);
  });
};

export const removeAllHistories = (histories: Histories): Promise<void[]> => {
  return Promise.all(histories.items.map(((h) => removeHistory(h))));
};
