import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


//connect enzyme to react
configure({adapter: new Adapter()});

describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper= shallow(<NavigationItems/>); //we pass jsx to shallow func
    });
    it('should render 2 NavigationItem comp', () =>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);//write your expectations
    });
    it('should render 3 NavigationItem comp', () =>{
        wrapper.setProps({isAuthenticated: true});//excutes on any shallow react comp
        expect(wrapper.find(NavigationItem)).toHaveLength(3);//write your expectation
    });
    it('should render logout NavigationItem comp', () =>{
        wrapper.setProps({isAuthenticated: true});//excutes on any shallow react comp
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});