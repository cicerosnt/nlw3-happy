
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanege from './pages/CreateOrphanage';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanageMap}/>

                <Route path="/orphanages/create" component={CreateOrphanege}/>
                <Route path="/orphanages/:id" component={Orphanage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;