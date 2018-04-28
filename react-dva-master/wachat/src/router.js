import React, { PropTypes } from 'react';
import { Router, Route } from 'dva/router';

export default function({ history , app }) {
  // <Route path = '/' name = 'main' getComponent={(nextState, cb) => {
  //     require.ensure([], require => {
  //       app.model(require('./models/main'));
  //       cb(null, require('./routes/Main'));
  //     });
  //   }} >
  //   <Route path = '/basedata' name = 'basedata' getComponent={(nextState, cb) => {
  //       require.ensure([], require => {
  //         cb(null, require('./routes/basedata/Main'));
  //       });
  //     }} >
  //     <Route path = '/basedata/project' name = 'basedata' getComponent={(nextState, cb) => {
  //         require.ensure([], require => {
  //             app.model(require('./models/basedata/project'));
  //           cb(null, require('./routes/basedata/Project'));
  //         });
  //       }} />
  //     <Route path = '/basedata/room' name = 'basedataRoom' getComponent={(nextState, cb) => {
  //         require.ensure([], require => {
  //             app.model(require('./models/basedata/room'));
  //           cb(null, require('./routes/basedata/Room'));
  //         });
  //       }} />
  //   </Route>
  // </Route>
  const routes = [
    <Route path = 'repair' name = '报修' getComponent={(nextState, cb) => {
        require.ensure([], require => {
          app.model(require('./models/repair'));
          cb(null, require('./routes/repair'));
        });
      }}
    />
  ];

  return <Router history={ history } routes={ routes } />;
};
