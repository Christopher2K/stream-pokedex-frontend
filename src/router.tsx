import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as Pages from "pages";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Pages.Home} />
        <Route exact path="/favoris" component={Pages.Favorite} />
        <Route exact path="/pokemon" component={Pages.Pokemon} />
        <Route exact path="/connexion" component={Pages.Signin} />
        <Route exact path="/signup" component={Pages.Signup} />
        <Route exact path="/team" component={Pages.TeamList} />
        <Route exact path="/team" component={Pages.Team} />
        <Route component={Pages.NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
