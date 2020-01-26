import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import AppRouter from './routes/index';
import { LayoutDefault } from './layout/default';
import Login from './containers/Login';
// import Home from './containers/Home';

interface AppProps {

}

interface AppState {

}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
  }
  public render(): JSX.Element {
    return (
      <>
        <Switch>
          <Route exact={true} path="/login" component={Login}></Route>
          <Route path="/">
            <LayoutDefault></LayoutDefault>
          </Route>
        </Switch>
        {/* <Login></Login> */}
        {/* <LayoutDefault></LayoutDefault> */}
        {/* <AppRouter></AppRouter> */}
      </>
    )
  }
}