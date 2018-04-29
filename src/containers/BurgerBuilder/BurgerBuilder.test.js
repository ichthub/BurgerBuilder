import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControles/BuildControls'

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredient = {()=>{}}/>);
    });
    it('should render BuildControls comp when recieving ingredients', ()=>{
        wrapper.setProps({ings: {salad:2}});
        expect(wrapper.find(BuildControls)).toHaveLength(1); 
    });
});
