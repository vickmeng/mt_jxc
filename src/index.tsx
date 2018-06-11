import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import 'react-quill/dist/quill.snow.css';

import App from '@app/App';
import '@app/index.css';
import { configureStore } from '@app/root';

const history = createBrowserHistory();
export const store = configureStore(history);

moment.locale('zh-cn');

ReactDOM.render(
  <Provider store={ store }>
    <LocaleProvider locale={ zhCN }>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
