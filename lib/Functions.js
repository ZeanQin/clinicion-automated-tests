import { Selector} from 'testcafe';


// Selectors
export const querySelector = Selector(query => document.querySelector(query));

export const elementWithID = Selector(id => document.getElementById(id));
export const elementsWithClassName = Selector(className => document.getElementsByClassName(className));
export const elementsWithName = Selector(name => document.getElementsByName(name));

// 

