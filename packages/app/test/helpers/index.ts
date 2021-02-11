import "@babel/polyfill";
import * as Enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

// @ts-expect-error global has fetch in browser env
global.fetch = require("jest-fetch-mock");
