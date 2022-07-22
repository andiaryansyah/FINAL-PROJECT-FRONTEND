import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Spinner from "./components/Spinner/Spinner";
import SignUp from "./components/SignUp/SignUp";
import Recipe from "./components/Recipe/Recipe";
import SignIn from "./components/SignIn/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import AddRecipe from "./components/AddRecipe/AddRecipe"
import RecipeUpdate from "./components/RecipeUpdate/RecipeUpdate"
// import Footer from "./components/Footer/Footer";
const Homepage = lazy(() => import("./pages/Hero/Hero"));
const Errorpage = lazy(() => import("./pages/Error/Error"));
const Recipelist = lazy(() => import("./pages/Recipe/RecipeList"));
const Recipedetails = lazy(() => import("./pages/SingleRecipe/SingleRecipe"));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/features" component={Recipelist} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/recipe" component={Recipe} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addrecipe" component={AddRecipe} />
          <Route exact path="/users/:user_id/recipe/:id" component={Recipedetails} />
          <Route exact path="/updaterecipe/users/:user_id/recipe/:id" component={RecipeUpdate} />
          <Route exact path="*" component={Errorpage} />
        </Switch>
      </Suspense>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};
export default App;
