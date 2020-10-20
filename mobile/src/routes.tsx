import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import OrphanegeMap from './pages/OrphanageMap';
import OrphanegeDatails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './componets/Header';

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                        headerShown: true,
                        cardStyle: {backgroundColor: '#f2f3f5'}
                    }}>
                <Screen name="OrphanegeMap" component={OrphanegeMap}
                    options={{
                        headerShown: false,
                        header: () => <Header title="Select in the map"/>
                    }}
                />

                <Screen name="OrphanegeDatails" component={OrphanegeDatails}
                    options={{
                        header: () => <Header showCancel={false} title="Orphanage details"/>
                    }}
                />
                <Screen name="SelectMapPosition" component={SelectMapPosition}
                    options={{
                        header: () => <Header title="Select in the map"/>
                    }}
                />
                <Screen name="OrphanageData" component={OrphanageData}
                    options={{
                        header: () => <Header title="Enter your data"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}