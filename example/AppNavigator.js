/**
 * @file AppNavigator
 * @author leon <ludafa@outlook.com>
 */

import {Component, DataTypes} from 'san';
import ListItem from '../src/List/ListItem';

class NavigatorItem extends Component {

    static template = `
        <div>
            <sm-list-item
                s-if="!components"
                primaryText="{{name}}"
                primaryTogglesNestedList="{{true}}"
                toggleNested="{{false}}"
                on-click="route"
                style="{{computedStyle}}" />
            <sm-list-item
                s-else
                primaryText="{{name}}"
                primaryTogglesNestedList="{{true}}"
                initiallyOpen="{{open}}"
                toggleNested="{{true}}"
                style="{{computedStyle}}">
                <sm-navigator-item
                    s-for="route, index in components"
                    slot="nested"
                    name="{{route.name}}"
                    currentPath="{{currentPath}}"
                    path="{{path + (route.path || '/' + route.name)}}"
                    component="{{route.component}}"
                    components="{{route.components}}"
                    index="{{index}}" />
            </sm-list-item>
        </div>
    `;

    static components = {
        'sm-navigator-item': 'self',
        'sm-list-item': ListItem
    };

    static dataTypes = {
        name: DataTypes.string.isRequired,
        path: DataTypes.string,
        component: DataTypes.func,
        components: DataTypes.arrayOf(DataTypes.object),
        currentPath: DataTypes.string
    };

    static computed = {
        computedStyle() {
            let currentPath = this.data.get('currentPath');
            let path = this.data.get('path');
            return {
                color: currentPath === path ? '#ff4081' : '#000'
            };
        },
        open() {
            let currentPath = this.data.get('currentPath');
            let path = this.data.get('path');
            return currentPath.startsWith(path);
        }
    };

    // attached() {
    //     let {currentPath, path} = this.data.get();
    //     if (currentPath === path) {
    //         setTimeout(() => {
    //
    //             let parent = this.el.parentNode;
    //
    //             while (!parent.getAttribute('data-navigator')) {
    //                 parent = parent.parentNode;
    //             }
    //
    //             let el = this.el;
    //             console.log(parent, el.offsetTop, parent.offsetHeight);
    //             if (el.offsetTop > parent.offsetHeight) {
    //                 parent.scrollTop = el.offsetTop - parent.offsetHeight / 2;
    //             }
    //
    //         }, 300);
    //     }
    // }

    route() {
        window.location.hash = this.data.get('path');
    }

}


export default class Navigator extends Component {

    static template = `
        <div data-navigator="1">
            <sm-nav-item
                s-for="route, index in routes"
                name="{{route.name}}"
                path="{{route.path || route.name}}"
                currentPath="{{path}}"
                component="{{route.component}}"
                components="{{route.components}}"
                index="{{index}}" />
        </div>
    `;

    static components = {
        'sm-nav-item': NavigatorItem
    };

    static dataTypes = {
        routes: DataTypes.arrayOf(DataTypes.shape(NavigatorItem.dataTypes)),
        path: DataTypes.string
    };

}
