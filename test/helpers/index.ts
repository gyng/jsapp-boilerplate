import "@babel/polyfill";
import * as Enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

global.fetch = require("jest-fetch-mock");
